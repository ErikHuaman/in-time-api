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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Asistencia | null> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: AsistenciaDTO): Promise<Asistencia | null> {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: AsistenciaDTO,
  ): Promise<[number, Asistencia[]]> {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, Asistencia[]]> {
    return this.service.changeStatus(id, isActive);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('restore/:id')
  restore(@Param('id') id: string): Promise<void> {
    return this.service.restore(id);
  }

  @ApiBearerAuth()
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
      const vacaciones = t.vacaciones;
      const inactivaciones = t.inactivaciones;
      const permiso = t.permisos;

      const maxCont = Math.max(...t.contratos.map((a) => a.orden));
      const contrato = t.contratos.find((a) => a.orden === maxCont);
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

          let newCodigo = '';

          const fechaTime = new Date(d.fecha).getTime();

          // 1. Verificar si la fecha es antes del contrato
          if (contrato) {
            const conInicio = new Date(contrato.fechaInicio);
            conInicio.setHours(0, 0, 0);
            if (fechaTime < conInicio.getTime()) {
              newCodigo = '-';
            }
          }

          // 2. Verificar vacaciones
          if (vacaciones?.length && newCodigo === '') {
            const estaDeVacaciones = vacaciones.some((vac) => {
              const inicio = new Date(vac.fechaInicio);
              inicio.setHours(0, 0, 0);
              const fin = new Date(vac.fechaFin);
              fin.setHours(23, 59, 59);
              return (
                inicio.getTime() <= fechaTime && fechaTime <= fin.getTime()
              );
            });

            if (estaDeVacaciones) {
              newCodigo = 'V';
            }
          }

          // 3. Verificar suspensión (solo si no está en vacaciones ni fuera de contrato)
          if (inactivaciones?.length && newCodigo === '') {
            const estaSuspendido = inactivaciones.some((susp) => {
              const inicio = new Date(susp.fechaInicio);
              inicio.setHours(0, 0, 0);
              const fin = new Date(susp.fechaFin);
              fin.setHours(23, 59, 59);
              return (
                inicio.getTime() <= fechaTime && fechaTime <= fin.getTime()
              );
            });

            if (estaSuspendido) {
              newCodigo = 'S';
            }
          }

          // 4. Verificar permisos (solo si no está en vacaciones ni suspensión ni fuera de contrato)
          if (permiso?.length && newCodigo === '') {
            const tienePermiso = permiso.some((p) => {
              const inicio = new Date(p.fechaInicio);
              inicio.setHours(0, 0, 0);
              const fin = new Date(p.fechaFin);
              fin.setHours(23, 59, 59);
              return (
                inicio.getTime() <= fechaTime && fechaTime <= fin.getTime()
              );
            });

            if (tienePermiso) {
              newCodigo = 'P';
            }
          }

          newCodigo =
            newCodigo === ''
              ? marcacionEntrada && !marcacionSalida
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
                    : diario.codigo
              : newCodigo;

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
            sede: item?.sede,
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

      const cargo = contrato?.cargo;
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
      const vacacionesNum = marcaciones.filter((m) =>
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
        vacaciones: vacacionesNum,
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
    const diasMes = getDiasDelMes(dto.fecha);
    const trabajadores = (
      await this.trabajadorService.findAllByMonth(dto.fecha, user?.id)
    ).map((t: Trabajador) => t.toJSON());
    let asistido = 0;
    const listAsistencia = trabajadores.map((t: Trabajador) => {
      const horario: HorarioTrabajador = t.horarios[0];
      const vacaciones = t.vacaciones;
      const inactivaciones = t.inactivaciones;
      const permiso = t.permisos;

      const maxCont = Math.max(...t.contratos.map((a) => a.orden));
      const contrato = t.contratos.find((a) => a.orden === maxCont);

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

          console.log("item", item.sede)

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
                : horario.turno?.codigo
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

          let newCodigo = '';

          const fechaTime = new Date(d.fecha).getTime();

          // 1. Verificar si la fecha es antes del contrato
          if (contrato) {
            const conInicio = new Date(contrato.fechaInicio);
            conInicio.setHours(0, 0, 0);
            if (fechaTime < conInicio.getTime()) {
              newCodigo = '-';
            }
          }

          // 2. Verificar vacaciones
          if (vacaciones?.length && newCodigo === '') {
            const estaDeVacaciones = vacaciones.some((vac) => {
              const inicio = new Date(vac.fechaInicio);
              inicio.setHours(0, 0, 0);
              const fin = new Date(vac.fechaFin);
              fin.setHours(23, 59, 59);
              return (
                inicio.getTime() <= fechaTime && fechaTime <= fin.getTime()
              );
            });

            if (estaDeVacaciones) {
              newCodigo = 'V';
            }
          }

          // 3. Verificar suspensión (solo si no está en vacaciones ni fuera de contrato)
          if (inactivaciones?.length && newCodigo === '') {
            const estaSuspendido = inactivaciones.some((susp) => {
              const inicio = new Date(susp.fechaInicio);
              inicio.setHours(0, 0, 0);
              const fin = new Date(susp.fechaFin);
              fin.setHours(23, 59, 59);
              return (
                inicio.getTime() <= fechaTime && fechaTime <= fin.getTime()
              );
            });

            if (estaSuspendido) {
              newCodigo = 'S';
            }
          }

          // 4. Verificar permisos (solo si no está en vacaciones ni suspensión ni fuera de contrato)
          if (permiso?.length && newCodigo === '') {
            const tienePermiso = permiso.some((p) => {
              const inicio = new Date(p.fechaInicio);
              inicio.setHours(0, 0, 0);
              const fin = new Date(p.fechaFin);
              fin.setHours(23, 59, 59);
              return (
                inicio.getTime() <= fechaTime && fechaTime <= fin.getTime()
              );
            });

            if (tienePermiso) {
              newCodigo = 'P';
            }
          }

          newCodigo =
            newCodigo === ''
              ? marcacionEntrada && !marcacionSalida
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
                    : diario.codigo
              : newCodigo;

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
            sede: item?.sede,
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

      const cargo = contrato?.cargo;
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
      const vacacionesNum = marcaciones.filter((m) =>
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
        vacaciones: vacacionesNum,
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

    const diasMes = getDiasDelMes(dto.fecha);
    const trabajadores = (
      await this.trabajadorService.findAllByMonth(dto.fecha, user?.id)
    ).map((t: Trabajador) => t.toJSON());
    let asistido = 0;
    const listAsistencia = trabajadores.map((t: Trabajador) => {
      const horario: HorarioTrabajador = t.horarios[0];

      const vacaciones = t.vacaciones;
      const inactivaciones = t.inactivaciones;
      const permiso = t.permisos;

      const maxCont = Math.max(...t.contratos.map((a) => a.orden));
      const contrato = t.contratos.find((a) => a.orden === maxCont);

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
            turno: horario?.turno,
            idHorarioTrabajador: horario?.id,
            idHorarioTrabajadorItem: item?.id,
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

          let newCodigo = '';

          const fechaTime = new Date(d.fecha).getTime();

          // 1. Verificar si la fecha es antes del contrato
          if (contrato) {
            const conInicio = new Date(contrato.fechaInicio);
            conInicio.setHours(0, 0, 0);
            if (fechaTime < conInicio.getTime()) {
              newCodigo = '-';
            }
          }

          // 2. Verificar vacaciones
          if (vacaciones?.length && newCodigo === '') {
            const estaDeVacaciones = vacaciones.some((vac) => {
              const inicio = new Date(vac.fechaInicio);
              inicio.setHours(0, 0, 0);
              const fin = new Date(vac.fechaFin);
              fin.setHours(23, 59, 59);
              return (
                inicio.getTime() <= fechaTime && fechaTime <= fin.getTime()
              );
            });

            if (estaDeVacaciones) {
              newCodigo = 'V';
            }
          }

          // 3. Verificar suspensión (solo si no está en vacaciones ni fuera de contrato)
          if (inactivaciones?.length && newCodigo === '') {
            const estaSuspendido = inactivaciones.some((susp) => {
              const inicio = new Date(susp.fechaInicio);
              inicio.setHours(0, 0, 0);
              const fin = new Date(susp.fechaFin);
              fin.setHours(23, 59, 59);
              return (
                inicio.getTime() <= fechaTime && fechaTime <= fin.getTime()
              );
            });

            if (estaSuspendido) {
              newCodigo = 'S';
            }
          }

          // 4. Verificar permisos (solo si no está en vacaciones ni suspensión ni fuera de contrato)
          if (permiso?.length && newCodigo === '') {
            const tienePermiso = permiso.some((p) => {
              const inicio = new Date(p.fechaInicio);
              inicio.setHours(0, 0, 0);
              const fin = new Date(p.fechaFin);
              fin.setHours(23, 59, 59);
              return (
                inicio.getTime() <= fechaTime && fechaTime <= fin.getTime()
              );
            });

            if (tienePermiso) {
              newCodigo = 'P';
            }
          }

          newCodigo =
            newCodigo === ''
              ? marcacionEntrada && !marcacionSalida
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
                    : diario.codigo
              : newCodigo;

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
            sede: item?.sede,
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

      const cargo = contrato?.cargo;

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
    console.log('BySupervisorAndDate');
    if (!dto || !dto.fecha) {
      throw new BadRequestException(
        'Los parametros proporcionados no coinciden con los requeridos',
      );
    }

    const diaMes = getDia(dto.fecha);

    const usuario = (
      await this.usuarioService.findByIdUsuarioAndFecha(diaMes.fecha, user?.id)
    ).toJSON();

    return usuario.sedes
      .map((a: Sede) => {
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
