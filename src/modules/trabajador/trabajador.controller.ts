import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Res,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { TrabajadorService } from './trabajador.service';
import { Trabajador } from './trabajador.model';
import { TrabajadorDTO } from './trabajador.dto';
import { getDiasDelMes } from '@common/utils/fecha.function';
import { HorarioTrabajadorItem } from '@modules/horario-trabajador-item/horario-trabajador-item.model';
import { Asistencia } from '@modules/asistencia/asistencia.model';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FaceService } from '@modules/face/face.service';
import { ParseJsonPipe } from '@common/pipes/parse-json.pipe';
import { RegistroBiometricoService } from '@modules/registro-biometrico/registro-biometrico.service';
import { Response } from 'express';

@Controller('trabajadores')
export class TrabajadorController {
  constructor(
    private readonly service: TrabajadorService,
    private readonly biometricoService: RegistroBiometricoService,
    @Inject(forwardRef(() => FaceService))
    private readonly faceService: FaceService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<Trabajador>> {
    console.log("query.q?.isAsigned", query.q?.isAsigned);
    if (!query.q?.isActive) {
      return this.service.findAllInactives(
        user,
        query.limit!,
        query.offset!,
        query.q?.filter,
        query.q?.search,
      );
    } else {
      return this.service.findAll(
        user,
        query.limit!,
        query.offset!,
        query.q?.filter,
        query.q?.search,
        query.q?.isAsigned,
      );
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Trabajador | null> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('archivo'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('dto', ParseJsonPipe) dto: Partial<Trabajador>,
  ): Promise<Trabajador | null> {
    if (file) {
      let descriptor: Float32Array | null =
        await this.faceService.getDescriptorFromBuffer(file.buffer);
      if (!descriptor) {
        throw new BadRequestException('No se detectó rostro en la imagen');
      }
      return this.service.create(
        dto,
        Buffer.from(file.buffer),
        file.originalname,
        Array.from(descriptor),
      );
    } else {
      return this.service.create(dto);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('multiple')
  async createMany(@Body() list: Partial<Trabajador>[]): Promise<Trabajador[]> {
    return this.service.createMany(list);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('archivo'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body('dto', ParseJsonPipe) dto: Partial<Trabajador>,
  ): Promise<[number, Trabajador[]]> {
    if (file) {
      let descriptor: Float32Array | null =
        await this.faceService.getDescriptorFromBuffer(file.buffer);
      if (!descriptor) {
        throw new BadRequestException('No se detectó rostro en la imagen');
      }
      return this.service.update(
        id,
        dto,
        Buffer.from(file.buffer),
        file.originalname,
        Array.from(descriptor),
      );
    } else {
      return this.service.update(id, dto);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, Trabajador[]]> {
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

  @Get('obtenerArchivo/:idBiometrico')
  async obtenerArchivo(
    @Param('idBiometrico') idBiometrico: string,
    @Res() res: Response,
  ) {
    const archivo = await this.service.obtenerArchivo(idBiometrico);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${archivo.fileName}"`,
    );
    res.setHeader('Content-Type', 'application/octet-stream');
    return res.send(archivo.file);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('PagoByMonth')
  async findAllPagoByMonth(@Body() dto: { fecha: Date }): Promise<any[]> {
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
    const trabajadores = await this.service.findAllByMonthPlanilla(dto.fecha);
    return trabajadores
      .map((t) => t.get())
      .map((t) => {
        const horario = t.horarios[0].get();
        const now = new Date();
        const vacacion = t.vacaciones[0];
        const permiso = t.permisos;
        const diasMes = getDiasDelMes(dto.fecha);
        let asistido = 0;

        const marcaciones = diasMes.map((d) => {
          const asist: Asistencia = t.asistencias
            .map((a: Asistencia) => a.get())
            .find((a: Asistencia) => {
              const fecha = new Date(a.fecha);
              return d.fecha.getTime() === fecha.getTime();
            });

          let diaLibre = false;

          let diaDescanso = false;

          let diario;

          let totalHorario = 0;
          let totalAsistencia = 0;

          if (horario) {
            const item: HorarioTrabajadorItem = horario.items
              .map((h: HorarioTrabajadorItem) => h.get())
              .find((h: HorarioTrabajadorItem) => h.numDia === d.diaSemana);

            diaLibre = d.fecha.getTime() > now.getTime() || item.diaLibre;

            diaDescanso = !diaLibre && item.diaDescanso;

            const noBloque = item?.bloque ? true : false;

            const horaEntrada = item.bloque?.get()?.horaEntrada ?? 0;
            const minutoEntrada = item.bloque?.get()?.minutoEntrada ?? 0;

            const entrada = new Date(d.fecha);
            entrada.setHours(horaEntrada, minutoEntrada);

            const horaSalida = item.bloque?.get()?.horaSalida ?? 0;
            const minutoSalida = item.bloque?.get()?.minutoSalida ?? 0;

            const salida = new Date(d.fecha);
            salida.setDate(
              horaSalida < horaEntrada
                ? salida.getDate() + 1
                : salida.getDate(),
            );
            salida.setHours(horaSalida, minutoSalida);

            const marcacionEntrada = asist
              ? new Date(asist?.marcacionEntrada!)
              : null;
            const marcacionSalida = asist
              ? new Date(asist?.marcacionSalida!)
              : null;

            diario = {
              codigo: !diaLibre
                ? item?.diaDescanso
                  ? 'X'
                  : codigos[horario.turno.get()?.orden]
                : '-',
              horario: {
                diaLibre,
                diaDescanso,
                entrada: noBloque ? entrada : null,
                salida: noBloque ? salida : null,
              },
              asistencia: {
                diaLibre,
                diaDescanso,
                marcacionEntrada,
                marcacionSalida,
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
              totalAsistencia == 0 && !diaLibre
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
              const vacInicio = new Date(vacacion.get().fechaInicio);
              vacInicio.setHours(0, 0, 0);
              const vacFin = new Date(vacacion.get().fechaFin);
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
                const pInicio = new Date(p.get().fechaInicio);
                pInicio.setHours(0, 0, 0);
                const pFin = new Date(p.get().fechaFin);
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

        const maxCont = Math.max(...contratos.map((a) => a.get().orden));
        const contrato = contratos
          .find((a) => a.get().orden === maxCont)
          ?.get();

        // const maxAsign = Math.max(...sedes.map((a) => a.get().orden));
        // const asignacion = sedes.find((a) => a.get().orden === maxAsign)?.get();

        const cargo = contrato.cargo ? contrato.cargo.get() : undefined;
        // const sede = asignacion.sede ? asignacion.sede.get() : undefined;

        const diasLaborados = marcaciones.filter(
          (m) => !['-', 'F', 'X', 'V'].includes(m.codigo),
        ).length;
        const feriados = marcaciones.filter((m) =>
          ['AA'].includes(m.codigo),
        ).length;
        const faltas = marcaciones.filter((m) =>
          ['F'].includes(m.codigo),
        ).length;
        const permisos = marcaciones.filter((m) =>
          ['P'].includes(m.codigo),
        ).length;
        const descansos = marcaciones.filter((m) =>
          ['X'].includes(m.codigo),
        ).length;

        const totalDias = marcaciones.filter(
          (m) => !['-', 'V'].includes(m.codigo),
        ).length;

        const totalDiasVacaciones = marcaciones.filter((m) =>
          ['V'].includes(m.codigo),
        ).length;

        const horasDiarias = contrato.horasContrato;
        const horasSemanales =
          horario.items.filter((h) => !h.diaLibre && !h.diaDescanso).length *
          horasDiarias;
        const horasMensuales = diasLaborados * horasDiarias;
        const horasOrdinarias = horasDiarias > 8 ? 8 : horasDiarias;
        const horasExtra = horasDiarias > 8 ? horasDiarias - 8 : 0;

        const totalDiasMes = diasMes.length;

        const salarioBasico = contrato.salarioMensual;

        const salarioDiarioBase = salarioBasico / totalDiasMes;

        const salarioDiario = parseFloat(salarioDiarioBase.toFixed(2));

        const salarioHora = parseFloat((salarioDiario / 8).toFixed(2));

        const horasExtra25 = horasExtra > 2 ? horasExtra - 2 : horasExtra;

        const horasExtra35 = horasExtra - horasExtra25;

        const salarioHoraExtra25 = parseFloat((salarioHora * 1.25).toFixed(2));

        const salarioHoraExtra35 = parseFloat((salarioHora * 1.35).toFixed(2));

        const salarioHoraTotal =
          salarioHora + salarioHoraExtra25 + salarioHoraExtra35;

        const salarioDiarioExtra25 = horasExtra25 * salarioHoraExtra25;

        const salarioDiarioExtra35 = horasExtra35 * salarioHoraExtra35;

        const salarioDiarioTotal =
          salarioDiario + salarioDiarioExtra25 + salarioDiarioExtra35;

        const salarioMesExtra25 = salarioDiarioExtra25 * diasLaborados;

        const salarioMesExtra35 = salarioDiarioExtra35 * diasLaborados;

        const descuentoFaltas = parseFloat((faltas * salarioDiario).toFixed(2));

        const salarioVacaciones = parseFloat(
          (totalDiasVacaciones * salarioDiario).toFixed(2),
        );

        const salarioMensual = parseFloat(
          (salarioDiarioBase * (totalDias + totalDiasVacaciones)).toFixed(2),
        );

        const salarioFeriado = parseFloat((0).toFixed(2));

        const sis = parseFloat((15).toFixed(2));

        const sctr = parseFloat((0).toFixed(2));

        const essalud = parseFloat((0).toFixed(2));

        const salarioMensualTotal =
          salarioMensual + salarioMesExtra25 + salarioMesExtra35;

        const sueldoBruto =
          salarioMensualTotal + salarioFeriado - descuentoFaltas;

        const montoAFP = parseFloat((sueldoBruto * 0.1137).toFixed(2));

        const montoONP = parseFloat((0).toFixed(2));

        const pagoNeto = sueldoBruto - montoAFP - sis;

        return {
          ...x,
          cargo,
          sedes,
          diasLaborados,
          feriados,
          faltas,
          permisos,
          descansos,
          totalDias,
          horasDiarias,
          horasSemanales,
          horasMensuales,
          horasOrdinarias,
          totalDiasMes,
          salarioBasico,
          salarioDiario,
          salarioHora,
          horasExtra25,
          horasExtra35,
          salarioHoraExtra25,
          salarioHoraExtra35,
          salarioHoraTotal,
          salarioDiarioExtra25,
          salarioDiarioExtra35,
          salarioDiarioTotal,
          salarioMensual,
          salarioMesExtra25,
          salarioMesExtra35,
          sueldoBruto,
          descuentoFaltas,
          totalDiasVacaciones,
          salarioVacaciones,
          salarioFeriado,
          montoAFP,
          montoONP,
          sis,
          sctr,
          essalud,
          pagoNeto,
        };
      });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('PagoByMonthDescanseros')
  async findAllPagoByMonthDescanseros(
    @Body() dto: { fecha: Date },
  ): Promise<any[]> {
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
    const trabajadores = await this.service.findAllByMonthDescanseros(
      dto.fecha,
    );
    return trabajadores
      .map((t) => t.get())
      .map((t) => {
        const horario = t.horarios[0].get();
        const now = new Date();
        const diasMes = getDiasDelMes(dto.fecha);
        let asistido = 0;

        const marcaciones = diasMes.map((d) => {
          const asist: Asistencia = t.asistencias
            .map((a: Asistencia) => a.get())
            .find((a: Asistencia) => {
              const fecha = new Date(a.fecha);
              return d.fecha.getTime() === fecha.getTime();
            });

          let diaLibre = false;

          let diaDescanso = false;

          let diario;

          let totalHorario = 0;
          let totalAsistencia = 0;

          if (horario) {
            const item: HorarioTrabajadorItem = horario.items
              .map((h: HorarioTrabajadorItem) => h.get())
              .find((h: HorarioTrabajadorItem) => h.numDia === d.diaSemana);

            diaLibre = d.fecha.getTime() > now.getTime() || item.diaLibre;

            diaDescanso = !diaLibre && item.diaDescanso;

            const noBloque = item?.bloque ? true : false;

            const horaEntrada = item.bloque?.get()?.horaEntrada ?? 0;
            const minutoEntrada = item.bloque?.get()?.minutoEntrada ?? 0;

            const entrada = new Date(d.fecha);
            entrada.setHours(horaEntrada, minutoEntrada);

            const horaSalida = item.bloque?.get()?.horaSalida ?? 0;
            const minutoSalida = item.bloque?.get()?.minutoSalida ?? 0;

            const salida = new Date(d.fecha);
            salida.setDate(
              horaSalida < horaEntrada
                ? salida.getDate() + 1
                : salida.getDate(),
            );
            salida.setHours(horaSalida, minutoSalida);

            const marcacionEntrada = asist
              ? new Date(asist?.marcacionEntrada!)
              : null;
            const marcacionSalida = asist
              ? new Date(asist?.marcacionSalida!)
              : null;

            diario = {
              codigo: !diaLibre
                ? item?.diaDescanso
                  ? 'X'
                  : codigos[horario.turno.get()?.orden]
                : '-',
              horario: {
                diaLibre,
                diaDescanso,
                entrada: noBloque ? entrada : null,
                salida: noBloque ? salida : null,
              },
              asistencia: {
                diaLibre,
                diaDescanso,
                marcacionEntrada,
                marcacionSalida,
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
              totalAsistencia == 0 && !diaLibre
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

        const maxCont = Math.max(...contratos.map((a) => a.get().orden));
        const contrato = contratos
          .find((a) => a.get().orden === maxCont)
          ?.get();

        const maxAsign = Math.max(...sedes.map((a) => a.get().orden));
        const asignacion = sedes.find((a) => a.get().orden === maxAsign)?.get();

        const cargo = contrato.cargo ? contrato.cargo.get() : undefined;
        const sede = asignacion.sede ? asignacion.sede.get() : undefined;

        const diasLaborados = marcaciones.filter(
          (m) => !['-', 'F', 'X', 'V'].includes(m.codigo),
        ).length;
        const feriados = marcaciones.filter((m) =>
          ['AA'].includes(m.codigo),
        ).length;
        const faltas = marcaciones.filter((m) =>
          ['F'].includes(m.codigo),
        ).length;
        const permisos = marcaciones.filter((m) =>
          ['P'].includes(m.codigo),
        ).length;
        const descansos = marcaciones.filter((m) =>
          ['X'].includes(m.codigo),
        ).length;

        const totalDias = marcaciones.filter(
          (m) => !['-', 'V'].includes(m.codigo),
        ).length;

        const totalDiasVacaciones = marcaciones.filter((m) =>
          ['V'].includes(m.codigo),
        ).length;

        const horasDiarias = contrato.horasContrato;
        const horasSemanales =
          horario.items.filter((h) => !h.diaLibre && !h.diaDescanso).length *
          horasDiarias;
        const horasMensuales = diasLaborados * horasDiarias;
        const horasOrdinarias = horasDiarias > 8 ? 8 : horasDiarias;
        const horasExtra = horasDiarias > 8 ? horasDiarias - 8 : 0;

        const totalDiasMes = diasMes.length;

        const salarioDiario = contrato.salarioMensual;

        const salarioHora = parseFloat((salarioDiario / 8).toFixed(2));

        const horasExtra25 = horasExtra > 2 ? horasExtra - 2 : horasExtra;

        const horasExtra35 = horasExtra - horasExtra25;

        const salarioHoraExtra25 = parseFloat((salarioHora * 1.25).toFixed(2));

        const salarioHoraExtra35 = parseFloat((salarioHora * 1.35).toFixed(2));

        const salarioHoraTotal =
          salarioHora + salarioHoraExtra25 + salarioHoraExtra35;

        const salarioDiarioExtra25 = horasExtra25 * salarioHoraExtra25;

        const salarioDiarioExtra35 = horasExtra35 * salarioHoraExtra35;

        const salarioDiarioTotal =
          salarioDiario + salarioDiarioExtra25 + salarioDiarioExtra35;

        const salarioMesExtra25 = salarioDiarioExtra25 * diasLaborados;

        const salarioMesExtra35 = salarioDiarioExtra35 * diasLaborados;

        const descuentoFaltas = parseFloat((faltas * salarioDiario).toFixed(2));

        const salarioVacaciones = parseFloat(
          (totalDiasVacaciones * salarioDiario).toFixed(2),
        );

        const salarioMensual = parseFloat(
          (salarioDiario * diasLaborados).toFixed(2),
        );

        const salarioMensualTotal =
          salarioMensual + salarioMesExtra25 + salarioMesExtra35;

        const sueldoBruto = salarioMensualTotal;

        const pagoNeto = sueldoBruto;

        return {
          ...x,
          cargo,
          sede,
          diasLaborados,
          feriados,
          faltas,
          permisos,
          descansos,
          totalDias,
          horasDiarias,
          horasSemanales,
          horasMensuales,
          horasOrdinarias,
          totalDiasMes,
          salarioDiario,
          salarioHora,
          horasExtra25,
          horasExtra35,
          salarioHoraExtra25,
          salarioHoraExtra35,
          salarioHoraTotal,
          salarioDiarioExtra25,
          salarioDiarioExtra35,
          salarioDiarioTotal,
          salarioMensual,
          salarioMesExtra25,
          salarioMesExtra35,
          sueldoBruto,
          descuentoFaltas,
          totalDiasVacaciones,
          salarioVacaciones,
          pagoNeto,
        };
      });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('PagoByMonthReemplazo')
  async findAllPagoByMonthReemplazo(
    @Body() dto: { fecha: Date },
  ): Promise<any[]> {
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
    const trabajadores = await this.service.findAllByMonthReemplazos(dto.fecha);
    return trabajadores
      .map((t) => t.get())
      .map((t) => {
        const horario = t.horarios[0].get();
        const now = new Date();
        const vacacion = t.vacaciones[0];
        const permiso = t.permisos;
        const diasMes = getDiasDelMes(dto.fecha);
        let asistido = 0;

        const marcaciones = diasMes.map((d) => {
          const asist: Asistencia = t.asistencias
            .map((a: Asistencia) => a.get())
            .find((a: Asistencia) => {
              const fecha = new Date(a.fecha);
              return d.fecha.getTime() === fecha.getTime();
            });

          let diaLibre = false;

          let diaDescanso = false;

          let diario;

          let totalHorario = 0;
          let totalAsistencia = 0;

          if (horario) {
            const item: HorarioTrabajadorItem = horario.items
              .map((h: HorarioTrabajadorItem) => h.get())
              .find((h: HorarioTrabajadorItem) => h.numDia === d.diaSemana);

            diaLibre = d.fecha.getTime() > now.getTime() || item.diaLibre;

            diaDescanso = !diaLibre && item.diaDescanso;

            const noBloque = item?.bloque ? true : false;

            const horaEntrada = item.bloque?.get()?.horaEntrada ?? 0;
            const minutoEntrada = item.bloque?.get()?.minutoEntrada ?? 0;

            const entrada = new Date(d.fecha);
            entrada.setHours(horaEntrada, minutoEntrada);

            const horaSalida = item.bloque?.get()?.horaSalida ?? 0;
            const minutoSalida = item.bloque?.get()?.minutoSalida ?? 0;

            const salida = new Date(d.fecha);
            salida.setDate(
              horaSalida < horaEntrada
                ? salida.getDate() + 1
                : salida.getDate(),
            );
            salida.setHours(horaSalida, minutoSalida);

            const marcacionEntrada = asist
              ? new Date(asist?.marcacionEntrada!)
              : null;
            const marcacionSalida = asist
              ? new Date(asist?.marcacionSalida!)
              : null;

            diario = {
              codigo: !diaLibre
                ? item?.diaDescanso
                  ? 'X'
                  : codigos[horario.turno.get()?.orden]
                : '-',
              horario: {
                diaLibre,
                diaDescanso,
                entrada: noBloque ? entrada : null,
                salida: noBloque ? salida : null,
              },
              asistencia: {
                diaLibre,
                diaDescanso,
                marcacionEntrada,
                marcacionSalida,
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
              totalAsistencia == 0 && !diaLibre
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
              const vacInicio = new Date(vacacion.get().fechaInicio);
              vacInicio.setHours(0, 0, 0);
              const vacFin = new Date(vacacion.get().fechaFin);
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
                const pInicio = new Date(p.get().fechaInicio);
                pInicio.setHours(0, 0, 0);
                const pFin = new Date(p.get().fechaFin);
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

        const maxCont = Math.max(...contratos.map((a) => a.get().orden));
        const contrato = contratos
          .find((a) => a.get().orden === maxCont)
          ?.get();

        const maxAsign = Math.max(...sedes.map((a) => a.get().orden));
        const asignacion = sedes.find((a) => a.get().orden === maxAsign)?.get();

        const cargo = contrato.cargo ? contrato.cargo.get() : undefined;
        const sede = asignacion.sede ? asignacion.sede.get() : undefined;

        const diasLaborados = marcaciones.filter(
          (m) => !['-', 'F', 'X', 'V'].includes(m.codigo),
        ).length;
        const feriados = marcaciones.filter((m) =>
          ['AA'].includes(m.codigo),
        ).length;
        const faltas = marcaciones.filter((m) =>
          ['F'].includes(m.codigo),
        ).length;
        const permisos = marcaciones.filter((m) =>
          ['P'].includes(m.codigo),
        ).length;
        const descansos = marcaciones.filter((m) =>
          ['X'].includes(m.codigo),
        ).length;

        const totalDias = marcaciones.filter(
          (m) => !['-', 'V'].includes(m.codigo),
        ).length;

        const totalDiasVacaciones = marcaciones.filter((m) =>
          ['V'].includes(m.codigo),
        ).length;

        const horasDiarias = contrato.horasContrato;
        const horasSemanales =
          horario.items.filter((h) => !h.diaLibre && !h.diaDescanso).length *
          horasDiarias;
        const horasMensuales = diasLaborados * horasDiarias;
        const horasOrdinarias = horasDiarias > 8 ? 8 : horasDiarias;
        const horasExtra = horasDiarias > 8 ? horasDiarias - 8 : 0;

        const totalDiasMes = diasMes.length;

        const salarioBasico = contrato.salarioMensual;

        const salarioDiarioBase = salarioBasico / totalDiasMes;

        const salarioDiario = parseFloat(salarioDiarioBase.toFixed(2));

        const salarioHora = parseFloat((salarioDiario / 8).toFixed(2));

        const horasExtra25 = horasExtra > 2 ? horasExtra - 2 : horasExtra;

        const horasExtra35 = horasExtra - horasExtra25;

        const salarioHoraExtra25 = parseFloat((salarioHora * 1.25).toFixed(2));

        const salarioHoraExtra35 = parseFloat((salarioHora * 1.35).toFixed(2));

        const salarioHoraTotal =
          salarioHora + salarioHoraExtra25 + salarioHoraExtra35;

        const salarioDiarioExtra25 = horasExtra25 * salarioHoraExtra25;

        const salarioDiarioExtra35 = horasExtra35 * salarioHoraExtra35;

        const salarioDiarioTotal =
          salarioDiario + salarioDiarioExtra25 + salarioDiarioExtra35;

        const salarioMesExtra25 = salarioDiarioExtra25 * diasLaborados;

        const salarioMesExtra35 = salarioDiarioExtra35 * diasLaborados;

        const descuentoFaltas = parseFloat((faltas * salarioDiario).toFixed(2));

        const salarioVacaciones = parseFloat(
          (totalDiasVacaciones * salarioDiario).toFixed(2),
        );

        const salarioMensual = parseFloat(
          (salarioDiarioBase * (totalDias + totalDiasVacaciones)).toFixed(2),
        );

        const salarioFeriado = parseFloat((0).toFixed(2));

        const sis = parseFloat((15).toFixed(2));

        const sctr = parseFloat((0).toFixed(2));

        const essalud = parseFloat((0).toFixed(2));

        const salarioMensualTotal =
          salarioMensual + salarioMesExtra25 + salarioMesExtra35;

        const sueldoBruto =
          salarioMensualTotal + salarioFeriado - descuentoFaltas;

        const montoAFP = parseFloat((sueldoBruto * 0.1137).toFixed(2));

        const montoONP = parseFloat((0).toFixed(2));

        const pagoNeto = sueldoBruto - montoAFP - sis;

        return {
          ...x,
          cargo,
          sede,
          diasLaborados,
          feriados,
          faltas,
          permisos,
          descansos,
          totalDias,
          horasDiarias,
          horasSemanales,
          horasMensuales,
          horasOrdinarias,
          totalDiasMes,
          salarioBasico,
          salarioDiario,
          salarioHora,
          horasExtra25,
          horasExtra35,
          salarioHoraExtra25,
          salarioHoraExtra35,
          salarioHoraTotal,
          salarioDiarioExtra25,
          salarioDiarioExtra35,
          salarioDiarioTotal,
          salarioMensual,
          salarioMesExtra25,
          salarioMesExtra35,
          sueldoBruto,
          descuentoFaltas,
          totalDiasVacaciones,
          salarioVacaciones,
          salarioFeriado,
          montoAFP,
          montoONP,
          sis,
          sctr,
          essalud,
          pagoNeto,
        };
      });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('PagoByMonthAndIdTrabajador')
  async findPagoByMonthAndIdTrabajador(
    @Body() dto: { id: string; fecha: Date },
  ): Promise<any> {
    if (!dto || !dto.id || !dto.fecha) {
      throw new BadRequestException(
        'Los parametros proporcionados no coinciden con los requeridos',
      );
    }
    const codigos = {
      1: 'D',
      2: 'N',
      3: 'A',
    };
    const trabajador = await this.service.findOneByIdAndMonth(
      dto.id,
      dto.fecha,
    );

    if (trabajador) {
      const t = trabajador.get();
      const horario = t.horarios[0].get();
      const now = new Date();
      const vacacion = t.vacaciones[0];
      const permiso = t.permisos;
      const diasMes = getDiasDelMes(dto.fecha);
      let asistido = 0;
      const marcaciones = diasMes.map((d) => {
        const asist = (t.asistencias ?? []).find((a) => {
          const fecha = new Date(a.get().fecha);
          return (
            d.fecha.toISOString().split('T')[0] ===
            fecha.toISOString().split('T')[0]
          );
        });

        let diaLibre = false;

        let diaDescanso = false;

        let diario;

        let totalHorario = 0;
        let totalAsistencia = 0;

        if (horario) {
          const item: HorarioTrabajadorItem = horario.items
            .map((h: HorarioTrabajadorItem) => h.get())
            .find((h: HorarioTrabajadorItem) => h.numDia === d.diaSemana);

          diaLibre = d.fecha.getTime() > now.getTime() || item.diaLibre;

          diaDescanso = !diaLibre && item.diaDescanso;

          const noBloque = item?.bloque ? true : false;

          const horaEntrada = item.bloque?.get()?.horaEntrada ?? 0;
          const minutoEntrada = item.bloque?.get()?.minutoEntrada ?? 0;

          const entrada = new Date(d.fecha);
          entrada.setHours(horaEntrada, minutoEntrada);

          const horaSalida = item.bloque?.get()?.horaSalida ?? 0;
          const minutoSalida = item.bloque?.get()?.minutoSalida ?? 0;

          const salida = new Date(d.fecha);
          salida.setDate(
            horaSalida < horaEntrada ? salida.getDate() + 1 : salida.getDate(),
          );
          salida.setHours(horaSalida, minutoSalida);

          const marcacionEntrada = asist
            ? new Date(asist?.marcacionEntrada!)
            : null;
          const marcacionSalida = asist
            ? new Date(asist?.marcacionSalida!)
            : null;

          diario = {
            codigo: !diaLibre
              ? item?.diaDescanso
                ? 'X'
                : codigos[horario.turno.get()?.orden]
              : '-',
            horario: {
              diaLibre,
              diaDescanso,
              entrada: noBloque ? entrada : null,
              salida: noBloque ? salida : null,
            },
            asistencia: {
              diaLibre,
              diaDescanso,
              marcacionEntrada,
              marcacionSalida,
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
            totalAsistencia == 0 && !diaLibre
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
            const vacInicio = new Date(vacacion.get().fechaInicio);
            vacInicio.setHours(0, 0, 0);
            const vacFin = new Date(vacacion.get().fechaFin);
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
              const pInicio = new Date(p.get().fechaInicio);
              pInicio.setHours(0, 0, 0);
              const pFin = new Date(p.get().fechaFin);
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

      const maxCont = Math.max(...contratos.map((a) => a.get().orden));
      const contrato = contratos.find((a) => a.get().orden === maxCont)?.get();

      const maxAsign = Math.max(...sedes.map((a) => a.get().orden));
      const asignacion = sedes.find((a) => a.get().orden === maxAsign)?.get();

      const cargo = contrato.cargo ? contrato.cargo.get() : undefined;
      const sede = asignacion.sede ? asignacion.sede.get() : undefined;

      const diasLaborados = marcaciones.filter(
        (m) => !['-', 'F', 'X', 'V'].includes(m.codigo),
      ).length;
      const feriados = marcaciones.filter((m) =>
        ['AA'].includes(m.codigo),
      ).length;
      const faltas = marcaciones.filter((m) => ['F'].includes(m.codigo)).length;
      const permisos = marcaciones.filter((m) =>
        ['P'].includes(m.codigo),
      ).length;
      const descansos = marcaciones.filter((m) =>
        ['X'].includes(m.codigo),
      ).length;
      const totalDias = marcaciones.filter(
        (m) => !['-', 'V'].includes(m.codigo),
      ).length;

      const totalDiasVacaciones = marcaciones.filter((m) =>
        ['V'].includes(m.codigo),
      ).length;

      const horasDiarias = contrato.horasContrato;
      const horasSemanales =
        horario.items.filter((h) => !h.diaLibre && !h.diaDescanso).length *
        horasDiarias;
      const horasMensuales = diasLaborados * horasDiarias;
      const horasOrdinarias = horasDiarias > 8 ? 8 : horasDiarias;
      const horasExtra = horasDiarias > 8 ? horasDiarias - 8 : 0;

      const totalDiasMes = diasMes.length;

      const salarioBasico = contrato.salarioMensual;

      const salarioDiarioBase = salarioBasico / totalDiasMes;

      const salarioDiario = parseFloat(salarioDiarioBase.toFixed(2));

      const salarioHora = parseFloat((salarioDiario / 8).toFixed(2));

      const horasExtra25 = horasExtra > 2 ? horasExtra - 2 : horasExtra;

      const horasExtra35 = horasExtra - horasExtra25;

      const salarioHoraExtra25 = parseFloat((salarioHora * 1.25).toFixed(2));

      const salarioHoraExtra35 = parseFloat((salarioHora * 1.35).toFixed(2));

      const salarioHoraTotal =
        salarioHora + salarioHoraExtra25 + salarioHoraExtra35;

      const salarioDiarioExtra25 = horasExtra25 * salarioHoraExtra25;

      const salarioDiarioExtra35 = horasExtra35 * salarioHoraExtra35;

      const salarioDiarioTotal =
        salarioDiario + salarioDiarioExtra25 + salarioDiarioExtra35;

      const salarioMesExtra25 = salarioDiarioExtra25 * diasLaborados;

      const salarioMesExtra35 = salarioDiarioExtra35 * diasLaborados;

      const descuentoFaltas = parseFloat((faltas * salarioDiario).toFixed(2));

      const salarioVacaciones = parseFloat(
        (totalDiasVacaciones * salarioDiario).toFixed(2),
      );

      const salarioMensual = parseFloat(
        (salarioDiarioBase * (totalDias + totalDiasVacaciones)).toFixed(2),
      );

      const salarioFeriado = parseFloat((0).toFixed(2));

      const sis = parseFloat((15).toFixed(2));

      const sctr = parseFloat((0).toFixed(2));

      const essalud = parseFloat((0).toFixed(2));

      const salarioMensualTotal =
        salarioMensual + salarioMesExtra25 + salarioMesExtra35;

      const sueldoBruto =
        salarioMensualTotal + salarioFeriado - descuentoFaltas;

      const montoAFP = parseFloat((sueldoBruto * 0.1137).toFixed(2));

      const montoONP = parseFloat((0).toFixed(2));

      const pagoNeto = sueldoBruto - montoAFP - sis;

      return {
        ...x,
        cargo,
        sede,
        diasLaborados,
        feriados,
        faltas,
        permisos,
        descansos,
        totalDias,
        horasDiarias,
        horasSemanales,
        horasMensuales,
        horasOrdinarias,
        totalDiasMes,
        salarioBasico,
        salarioDiario,
        salarioHora,
        horasExtra25,
        horasExtra35,
        salarioHoraExtra25,
        salarioHoraExtra35,
        salarioHoraTotal,
        salarioDiarioExtra25,
        salarioDiarioExtra35,
        salarioDiarioTotal,
        salarioMensual,
        salarioMensualTotal,
        salarioMesExtra25,
        salarioMesExtra35,
        sueldoBruto,
        descuentoFaltas,
        totalDiasVacaciones,
        salarioVacaciones,
        salarioFeriado,
        montoAFP,
        montoONP,
        sis,
        sctr,
        essalud,
        pagoNeto,
      };
    } else {
      return null;
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('ComprobantePagoByMonthAndIdTrabajador')
  async findComprobantePagoByMonthAndIdTrabajador(
    @Body() dto: { id: string; fecha: Date },
  ): Promise<any> {
    if (!dto || !dto.id || !dto.fecha) {
      throw new BadRequestException(
        'Los parametros proporcionados no coinciden con los requeridos',
      );
    }

    return this.service.getComprobantePago(dto.id, dto.fecha);
  }
}
