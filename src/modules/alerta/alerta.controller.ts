import {
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
import { AlertaService } from './alerta.service';
import { Alerta } from './alerta.model';
import { Cron } from '@nestjs/schedule';
import { AsistenciaService } from '@modules/asistencia/asistencia.service';
import { AlertaGateway } from './alerta.gateway';
import { SedeService } from '@modules/sede/sede.service';
import { Sede } from '@modules/sede/sede.model';
import { AsignacionSede } from '@modules/asignacion-sede/asignacion-sede.model';
import { HorarioTrabajadorItem } from '@modules/horario-trabajador-item/horario-trabajador-item.model';
import { getDia } from '@common/utils/fecha.function';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

type AgrupadoPorUsuario = {
  idUsuario: string;
  nuevos: Alerta[];
  historicos: Alerta[];
};

@Controller('alerta')
export class AlertaController {
  constructor(
    private readonly service: AlertaService,
    private readonly asistenciaService: AsistenciaService,
    private readonly sedeService: SedeService,
    private readonly alertaGateway: AlertaGateway,
  ) {}

  @Cron('*/5 * * * *') // cada 5 minutos
  async verificarRetrasos() {
    const fecha = new Date();
    fecha.setHours(0, 0, 0, 0);
    const diaMes = getDia(fecha);

    const sedes = await this.sedeService.findByFecha(fecha);

    const resultados = sedes.map((s: Sede) => {
      const sede = s.get();
      return {
        usuarios: sede.asignacionUsuario.map((item) => item?.get()?.idUsuario),
        ...sede,
        trabajadores: sede.asignacion
          .map((at: AsignacionSede) => {
            const {
              contratos,
              horarios,
              asistencias,
              infos,
              contactos,
              vacaciones,
              permisos,
              ...trabajador
            } = at.get()?.trabajador?.get();
            const { items, ...horario } = horarios[0]?.get();
            const itemDia = items.find(
              (h: HorarioTrabajadorItem) =>
                h?.get()?.numDia === diaMes.diaSemana,
            );
            const asistenciaDia = asistencias[0]?.get();
            const horarioEntrada = new Date(diaMes.fecha);
            horarioEntrada.setHours(
              itemDia?.get()?.bloque?.get()?.horaEntrada ?? 0,
              itemDia?.get()?.bloque?.get()?.minutoEntrada ?? 0,
            );
            const horarioSalida = new Date(diaMes.fecha);
            horarioSalida.setDate(
              itemDia?.get()?.bloque?.get()?.horaSalida <
                itemDia?.get()?.bloque?.get()?.horaEntrada
                ? horarioSalida.getDate() + 1
                : horarioSalida.getDate(),
            );
            horarioSalida.setHours(
              itemDia?.get()?.bloque?.get()?.horaSalida ?? 0,
              itemDia?.get()?.bloque?.get()?.minutoSalida ?? 0,
            );
            const fechaNow = new Date();
            return {
              ...trabajador,
              cargo: contratos[0]?.cargo?.get(),
              turno: horario.turno?.get(),
              contacto: contactos[0]?.get(),
              info: infos[0]?.get(),
              horario: {
                fecha: diaMes.fecha,
                entrada: !itemDia?.get()?.bloque?.get()
                  ? null
                  : new Intl.DateTimeFormat('default', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false, // para formato 24 horas
                    }).format(horarioEntrada),
                salida: !itemDia?.get()?.bloque?.get()
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
              asignado: !!itemDia?.get()?.bloque?.get(),
              estado: asistenciaDia?.marcacionEntrada
                ? new Date(asistenciaDia?.marcacionEntrada).getTime() >
                  new Date(horarioEntrada).getTime() + 600
                  ? 'tarde'
                  : 'puntual'
                : fechaNow.getTime() > new Date(horarioEntrada).getTime() + 600
                  ? 'no_asistio'
                  : 'a_tiempo',
            };
          })
          .filter((t) => t.asignado),
      };
    });

    const agruparPorUsuario = (
      nuevos: Alerta[],
      historicos: Alerta[],
    ): AgrupadoPorUsuario[] => {
      const mapa = new Map<string, AgrupadoPorUsuario>();

      for (const alerta of nuevos) {
        if (!mapa.has(alerta.idUsuario)) {
          mapa.set(alerta?.get()?.idUsuario, {
            idUsuario: alerta?.get()?.idUsuario,
            nuevos: [],
            historicos: [],
          });
        }
        mapa.get(alerta?.get()?.idUsuario)!.historicos.push(alerta?.get());
      }

      for (const alerta of historicos) {
        if (!mapa.has(alerta.idUsuario)) {
          mapa.set(alerta?.get()?.idUsuario, {
            idUsuario: alerta?.get()?.idUsuario,
            nuevos: [],
            historicos: [],
          });
        }
        mapa.get(alerta?.get()?.idUsuario)!.historicos.push(alerta?.get());
      }

      return Array.from(mapa.values());
    };

    const historicos = await this.service.findAllByFecha(fecha);

    const alertas = resultados
      .filter((item) =>
        item.trabajadores.some((t) => t.estado === 'no_asistio'),
      )
      .flatMap((item) => {
        return item.usuarios.flatMap((idUsuario) =>
          item.trabajadores.map((t) => ({
            idSede: item.id,
            idTrabajador: t.id,
            idUsuario,
            titulo: `Marcación no registrada`,
            descripcion: `${t.nombre} ${t.apellido} no ha marcado su asistencia durante el horario de entrada.`,
            fechaEntrada: t.horarioEntrada,
            fecha,
          })),
        );
      })
      .map((a) => {
        const alerta = historicos.find((al) => {
          return (
            al?.get()?.idSede == a.idSede &&
            al?.get()?.idUsuario == a.idUsuario &&
            al?.get()?.idTrabajador == a.idTrabajador &&
            new Date(al?.get()?.fechaEntrada).getTime() ==
              new Date(a.fechaEntrada).getTime()
          );
        });
        return {
          id: alerta?.get()?.id,
          ...a,
        };
      })
      .filter((a) => !a.id);

    const nuevos = await this.service.createMany(alertas);

    const resultado = agruparPorUsuario(nuevos, historicos);

    this.alertaGateway.enviarAlertaRetraso(resultado);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<Alerta>> {
    return this.service.findAll(
      user,
      query.limit!,
      query.offset!,
      query.q?.filter,
      query.q?.search,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Alerta | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: Alerta): Promise<Alerta | null> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Alerta,
  ): Promise<[number, Alerta[]]> {
    return this.service.update(id, dto);
  }

  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, Alerta[]]> {
    return this.service.changeStatus(id, isActive);
  }

  @Get('changeLeido/:id')
  changeLeido(@Param('id') id: string): Promise<[number, Alerta[]]> {
    return this.service.changeLeido(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @Patch('restore/:id')
  restore(@Param('id') id: string): Promise<void> {
    return this.service.restore(id);
  }

  @Get('simulate-delay/0')
  async simulateDelay() {
    const fecha = new Date();
    fecha.setHours(0, 0, 0, 0);
    const diaMes = getDia(fecha);

    const sedes = await this.sedeService.findByFecha(fecha);

    const resultados = sedes.map((s: Sede) => {
      const sede = s.get();
      return {
        usuarios: sede.asignacionUsuario.map((item) => item?.get()?.idUsuario),
        ...sede,
        trabajadores: sede.asignacion
          .map((at: AsignacionSede) => {
            const {
              contratos,
              horarios,
              asistencias,
              infos,
              contactos,
              vacaciones,
              permisos,
              ...trabajador
            } = at.get()?.trabajador?.get();
            const { items, ...horario } = horarios[0]?.get();
            const itemDia = items.find(
              (h: HorarioTrabajadorItem) =>
                h?.get()?.numDia === diaMes.diaSemana,
            );
            const asistenciaDia = asistencias[0]?.get();
            const horarioEntrada = new Date(diaMes.fecha);
            horarioEntrada.setHours(
              itemDia?.get()?.bloque?.get()?.horaEntrada ?? 0,
              itemDia?.get()?.bloque?.get()?.minutoEntrada ?? 0,
            );
            const horarioSalida = new Date(diaMes.fecha);
            horarioSalida.setDate(
              itemDia?.get()?.bloque?.get()?.horaSalida <
                itemDia?.get()?.bloque?.get()?.horaEntrada
                ? horarioSalida.getDate() + 1
                : horarioSalida.getDate(),
            );
            horarioSalida.setHours(
              itemDia?.get()?.bloque?.get()?.horaSalida ?? 0,
              itemDia?.get()?.bloque?.get()?.minutoSalida ?? 0,
            );
            const fechaNow = new Date();
            return {
              ...trabajador,
              cargo: contratos[0]?.cargo?.get(),
              turno: horario.turno?.get(),
              contacto: contactos[0]?.get(),
              info: infos[0]?.get(),
              horario: {
                fecha: diaMes.fecha,
                entrada: !itemDia?.get()?.bloque?.get()
                  ? null
                  : new Intl.DateTimeFormat('default', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false, // para formato 24 horas
                    }).format(horarioEntrada),
                salida: !itemDia?.get()?.bloque?.get()
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
              asignado: !!itemDia?.get()?.bloque?.get(),
              estado: asistenciaDia?.marcacionEntrada
                ? new Date(asistenciaDia?.marcacionEntrada).getTime() >
                  new Date(horarioEntrada).getTime() + 600
                  ? 'tarde'
                  : 'puntual'
                : fechaNow.getTime() > new Date(horarioEntrada).getTime() + 600
                  ? 'no_asistio'
                  : 'a_tiempo',
            };
          })
          .filter((t) => t.asignado),
      };
    });

    const agruparPorUsuario = (
      nuevos: Alerta[],
      historicos: Alerta[],
    ): AgrupadoPorUsuario[] => {
      const mapa = new Map<string, AgrupadoPorUsuario>();

      for (const alerta of nuevos) {
        if (!mapa.has(alerta.idUsuario)) {
          mapa.set(alerta?.get()?.idUsuario, {
            idUsuario: alerta?.get()?.idUsuario,
            nuevos: [],
            historicos: [],
          });
        }
        mapa.get(alerta?.get()?.idUsuario)!.historicos.push(alerta?.get());
      }

      for (const alerta of historicos) {
        if (!mapa.has(alerta.idUsuario)) {
          mapa.set(alerta?.get()?.idUsuario, {
            idUsuario: alerta?.get()?.idUsuario,
            nuevos: [],
            historicos: [],
          });
        }
        mapa.get(alerta?.get()?.idUsuario)!.historicos.push(alerta?.get());
      }

      return Array.from(mapa.values());
    };

    const historicos = await this.service.findAllByFecha(fecha);

    const alertas = resultados
      .filter((item) =>
        item.trabajadores.some((t) => t.estado === 'no_asistio'),
      )
      .flatMap((item) => {
        return item.usuarios.flatMap((idUsuario) =>
          item.trabajadores.map((t) => ({
            idSede: item.id,
            idTrabajador: t.id,
            idUsuario,
            titulo: `Marcación no registrada`,
            descripcion: `${t.nombre} ${t.apellido} no ha marcado su asistencia durante el horario de entrada.`,
            fechaEntrada: t.horarioEntrada,
            fecha,
          })),
        );
      })
      .map((a) => {
        const alerta = historicos.find((al) => {
          return (
            al?.get()?.idSede == a.idSede &&
            al?.get()?.idUsuario == a.idUsuario &&
            al?.get()?.idTrabajador == a.idTrabajador &&
            new Date(al?.get()?.fechaEntrada).getTime() ==
              new Date(a.fechaEntrada).getTime()
          );
        });
        return {
          id: alerta?.get()?.id,
          ...a,
        };
      })
      .filter((a) => !a.id);

    const nuevos = await this.service.createMany(alertas);

    const resultado = agruparPorUsuario(nuevos, historicos);

    this.alertaGateway.enviarAlertaRetraso(resultado);

    return true;
  }
}
