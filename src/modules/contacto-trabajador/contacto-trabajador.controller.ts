import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Patch,
  } from '@nestjs/common';
import { ContactoTrabajadorService } from './contacto-trabajador.service';
import { ContactoTrabajador } from './contacto-trabajador.model';
import { ContactoTrabajadorDTO } from './contacto-trabajador.dto';

@Controller('contactosTrabajadores')
export class ContactoTrabajadorController {
    constructor(private readonly service: ContactoTrabajadorService) {}
    
      @Get()
      findAll(): Promise<ContactoTrabajador[]> {
        return this.service.findAll();
      }
    
      @Get(':id')
      findOne(@Param('id') id: string): Promise<ContactoTrabajador | null> {
        return this.service.findOne(id);
      }
    
      @Post()
      create(
        @Body() dto: ContactoTrabajadorDTO,
      ): Promise<ContactoTrabajador | null> {
        return this.service.create(dto);
      }
    
      @Patch(':id')
      update(
        @Param('id') id: string,
        @Body() dto: ContactoTrabajadorDTO,
      ): Promise<[number, ContactoTrabajador[]]> {
        return this.service.update(id, dto);
      }
    
      @Delete(':id')
      delete(@Param('id') id: string): Promise<void> {
        return this.service.delete(id);
      }
}
