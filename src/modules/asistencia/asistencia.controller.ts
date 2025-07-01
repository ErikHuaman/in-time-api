import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { AsistenciaService } from './asistencia.service';
import { Asistencia } from './asistencia.model';
import { AsistenciaDTO } from './asistencia.dto';
import { TrabajadorService } from '@modules/trabajador/trabajador.service';
import { getDia, getDiasDelMes } from '@common/utils/fecha.function';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { HorarioTrabajador } from '@modules/horario-trabajador/horario-trabajador.model';
import { HorarioTrabajadorItem } from '@modules/horario-trabajador-item/horario-trabajador-item.model';
import { JustificacionInasistencia } from '@modules/justificacion-inasistencia/justificacion-inasistencia.model';
import { AsignacionSedeUsuarioService } from '@modules/asignacion-sede-usuario/asignacion-sede-usuario.service';
import { AsignacionSedeUsuario } from '@modules/asignacion-sede-usuario/asignacion-sede-usuario.model';
import { AsignacionSede } from '@modules/asignacion-sede/asignacion-sede.model';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PdfService } from '@core/pdf/pdf.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { UsuarioService } from '@modules/usuario/usuario.service';
import { Sede } from '@modules/sede/sede.model';

@Controller('asistencias')
export class AsistenciaController {
  constructor(
    private readonly service: AsistenciaService,
    private readonly trabajadorService: TrabajadorService,
    private readonly usuarioService: UsuarioService,
    private readonly pdfService: PdfService,
    @InjectQueue('mail') private mailQueue: Queue,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<Asistencia>> {
    return this.service.findAll(
      user,
      query.limit!,
      query.offset!,
      query.q?.filter,
      query.q?.search,
    );
  }

  @Get('testMail')
  async testMail(): Promise<any> {
    const users = [{ email: 'erik.huaman@bartech.pe', name: 'Erik' }];
    for (const user of users) {
      const pdfBuffer = await this.pdfService.generarComprobantePago();

      await this.mailQueue.add('send-email', {
        to: user.email,
        subject: 'Hola ' + user.name,
        template: 'welcome',
        context: { name: user.name },
        attachment: {
          filename: `informe-${user.name}.pdf`,
          content: pdfBuffer,
        },
      });
    }

    return true;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Asistencia | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: AsistenciaDTO): Promise<Asistencia | null> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: AsistenciaDTO,
  ): Promise<[number, Asistencia[]]> {
    return this.service.update(id, dto);
  }

  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, Asistencia[]]> {
    return this.service.changeStatus(id, isActive);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @Patch('restore/:id')
  restore(@Param('id') id: string): Promise<void> {
    return this.service.restore(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('ByMonth')
  async findAllByMonth(
    @Body() dto: { fecha: Date },
    @CurrentUser() user: Usuario,
  ): Promise<any> {
    if (!dto || !dto.fecha) {
      throw new BadRequestException(
        'Los parametros proporcionados no coinciden con los requeridos',
      );
    }

    const diasMes = getDiasDelMes(dto.fecha);
    const trabajadores = (
      await this.trabajadorService.findAllByMonth(dto.fecha, user?.id)
    ).map((t: Trabajador) => t.toJSON());
    let asistido = 0;
    const listAsistencia = trabajadores.map((t: Trabajador) => {
      const horario: HorarioTrabajador = t.horarios[0];
      const vacacion = t.vacaciones[0];
      const permiso = t.permisos;
      const now = new Date();
      const marcaciones = diasMes.map((d) => {
        const asist: Asistencia = t.asistencias
          .map((a: Asistencia) => a)
          .find((a: Asistencia) => {
            const fecha = new Date(a.fecha);
            return d.fecha.getTime() === fecha.getTime();
          })!;

        const correccion = (asist?.correcciones ?? [])[0];

        let diaLibre = false;

        let diaDescanso = false;

        let diario;

        let totalHorario = 0;
        let totalAsistencia = 0;

        if (horario) {
          const item = horario.items.find((h) => h.numDia === d.diaSemana)!;

          diaLibre = d.fecha.getTime() > now.getTime() || !!item?.diaLibre;

          diaDescanso = !diaLibre && !!item?.diaDescanso;

          const justificacion = item?.justificaciones
            .map((j) => j)
            .find(
              (j: JustificacionInasistencia) =>
                new Date(j.fecha).getTime() === new Date(d.fecha).getTime(),
            );

          const noBloque = !item?.bloque ? true : false;

          const horaEntrada = item?.bloque?.horaEntrada ?? 0;
          const minutoEntrada = item?.bloque?.minutoEntrada ?? 0;

          const entrada = new Date(d.fecha);
          entrada.setHours(horaEntrada, minutoEntrada);

          const horaSalida = item?.bloque?.horaSalida ?? 0;
          const minutoSalida = item?.bloque?.minutoSalida ?? 0;

          const salida = new Date(d.fecha);
          salida.setDate(
            horaSalida < horaEntrada ? salida.getDate() + 1 : salida.getDate(),
          );
          salida.setHours(horaSalida, minutoSalida);

          const marcacionEntrada = correccion
            ? correccion?.marcacionEntrada
            : asist?.marcacionEntrada
              ? new Date(asist?.marcacionEntrada)
              : null;
          const marcacionSalida = correccion
            ? correccion?.marcacionSalida
            : asist?.marcacionSalida
              ? new Date(asist?.marcacionSalida)
              : null;

          diario = {
            codigo: !diaLibre
              ? item?.diaDescanso
                ? 'X'
                : horario.turno?.codigo
              : '-',
            horario: {
              diaLibre,
              diaDescanso,
              entrada: !noBloque ? entrada : null,
              salida: !noBloque ? salida : null,
            },
            asistencia: {
              diaLibre,
              diaDescanso,
              marcacionEntrada,
              marcacionSalida,
              latitudEntrada: asist?.latitudEntrada,
              longitudEntrada: asist?.longitudEntrada,
              latitudSalida: asist?.latitudSalida,
              longitudSalida: asist?.longitudSalida,
            },
            corregido: !!correccion,
            justificado: !!justificacion,
          };

          const diffMsHor =
            salida && entrada ? salida.getTime() - entrada.getTime() : 0;

          totalHorario = Math.floor(diffMsHor / 1000 / 60) ?? 0;

          const diffMs =
            marcacionSalida && marcacionEntrada
              ? marcacionSalida.getTime() -
                (marcacionEntrada.getTime() < entrada.getTime()
                  ? entrada.getTime()
                  : marcacionEntrada.getTime())
              : 0;

          totalAsistencia = Math.floor(diffMs / 1000 / 60);

          const horaTotal = Math.floor(totalAsistencia / 60);
          const minutoTotal = totalAsistencia % 60;
          const tardanza =
            totalAsistencia !== 0 && !diaLibre
              ? (asist?.diferenciaEntrada! > 0
                  ? Math.abs(asist?.diferenciaEntrada!)
                  : 0) / 60
              : 0;
          const diff = totalAsistencia - totalHorario;
          const sobretiempo =
            totalAsistencia !== 0 && !diaLibre
              ? diff > 0
                ? Math.abs(diff)
                : 0
              : 0;
          const retiro =
            totalAsistencia !== 0 && !diaLibre
              ? diff < 0
                ? Math.abs(diff)
                : 0
              : 0;

          if (totalAsistencia == 0) {
            asistido++;
          } else {
            asistido = 0;
          }

          let newCodigo =
            marcacionEntrada && !marcacionSalida
              ? 'OB'
              : totalAsistencia == 0 && !diaLibre
                ? diaDescanso
                  ? asistido > 1
                    ? 'F'
                    : diario.codigo
                  : 'F'
                : totalAsistencia != 0 &&
                    Math.abs(totalAsistencia - totalHorario) > 10
                  ? diaDescanso
                    ? 'DD'
                    : 'OB'
                  : diario.codigo;

          if (vacacion) {
            const vacInicio = new Date(vacacion.fechaInicio);
            vacInicio.setHours(0, 0, 0);
            const vacFin = new Date(vacacion.fechaFin);
            vacFin.setHours(23, 59, 59);
            const fechaTime = new Date(d.fecha).getTime();
            if (
              vacInicio.getTime() <= fechaTime &&
              fechaTime <= vacFin.getTime()
            ) {
              newCodigo = 'V';
            }
          }

          if (permiso && newCodigo != 'V') {
            const perm = permiso.find((p) => {
              const pInicio = new Date(p.fechaInicio);
              pInicio.setHours(0, 0, 0);
              const pFin = new Date(p.fechaFin);
              pFin.setHours(23, 59, 59);
              const fechaTime = new Date(d.fecha).getTime();
              return (
                pInicio.getTime() <= fechaTime && fechaTime <= pFin.getTime()
              );
            });
            if (perm) {
              newCodigo = 'P';
            }
          }

          diario = {
            ...diario,
            tardanza: {
              hora: tardanza > 0 ? Math.floor(tardanza / 60) : 0,
              minuto: tardanza > 0 ? tardanza % 60 : 0,
            },
            sobretiempo: {
              hora: sobretiempo > 0 ? Math.floor(sobretiempo / 60) : 0,
              minuto: sobretiempo > 0 ? sobretiempo % 60 : 0,
            },
            retiro: {
              hora: retiro > 0 ? Math.floor(retiro / 60) : 0,
              minuto: retiro > 0 ? retiro % 60 : 0,
            },
            codigo: newCodigo,
            horaTotal,
            minutoTotal,
          };
        }
        return {
          dia: d.dia,
          numDia: d.diaSemana,
          fecha: d.fecha,
          ...diario,
          totalAsistencia,
          totalHorario,
        };
      });
      const { contratos, sedes, asistencias, horarios, ...x } = t;

      const maxCont = Math.max(...contratos.map((a) => a.orden));
      const contrato = contratos.find((a) => a.orden === maxCont);
      // const maxAsign = Math.max(...sedes.map((a) => a.orden));
      // const asignacion = sedes.find((a) => a.orden === maxAsign);

      const cargo = contrato?.cargo;
      // const sede = asignacion.sede ? asignacion.sede : undefined;
      const diasLaborados = marcaciones.filter(
        (m) => !['-', 'F', 'X', 'DD'].includes(m.codigo),
      ).length;
      const feriados = marcaciones.filter((m) =>
        ['AA'].includes(m.codigo),
      ).length;
      const faltas = marcaciones.filter((m) => ['F'].includes(m.codigo)).length;
      const permisos = marcaciones.filter((m) =>
        ['P'].includes(m.codigo),
      ).length;
      const vacaciones = marcaciones.filter((m) =>
        ['V'].includes(m.codigo),
      ).length;
      const descansos = marcaciones.filter((m) =>
        ['X'].includes(m.codigo),
      ).length;
      const totalDias = marcaciones.filter(
        (m) => !['-'].includes(m.codigo),
      ).length;
      const horasDiarias = contrato?.horasContrato!;
      const horasSemanales =
        horario.items.filter((h) => !h.diaLibre && !h.diaDescanso).length *
        horasDiarias;
      const horasMensuales = diasLaborados * horasDiarias;
      const horasOrdinarias =
        diasLaborados * (horasDiarias > 8 ? 8 : horasDiarias);
      const horasExtra =
        diasLaborados * (horasDiarias > 8 ? horasDiarias - 8 : 0);

      const tardanzas = marcaciones.filter(
        (item) => item.tardanza.hora != 0 || item.tardanza.minuto != 0,
      ).length;

      const retiros = marcaciones.filter(
        (item) => item.retiro.hora != 0 || item.retiro.minuto != 0,
      ).length;

      const sobretiempos = marcaciones.filter(
        (item) => item.sobretiempo.hora != 0 || item.sobretiempo.minuto != 0,
      ).length;

      return {
        ...x,
        cargo,
        sedes,
        marcaciones,
        diasLaborados,
        feriados,
        faltas,
        tardanzas,
        retiros,
        sobretiempos,
        vacaciones,
        permisos,
        descansos,
        totalDias,
        horasDiarias,
        horasSemanales,
        horasMensuales,
        horasOrdinarias,
        horasExtra,
      };
    });
    return {
      asistencia: listAsistencia,
      cards: {
        faltas: listAsistencia.reduce((acc, item) => acc + item.faltas, 0),
        tardanzas: listAsistencia.reduce(
          (acc, item) => acc + item.tardanzas,
          0,
        ),
        retiros: listAsistencia.reduce((acc, item) => acc + item.retiros, 0),
        sobretiempos: listAsistencia.reduce(
          (acc, item) => acc + item.sobretiempos,
          0,
        ),
        vacaciones: listAsistencia.reduce(
          (acc, item) => acc + item.vacaciones,
          0,
        ),
        permisos: listAsistencia.reduce((acc, item) => acc + item.permisos, 0),
      },
    };
  }

  @Post('ObservadoByMonth')
  async findAllObservadoByMonth(
    @CurrentUser() user: Usuario,
    @Body() dto: { fecha: Date },
  ): Promise<any> {
    if (!dto || !dto.fecha) {
      throw new BadRequestException(
        'Los parametros proporcionados no coinciden con los requeridos',
      );
    }
    const codigos = {
      1: 'D',
      2: 'N',
      3: 'A',
    };
    const diasMes = getDiasDelMes(dto.fecha);
    const trabajadores = (
      await this.trabajadorService.findAllByMonth(dto.fecha, user?.id)
    ).map((t: Trabajador) => t.toJSON());
    let asistido = 0;
    const listAsistencia = trabajadores.map((t: Trabajador) => {
      const horario: HorarioTrabajador = t.horarios[0];
      const vacacion = t.vacaciones[0];
      const now = new Date();
      const marcaciones = diasMes.map((d) => {
        const asist: Asistencia = t.asistencias
          .map((a: Asistencia) => a)
          .find((a: Asistencia) => {
            const fecha = new Date(a.fecha);
            return d.fecha.getTime() === fecha.getTime() && a.isActive;
          })!;

        const correccion = asist?.correcciones[0];

        let diaLibre = false;

        let diaDescanso = false;

        let diario;

        let totalHorario = 0;
        let totalAsistencia = 0;

        if (horario) {
          const item: HorarioTrabajadorItem = horario.items.find(
            (h: HorarioTrabajadorItem) => h.numDia === d.diaSemana,
          )!;

          diaLibre = d.fecha.getTime() > now.getTime() || item.diaLibre;

          diaDescanso = !diaLibre && item.diaDescanso;

          const noBloque = !item?.bloque ? true : false;

          const horaEntrada = item.bloque?.horaEntrada ?? 0;
          const minutoEntrada = item.bloque?.minutoEntrada ?? 0;

          const entrada = new Date(d.fecha);
          entrada.setHours(horaEntrada, minutoEntrada);

          const horaSalida = item.bloque?.horaSalida ?? 0;
          const minutoSalida = item.bloque?.minutoSalida ?? 0;

          const salida = new Date(d.fecha);
          salida.setDate(
            horaSalida < horaEntrada ? salida.getDate() + 1 : salida.getDate(),
          );
          salida.setHours(horaSalida, minutoSalida);

          const marcacionEntrada = asist?.marcacionEntrada
            ? new Date(asist?.marcacionEntrada)
            : null;
          const marcacionSalida = asist?.marcacionSalida
            ? new Date(asist?.marcacionSalida)
            : null;

          diario = {
            codigo: !diaLibre
              ? item?.diaDescanso
                ? 'X'
                : codigos[horario.turno?.orden]
              : '-',
            horario: {
              diaLibre,
              diaDescanso,
              entrada: !noBloque ? entrada : null,
              salida: !noBloque ? salida : null,
            },
            asistencia: {
              id: asist?.id,
              idHorarioTrabajador: asist?.idHorarioTrabajador,
              idHorarioTrabajadorItem: asist?.idHorarioTrabajadorItem,
              idDispositivo: asist?.idDispositivo,
              diaLibre,
              diaDescanso,
              marcacionEntrada,
              marcacionSalida,
              correccion,
            },
          };

          const diffMsHor =
            salida && entrada ? salida.getTime() - entrada.getTime() : 0;

          totalHorario = Math.floor(diffMsHor / 1000 / 60) ?? 0;

          const diffMs =
            marcacionSalida && marcacionEntrada
              ? marcacionSalida.getTime() -
                (marcacionEntrada.getTime() < entrada.getTime()
                  ? entrada.getTime()
                  : marcacionEntrada.getTime())
              : 0;

          totalAsistencia = Math.floor(diffMs / 1000 / 60);

          const horaTotal = Math.floor(totalAsistencia / 60);
          const minutoTotal = totalAsistencia % 60;
          const tardanza =
            totalAsistencia !== 0 && !diaLibre
              ? (asist?.diferenciaEntrada! > 0
                  ? Math.abs(asist?.diferenciaEntrada!)
                  : 0) / 60
              : 0;
          const diff = totalAsistencia - totalHorario;
          const sobretiempo =
            totalAsistencia !== 0 && !diaLibre
              ? diff > 0
                ? Math.abs(diff)
                : 0
              : 0;
          const retiro =
            totalAsistencia !== 0 && !diaLibre
              ? diff < 0
                ? Math.abs(diff)
                : 0
              : 0;

          if (totalAsistencia == 0) {
            asistido++;
          } else {
            asistido = 0;
          }

          let newCodigo =
            marcacionEntrada && !marcacionSalida
              ? 'OB'
              : totalAsistencia == 0 && !diaLibre
                ? diaDescanso
                  ? asistido > 1
                    ? 'F'
                    : diario.codigo
                  : 'F'
                : totalAsistencia != 0 &&
                    Math.abs(totalAsistencia - totalHorario) > 10
                  ? diaDescanso
                    ? 'DD'
                    : 'OB'
                  : diario.codigo;

          if (vacacion) {
            const vacInicio = new Date(vacacion.fechaInicio);
            vacInicio.setHours(0, 0, 0);
            const vacFin = new Date(vacacion.fechaFin);
            vacFin.setHours(23, 59, 59);
            const fechaTime = new Date(d.fecha).getTime();
            if (
              vacInicio.getTime() <= fechaTime &&
              fechaTime <= vacFin.getTime()
            ) {
              newCodigo = 'V';
            }
          }

          diario = {
            ...diario,
            tardanza: {
              hora: tardanza > 0 ? Math.floor(tardanza / 60) : 0,
              minuto: tardanza > 0 ? tardanza % 60 : 0,
            },
            sobretiempo: {
              hora: sobretiempo > 0 ? Math.floor(sobretiempo / 60) : 0,
              minuto: sobretiempo > 0 ? sobretiempo % 60 : 0,
            },
            retiro: {
              hora: retiro > 0 ? Math.floor(retiro / 60) : 0,
              minuto: retiro > 0 ? retiro % 60 : 0,
            },
            codigo: newCodigo,
            horaTotal,
            minutoTotal,
          };
        }
        return {
          corrected: !!correccion,
          dia: d.dia,
          numDia: d.diaSemana,
          fecha: d.fecha,
          ...diario,
          totalAsistencia,
          totalHorario,
        };
      });
      const { contratos, sedes, asistencias, horarios, ...x } = t;

      const maxCont = Math.max(...contratos.map((a) => a.orden));
      const contrato = contratos.find((a) => a.orden === maxCont);
      // const maxAsign = Math.max(...sedes.map((a) => a.orden));
      // const asignacion = sedes.find((a) => a.orden === maxAsign);

      const cargo = contrato?.cargo;
      // const sede = asignacion.sede ? asignacion.sede : undefined;
      const diasLaborados = marcaciones.filter(
        (m) => !['-', 'F', 'X', 'DD'].includes(m.codigo),
      ).length;
      const feriados = marcaciones.filter((m) =>
        ['AA'].includes(m.codigo),
      ).length;
      const faltas = marcaciones.filter((m) => ['F'].includes(m.codigo)).length;
      const permisos = marcaciones.filter((m) =>
        ['P'].includes(m.codigo),
      ).length;
      const vacaciones = marcaciones.filter((m) =>
        ['V'].includes(m.codigo),
      ).length;
      const descansos = marcaciones.filter((m) =>
        ['X'].includes(m.codigo),
      ).length;
      const totalDias = marcaciones.filter(
        (m) => !['-'].includes(m.codigo),
      ).length;
      const horasDiarias = contrato?.horasContrato!;
      const horasSemanales =
        horario.items.filter((h) => !h.diaLibre && !h.diaDescanso).length *
        horasDiarias;
      const horasMensuales = diasLaborados * horasDiarias;
      const horasOrdinarias =
        diasLaborados * (horasDiarias > 8 ? 8 : horasDiarias);
      const horasExtra =
        diasLaborados * (horasDiarias > 8 ? horasDiarias - 8 : 0);

      const tardanzas = marcaciones.filter(
        (item) => item.tardanza.hora != 0 || item.tardanza.minuto != 0,
      ).length;

      const retiros = marcaciones.filter(
        (item) => item.retiro.hora != 0 || item.retiro.minuto != 0,
      ).length;

      const sobretiempos = marcaciones.filter(
        (item) => item.sobretiempo.hora != 0 || item.sobretiempo.minuto != 0,
      ).length;

      return {
        trabajador: x,
        cargo,
        sedes,
        marcaciones,
        diasLaborados,
        feriados,
        faltas,
        tardanzas,
        retiros,
        sobretiempos,
        vacaciones,
        permisos,
        descansos,
        totalDias,
        horasDiarias,
        horasSemanales,
        horasMensuales,
        horasOrdinarias,
        horasExtra,
      };
    });
    return listAsistencia
      .flatMap((item) =>
        item.marcaciones.map((m) => ({
          ...m,
          ...item.trabajador,
          cargo: item.cargo,
        })),
      )
      .filter((item) => ['OB'].includes(item.codigo));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('InasistenciaByMonth')
  async findAllInacistenciaByMonth(
    @CurrentUser() user: Usuario,
    @Body() dto: { fecha: Date },
  ): Promise<any> {
    if (!dto || !dto.fecha) {
      throw new BadRequestException(
        'Los parametros proporcionados no coinciden con los requeridos',
      );
    }
    const codigos = {
      1: 'D',
      2: 'N',
      3: 'A',
    };
    const diasMes = getDiasDelMes(dto.fecha);
    const trabajadores = (
      await this.trabajadorService.findAllByMonth(dto.fecha, user?.id)
    ).map((t: Trabajador) => t.toJSON());
    const listAsistencia = trabajadores.map((t: Trabajador) => {
      const horario: HorarioTrabajador = t.horarios[0];

      const vacacion = t.vacaciones[0];
      const now = new Date();
      const marcaciones = diasMes.map((d) => {
        const asist = t.asistencias.find((a: Asistencia) => {
          const fecha = new Date(a.fecha);
          return d.fecha.getTime() === fecha.getTime() && a.isActive;
        });

        let diaLibre = false;

        let diaDescanso = false;

        let diario;

        if (horario) {
          const item = horario.items.find((h) => h.numDia === d.diaSemana)!;

          const justificacion = item?.justificaciones.find(
            (j) => new Date(j.fecha).getTime() === new Date(d.fecha).getTime(),
          );

          diaLibre = d.fecha.getTime() > now.getTime() || item.diaLibre;

          diaDescanso = !diaLibre && item.diaDescanso;

          diario = {
            codigo: !diaLibre
              ? item?.diaDescanso
                ? 'X'
                : codigos[horario.turno?.orden]
              : '-',
            idHorarioTrabajador: horario?.id,
            idHorarioTrabajadorItem: item?.id,
            justificacion: justificacion,
          };

          let newCodigo =
            !diaLibre && !diaDescanso && !asist ? 'F' : diario.codigo;

          if (vacacion) {
            const vacInicio = new Date(vacacion.fechaInicio);
            vacInicio.setHours(0, 0, 0);
            const vacFin = new Date(vacacion.fechaFin);
            vacFin.setHours(23, 59, 59);
            const fechaTime = new Date(d.fecha).getTime();
            if (
              vacInicio.getTime() <= fechaTime &&
              fechaTime <= vacFin.getTime()
            ) {
              newCodigo = 'V';
            }
          }

          diario = {
            ...diario,
            codigo: newCodigo,
            sede: item?.sede,
          };
        }
        return {
          corrected: !!diario?.justificacion,
          dia: d.dia,
          numDia: d.diaSemana,
          fecha: d.fecha,
          ...diario,
        };
      });
      const { contratos, asistencias, horarios, ...x } = t;

      const maxCont = Math.max(...contratos.map((a) => a.orden));
      const contrato = contratos.find((a) => a.orden === maxCont);
      // const maxAsign = Math.max(...sedes.map((a) => a.orden));
      // const asignacion = sedes.find((a) => a.orden === maxAsign);

      const cargo = contrato?.cargo;
      // const sede = /* asignacion.sede ? asignacion.sede : */ undefined;

      return {
        trabajador: x,
        cargo,
        marcaciones,
      };
    });
    return listAsistencia
      .flatMap((item) =>
        item.marcaciones.map((m) => ({
          ...m,
          trabajador: item.trabajador,
          cargo: item.cargo,
        })),
      )
      .filter((item) => ['F'].includes(item.codigo));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('BySupervisorAndDate')
  async findAllBySupervisorAndDate(
    @Body() dto: { fecha: Date },
    @CurrentUser() user: Usuario,
  ): Promise<any> {
    if (!dto || !dto.fecha) {
      throw new BadRequestException(
        'Los parametros proporcionados no coinciden con los requeridos',
      );
    }

    const diaMes = getDia(dto.fecha);
    const usuario = (await this.usuarioService.findByIdUsuarioAndFecha(
      diaMes.fecha,
      user?.id,
    )).toJSON();

    return usuario
      .sedes.map((a: Sede) => {
        const { trabajadores, ...sede } = a;
        return {
          ...sede,
          trabajadores: trabajadores
            .map((at: Trabajador) => {
              const {
                contratos,
                horarios,
                asistencias,
                infos,
                contactos,
                vacaciones,
                permisos,
                ...trabajador
              } = at;
              const { items, ...horario } = horarios[0];
              const itemDia = items.find(
                (h: HorarioTrabajadorItem) => h?.numDia === diaMes.diaSemana,
              )!;
              const asistenciaDia = asistencias[0];
              const horarioEntrada = new Date(diaMes.fecha);
              horarioEntrada.setHours(
                itemDia?.bloque?.horaEntrada ?? 0,
                itemDia?.bloque?.minutoEntrada ?? 0,
              );
              const horarioSalida = new Date(diaMes.fecha);
              horarioSalida.setDate(
                itemDia?.bloque?.horaSalida < itemDia?.bloque?.horaEntrada
                  ? horarioSalida.getDate() + 1
                  : horarioSalida.getDate(),
              );
              horarioSalida.setHours(
                itemDia?.bloque?.horaSalida ?? 0,
                itemDia?.bloque?.minutoSalida ?? 0,
              );
              const fechaNow = new Date();
              return {
                ...trabajador,
                cargo: contratos[0]?.cargo,
                turno: horario.turno,
                contacto: contactos[0],
                info: infos[0],
                horario: {
                  fecha: diaMes.fecha,
                  entrada: !itemDia?.bloque
                    ? null
                    : new Intl.DateTimeFormat('default', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false, // para formato 24 horas
                      }).format(horarioEntrada),
                  salida: !itemDia?.bloque
                    ? null
                    : new Intl.DateTimeFormat('default', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false, // para formato 24 horas
                      }).format(horarioSalida),
                },
                asistencia: {
                  entrada: !asistenciaDia?.marcacionEntrada
                    ? null
                    : new Intl.DateTimeFormat('default', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false, // para formato 24 horas
                      }).format(asistenciaDia.marcacionEntrada),
                  salida: !asistenciaDia?.marcacionSalida
                    ? null
                    : new Intl.DateTimeFormat('default', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false, // para formato 24 horas
                      }).format(asistenciaDia.marcacionSalida),
                },
                fechaNow,
                horarioEntrada,
                horarioSalida,
                asignado: !!itemDia?.bloque,
                estado: asistenciaDia?.marcacionEntrada
                  ? new Date(asistenciaDia?.marcacionEntrada).getTime() >
                    new Date(horarioEntrada).getTime() + 600
                    ? 'tarde'
                    : 'puntual'
                  : fechaNow.getTime() >
                      new Date(horarioEntrada).getTime() + 600
                    ? 'no_asistio'
                    : 'a_tiempo',
              };
            })
            .filter((t) => t.asignado),
        };
      })
      .filter((a) => a.trabajadores.length != 0);
  }
}
