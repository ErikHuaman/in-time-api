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
import { Trabajador } from '@modules/trabajador/trabajador.model';

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

  @Cron('*/1 * * * *') // cada 1 minutos
  async verificarRetrasos() {
    const fecha = new Date();
    fecha.setHours(0, 0, 0, 0);
    const diaMes = getDia(fecha);

    const sedes = await this.sedeService.findByFecha(fecha);

    const resultados = sedes.map((s: Sede) => {
      const sede = s.toJSON();
      return {
        ...sede,
        usuarios: sede.usuarios.map((item) => item?.id),
        trabajadores: sede.trabajadores
          .map((trabajador: Trabajador) => {
            const {
              contratos,
              horarios,
              asistencias,
              infos,
              contactos,
              vacaciones,
              permisos,
            } = trabajador;
            const { items, ...horario } = horarios[0];
            const itemDia = items.find(
              (h: HorarioTrabajadorItem) => h?.numDia === diaMes.diaSemana,
            );
            const asistenciaDia = asistencias[0];
            const horarioEntrada = new Date(diaMes.fecha);
            horarioEntrada.setHours(
              itemDia?.bloque?.horaEntrada ?? 0,
              itemDia?.bloque?.minutoEntrada ?? 0,
            );
            const horarioSalida = new Date(diaMes.fecha);
            horarioSalida.setDate(
              itemDia?.bloque?.horaSalida! < itemDia?.bloque?.horaEntrada!
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
          mapa.set(alerta?.idUsuario, {
            idUsuario: alerta?.idUsuario,
            nuevos: [],
            historicos: [],
          });
        }
        mapa.get(alerta?.idUsuario)!.historicos.push(alerta);
      }

      for (const alerta of historicos) {
        if (!mapa.has(alerta.idUsuario)) {
          mapa.set(alerta?.idUsuario, {
            idUsuario: alerta?.idUsuario,
            nuevos: [],
            historicos: [],
          });
        }
        mapa.get(alerta?.idUsuario)!.historicos.push(alerta);
      }

      return Array.from(mapa.values());
    };

    const historicos = (await this.service.findAllHistoric()).map(
      (item: Alerta) => item.toJSON(),
    );

    const alertas = resultados
      .map((item: any) => {
        const { trabajadores, ...data } = item;
        return {
          ...data,
          trabajadores: trabajadores.filter((trabajador) =>
            trabajador.horarios.some((horario) =>
              horario.items.some((i) => i.sede.id === item.id),
            ),
          ),
        };
      })
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
            al?.idSede == a.idSede &&
            al?.idUsuario == a.idUsuario &&
            al?.idTrabajador == a.idTrabajador &&
            new Date(al?.fechaEntrada).getTime() ==
              new Date(a.fechaEntrada).getTime()
          );
        });
        return {
          id: alerta?.id,
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
      const sede = s.toJSON();
      return {
        ...sede,
        usuarios: sede.usuarios.map((item) => item?.id),
        trabajadores: sede.trabajadores
          .map((trabajador: Trabajador) => {
            const {
              contratos,
              horarios,
              asistencias,
              infos,
              contactos,
              vacaciones,
              permisos,
            } = trabajador;
            const { items, ...horario } = horarios[0];
            const itemDia = items.find(
              (h: HorarioTrabajadorItem) => h?.numDia === diaMes.diaSemana,
            );
            const asistenciaDia = asistencias[0];
            const horarioEntrada = new Date(diaMes.fecha);
            horarioEntrada.setHours(
              itemDia?.bloque?.horaEntrada ?? 0,
              itemDia?.bloque?.minutoEntrada ?? 0,
            );
            const horarioSalida = new Date(diaMes.fecha);
            horarioSalida.setDate(
              itemDia?.bloque?.horaSalida! < itemDia?.bloque?.horaEntrada!
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
          mapa.set(alerta?.idUsuario, {
            idUsuario: alerta?.idUsuario,
            nuevos: [],
            historicos: [],
          });
        }
        mapa.get(alerta?.idUsuario)!.historicos.push(alerta);
      }

      for (const alerta of historicos) {
        if (!mapa.has(alerta.idUsuario)) {
          mapa.set(alerta?.idUsuario, {
            idUsuario: alerta?.idUsuario,
            nuevos: [],
            historicos: [],
          });
        }
        mapa.get(alerta?.idUsuario)!.historicos.push(alerta);
      }

      return Array.from(mapa.values());
    };

    const historicos = (await this.service.findAllHistoric()).map(
      (item: Alerta) => item.toJSON(),
    );

    const alertas = resultados
      .map((item: any) => {
        const { trabajadores, ...data } = item;
        return {
          ...data,
          trabajadores: trabajadores.filter((trabajador) =>
            trabajador.horarios.some((horario) =>
              horario.items.some((i) => i.sede.id === item.id),
            ),
          ),
        };
      })
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
            al?.idSede == a.idSede &&
            al?.idUsuario == a.idUsuario &&
            al?.idTrabajador == a.idTrabajador &&
            new Date(al?.fechaEntrada).getTime() ==
              new Date(a.fechaEntrada).getTime()
          );
        });
        return {
          id: alerta?.id,
          ...a,
        };
      })
      .filter((a) => !a.id);

    const nuevos = await this.service.createMany(alertas);

    const resultado = agruparPorUsuario(nuevos, historicos);

    this.alertaGateway.enviarAlertaRetraso(resultado);

    return { alertas, historicos };
  }
}
