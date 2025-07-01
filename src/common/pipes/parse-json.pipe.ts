import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseJsonPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value, this.nullToUndefined);
        return parsed;
      } catch (e) {
        throw new BadRequestException('Invalid JSON');
      }
    }
    return this.replaceNullsWithUndefined(value);
  }

  // Función usada como reviver en JSON.parse
  private nullToUndefined(key: string, value: any) {
    return value === null ? undefined : value;
  }

  // En caso de que value ya sea un objeto y no un string (por seguridad)
  private replaceNullsWithUndefined(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.replaceNullsWithUndefined(item));
    } else if (obj !== null && typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [
          k,
          this.replaceNullsWithUndefined(v === null ? undefined : v),
        ]),
      );
    }
    return obj;
  }
}
