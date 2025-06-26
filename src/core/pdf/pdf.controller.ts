import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('comprobante')
  async getComprobante(
    @Query('cliente') cliente: string,
    @Query('monto') monto: number,
    @Query('fecha') fecha: string,
    @Query('concepto') concepto: string,
    @Res() res: Response,
  ) {
    const buffer = await this.pdfService.generarComprobantePago({
      nombreCliente: cliente,
      monto: +monto,
      fecha,
      concepto,
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=comprobante-${cliente}.pdf`,
    });

    res.end(buffer);
  }
}
