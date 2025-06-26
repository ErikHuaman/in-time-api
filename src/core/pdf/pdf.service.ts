import { Injectable } from '@nestjs/common';
import * as PdfPrinter from 'pdfmake';
import * as path from 'path';
import { WritableStreamBuffer } from 'stream-buffers';

@Injectable()
export class PdfService {
  private fonts = {
    Roboto: {
      normal: path.join(__dirname, '../../../fonts/Roboto-Regular.ttf'),
      medium: path.join(__dirname, '../../../fonts/Roboto-Medium.ttf'),
      bold: path.join(__dirname, '../../../fonts/Roboto-Bold.ttf'),
      italics: path.join(__dirname, '../../../fonts/Roboto-Italic.ttf'),
      bolditalics: path.join(
        __dirname,
        '../../../fonts/Roboto-MediumItalic.ttf',
      ),
    },
  };

  async generarComprobantePago(id?: any): Promise<Buffer> {
    const printer = new PdfPrinter(this.fonts);

    const fechaActual = new Date();

    const periodo = new Date();

    const datos = {
      ruc: '20609735571',
      razonSocial:
        ' JIRÓN PÍO XII NUMERO 393-A, 393, 393-C URBANIZACIÓN FUNDO MONTERRICO CHICO SANTIAGO DE SURCO',
      tipoDoc: 'DNI',
      identificacion: '11111111',
      nombre: 'Erik',
      apellido: 'Huaman Guiop',
      situacion: 'activo o subsidiado',
      fechaIngreso: new Date(),
      tipoTrabajador: 'empleado',
      regimenPensionario: 'spp profuturo',
      cuspp: '256971NPMDH0',
      diasLaborados: 31,
      diasNoLaborados: 0,
      diasSubcidiados: 0,
      condicion: 'Domiciliado',
      totalHoras: 208,
      minutos: 0,
      totalHorasExtra: 78,
      minutosExtra: 0,
      suspencionTipo: '',
      suspencionMotivo: '',
      suspencionDias: '',
      quintaCategoria: 'No tiene',
    };

    const grupoDetalle = [
      {
        nombre: 'Ingresos',
        monto: '',
        items: [
          {
            codigo: '0105',
            nombre: 'TRABAJO SOBRETIEMPO (H. EXTRAS 25%)',
            ingreso: '363.13',
            descuento: '',
            neto: '',
          },
          {
            codigo: '0106',
            nombre: 'TRABAJO SOBRETIEMPO (H. EXTRAS 35%)',
            ingreso: '190.69',
            descuento: '',
            neto: '',
          },
          {
            codigo: '0121',
            nombre: 'REMUNERACIÓN O JORNAL BÁSICO',
            ingreso: '1130.00',
            descuento: '',
            neto: '',
          },
        ],
      },
      {
        nombre: 'Descuentos',
        monto: '',
        items: [
          {
            codigo: '0701',
            nombre: 'ADELANTO',
            ingreso: '',
            descuento: '700.00',
            neto: '',
          },
          {
            codigo: '0705',
            nombre: 'INASISTENCIAS',
            ingreso: '',
            descuento: '0.00',
            neto: '',
          },
        ],
      },
      {
        nombre: 'Aportes del Trabajador',
        monto: '',
        items: [
          {
            codigo: '0601',
            nombre: 'COMISIÓN AFP PORCENTUAL',
            ingreso: '',
            descuento: '0.00',
            neto: '',
          },
          {
            codigo: '0605',
            nombre: 'RENTA QUINTA CATEGORÍA RETENCIONES',
            ingreso: '',
            descuento: '0.00',
            neto: '',
          },
          {
            codigo: '0606',
            nombre: 'PRIMA DE SEGURO AFP',
            ingreso: '',
            descuento: '22.93',
            neto: '',
          },
          {
            codigo: '0608',
            nombre: 'SPP - APORTACIÓN OBLIGATORIA',
            ingreso: '',
            descuento: '167.38',
            neto: '',
          },
        ],
      },
    ];

    const pagoNeto = '783.51';

    const aportes = [
      {
        codigo: '0804',
        nombre: 'ESSALUD(REGULAR CBSSP AGRAR/AC)TRAB',
        ingreso: '',
        descuento: '',
        neto: '150.64',
      },
    ];

    const docDefinition = {
      pageMargins: [40, 80, 40, 60],
      header: function (currentPage, pageCount, pageSize) {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  text: 'Trabajador - Datos de boleta de pago',
                  bold: true,
                  fontSize: 12,
                  alignment: 'left',
                },
                {
                  text: `Página ${currentPage}`,
                  alignment: 'right',
                  fontSize: 9,
                  margin: [0, 2],
                },
              ],
              [
                {
                  text: '(Contiene datos mínimos de una boleta de pago)',
                  fontSize: 9,
                },
                {
                  text: `${new Intl.DateTimeFormat('default', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }).format(fechaActual)}`,
                  alignment: 'right',
                  fontSize: 9,
                },
              ],
              [
                {},
                {
                  text: `${new Intl.DateTimeFormat('default', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false, // para formato 24 horas
                  }).format(fechaActual)}`,
                  alignment: 'right',
                  fontSize: 9,
                },
              ],
            ],
          },
          layout: 'noBorders',
          margin: [40, 20, 40, 10],
        };
      },
      footer: function (currentPage, pageCount, pageSize) {
        return {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: `Generado por InTime. Página ${currentPage} de ${pageCount}`,
                  bold: true,
                  fontSize: 12,
                  alignment: 'center',
                  fillColor: '#c5d9f1',
                  margin: [0, 2],
                },
              ],
            ],
          },
          layout: 'noBorders',
          margin: [40, 10, 40, 10],
        };
      },
      content: [
        {
          margin: [0, 0, 0, 20],
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  text: `RUC: ${datos.ruc}`,
                  fontSize: 10,
                  colSpan: 2,
                  fillColor: '#c5d9f1',
                  border: [true, true, true, false],
                },
                {},
              ],
              [
                {
                  text: `Empleador: ${datos.razonSocial}`,
                  fontSize: 10,
                  colSpan: 2,
                  fillColor: '#c5d9f1',
                  border: [true, false, true, false],
                },
                {},
              ],
              [
                {
                  text: `Periodo: ${new Intl.DateTimeFormat('default', {
                    month: '2-digit',
                    year: 'numeric',
                  }).format(periodo)}`,
                  fontSize: 10,
                  colSpan: 2,
                  fillColor: '#c5d9f1',
                  border: [true, false, true, true],
                },
                {},
              ],
            ],
          },
          layout: {
            hLineWidth: function (i, node) {
              return 0.1;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
            hLineColor: function (i, node) {
              return '#5a5e64';
            },
            vLineColor: function (i, node) {
              return '#5a5e64';
            },
          },
        },
        {
          margin: [0, 0, 0, 20],
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                {
                  text: `Documento de Identidad`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  colSpan: 2,
                  alignment: 'center',
                },
                {},
                {
                  text: `Nombres y Apellidos`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  colSpan: 4,
                  rowSpan: 2,
                  alignment: 'center',
                  margin: [0, 8],
                },
                {},
                {},
                {},
                {
                  text: `Situación`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  colSpan: 2,
                  rowSpan: 2,
                  alignment: 'center',
                  margin: [0, 8],
                },
                {},
              ],
              [
                {
                  text: `Tipo`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  alignment: 'center',
                },
                {
                  text: `Número`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  alignment: 'center',
                },
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  text: `${datos.tipoDoc}`,
                  fontSize: 10,
                  alignment: 'center',
                },
                {
                  text: `${datos.identificacion}`,
                  fontSize: 10,
                  alignment: 'center',
                },
                {
                  text: `${datos.nombre} ${datos.apellido}`.toUpperCase(),
                  fontSize: 10,
                  colSpan: 4,
                  alignment: 'center',
                },
                {},
                {},
                {},
                {
                  text: `${datos.situacion}`.toUpperCase(),
                  fontSize: 10,
                  colSpan: 2,
                  alignment: 'center',
                },
                {},
              ],
              [
                {
                  text: `Fecha de Ingreso`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  colSpan: 2,
                  alignment: 'center',
                },
                {},
                {
                  text: `Tipo de Trabajador`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  colSpan: 2,
                  alignment: 'center',
                },
                {},
                {
                  text: `Régimen Pensionario`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  colSpan: 2,
                  alignment: 'center',
                },
                {},
                {
                  text: `CUSPP`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  colSpan: 2,
                  alignment: 'center',
                },
                {},
              ],
              [
                {
                  text: `${new Intl.DateTimeFormat('default', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }).format(datos.fechaIngreso)}`,
                  fontSize: 10,
                  colSpan: 2,
                  alignment: 'center',
                },
                {},
                {
                  text: `${datos.tipoTrabajador}`.toUpperCase(),
                  fontSize: 10,
                  colSpan: 2,
                  alignment: 'center',
                },
                {},
                {
                  text: `${datos.regimenPensionario}`.toUpperCase(),
                  fontSize: 10,
                  colSpan: 2,
                  alignment: 'center',
                },
                {},
                {
                  text: `${datos.cuspp}`.toUpperCase(),
                  fontSize: 10,
                  colSpan: 2,
                  alignment: 'center',
                },
                {},
              ],

              [
                {
                  text: `Días Laborados`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  rowSpan: 2,
                  alignment: 'center',
                  margin: [0, 2],
                },
                {
                  text: `Días No Laborados`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  rowSpan: 2,
                  alignment: 'center',
                  margin: [0, 2],
                },
                {
                  text: `Días Subsidiados`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  rowSpan: 2,
                  alignment: 'center',
                  margin: [0, 2],
                },
                {
                  text: `Condición`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  rowSpan: 2,
                  alignment: 'center',
                  margin: [0, 8],
                },
                {
                  text: `Jornada Ordinaria`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  colSpan: 2,
                  alignment: 'center',
                },
                {},
                {
                  text: `Sobretiempo`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  colSpan: 2,
                  alignment: 'center',
                },
                {},
              ],
              [
                {},
                {},
                {},
                {},
                {
                  text: `Total Horas`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  alignment: 'center',
                },
                {
                  text: `Minutos`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  alignment: 'center',
                },
                {
                  text: `Total Horas`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  alignment: 'center',
                },
                {
                  text: `Minutos`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  alignment: 'center',
                },
              ],
              [
                {
                  text: `${datos.diasLaborados}`,
                  fontSize: 10,
                  alignment: 'center',
                },
                {
                  text: `${datos.diasNoLaborados}`,
                  fontSize: 10,
                  alignment: 'center',
                },
                {
                  text: `${datos.diasSubcidiados}`,
                  fontSize: 10,
                  alignment: 'center',
                },
                {
                  text: `${datos.condicion}`,
                  fontSize: 10,
                  alignment: 'center',
                },
                {
                  text: `${datos.totalHoras}`,
                  fontSize: 10,
                  alignment: 'center',
                },
                {
                  text: `${datos.minutos}`,
                  fontSize: 10,
                  alignment: 'center',
                },
                {
                  text: `${datos.totalHorasExtra}`,
                  fontSize: 10,
                  alignment: 'center',
                },
                {
                  text: `${datos.minutosExtra}`,
                  fontSize: 10,
                  alignment: 'center',
                },
              ],
              [
                {
                  text: `Motivo de Suspensión de Labores`,
                  fontSize: 10,
                  colSpan: 6,
                  fillColor: '#dbe5f1',
                  alignment: 'center',
                },
                {},
                {},
                {},
                {},
                {},
                {
                  text: `Otros empleadores por Rentas de 5ta categoria`,
                  fontSize: 10,
                  colSpan: 2,
                  rowSpan: 2,
                  fillColor: '#dbe5f1',
                  alignment: 'center',
                  margin: [0, 2],
                },
                {},
              ],
              [
                {
                  text: `Tipo`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  alignment: 'center',
                },
                {
                  text: `Motivo`,
                  fontSize: 10,
                  colSpan: 4,
                  fillColor: '#dbe5f1',
                  alignment: 'center',
                },
                {},
                {},
                {},
                {
                  text: `N° Días`,
                  fontSize: 10,
                  fillColor: '#dbe5f1',
                  alignment: 'center',
                },
                {},
                {},
              ],
              [
                {
                  text: `${datos.suspencionTipo}`,
                  fontSize: 10,
                  alignment: 'center',
                },
                {
                  text: `${datos.suspencionMotivo}`,
                  fontSize: 10,
                  colSpan: 4,
                  alignment: 'center',
                },
                {},
                {},
                {},
                {
                  text: `${datos.suspencionDias}`,
                  fontSize: 10,
                  alignment: 'center',
                },
                {
                  text: `${datos.quintaCategoria}`,
                  fontSize: 10,
                  colSpan: 2,
                  alignment: 'center',
                },
                {},
              ],
            ],
          },
          layout: {
            hLineWidth: function (i, node) {
              return 0.1;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
            hLineColor: function (i, node) {
              return '#5a5e64';
            },
            vLineColor: function (i, node) {
              return '#5a5e64';
            },
          },
        },
        {
          margin: [0, 0, 0, 20],
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                {
                  text: `Código`,
                  fontSize: 8.5,
                  fillColor: '#dbe5f1',
                  alignment: 'center',
                },
                {
                  text: `Conceptos`,
                  fontSize: 8.5,
                  fillColor: '#dbe5f1',
                  colSpan: 4,
                  alignment: 'center',
                },
                {},
                {},
                {},
                {
                  text: `Ingresos S/`,
                  fontSize: 8.5,
                  fillColor: '#dbe5f1',
                  alignment: 'center',
                },
                {
                  text: `Descuentos S/`,
                  fontSize: 8.5,
                  fillColor: '#dbe5f1',
                  alignment: 'center',
                },
                {
                  text: `Neto S/`,
                  fontSize: 8.5,
                  fillColor: '#dbe5f1',
                  alignment: 'center',
                },
              ],
              ...grupoDetalle.flatMap((grupo) => [
                [
                  {
                    colSpan: 8,
                    margin: [0, 2],
                    table: {
                      widths: ['*'],
                      body: [
                        [
                          {
                            text: `${grupo.nombre}`,
                            fontSize: 8.5,
                            fillColor: '#dbe5f1',
                          },
                        ],
                      ],
                    },
                    border: [true, false, true, false],
                    layout: 'lightHorizontalLines',
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                ...grupo.items.map((item) => [
                  {
                    text: `${item.codigo}`,
                    fontSize: 10,
                    border: [true, false, false, false],
                  },
                  {
                    text: `${item.nombre}`,
                    fontSize: 10,
                    colSpan: 4,
                    border: [false, false, false, false],
                  },
                  {},
                  {},
                  {},
                  {
                    text: `${item.ingreso}`,
                    fontSize: 10,
                    alignment: 'right',
                    border: [false, false, false, false],
                  },
                  {
                    text: `${item.descuento}`,
                    fontSize: 10,
                    alignment: 'right',
                    border: [false, false, false, false],
                  },
                  {
                    text: `${item.neto}`,
                    fontSize: 10,
                    alignment: 'right',
                    border: [false, false, true, false],
                  },
                ]),
              ]),
              [
                {
                  colSpan: 8,
                  margin: [0, 2],
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [
                        {
                          text: `Neto a Pagar`,
                          fontSize: 8.5,
                          fillColor: '#dbe5f1',
                        },
                        {
                          text: `${pagoNeto}`,
                          fontSize: 8.5,
                          fillColor: '#dbe5f1',
                          alignment: 'right',
                        },
                      ],
                    ],
                  },
                  border: [true, false, true, true],
                  layout: 'lightHorizontalLines',
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
            ],
          },
          layout: {
            hLineWidth: function (i, node) {
              return 0.1;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
            hLineColor: function (i, node) {
              return '#5a5e64';
            },
            vLineColor: function (i, node) {
              return '#5a5e64';
            },
          },
        },
        {
          margin: [0, 0, 0, 20],
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                {
                  text: `Aportes de Empleador`,
                  fontSize: 8.5,
                  colSpan: 8,
                  fillColor: '#dbe5f1',
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              ...aportes.flatMap((item, i) => [
                [
                  {
                    text: `${item.codigo}`,
                    fontSize: 10,
                    border:
                      aportes.length == i + 1
                        ? [true, false, false, true]
                        : [true, false, false, false],
                  },
                  {
                    text: `${item.nombre}`,
                    fontSize: 10,
                    colSpan: 4,
                    border:
                      aportes.length == i + 1
                        ? [false, false, false, true]
                        : [false, false, false, false],
                  },
                  {},
                  {},
                  {},
                  {
                    text: `${item.ingreso}`,
                    fontSize: 10,
                    alignment: 'right',
                    border:
                      aportes.length == i + 1
                        ? [false, false, false, true]
                        : [false, false, false, false],
                  },
                  {
                    text: `${item.descuento}`,
                    fontSize: 10,
                    alignment: 'right',
                    border:
                      aportes.length == i + 1
                        ? [false, false, false, true]
                        : [false, false, false, false],
                  },
                  {
                    text: `${item.neto}`,
                    fontSize: 10,
                    alignment: 'right',
                    border:
                      aportes.length == i + 1
                        ? [false, false, true, true]
                        : [false, false, true, false],
                  },
                ],
              ]),
            ],
          },
          layout: {
            hLineWidth: function (i, node) {
              return 0.1;
            },
            vLineWidth: function (i, node) {
              return 0.1;
            },
            hLineColor: function (i, node) {
              return '#5a5e64';
            },
            vLineColor: function (i, node) {
              return '#5a5e64';
            },
          },
        },
      ],
      styles: {
        titulo1: {
          fontSize: 12,
          bold: true,
        },
        titulo2: {
          fontSize: 10,
          medium: true,
          alignment: 'right',
        },
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    const stream = new WritableStreamBuffer();

    return new Promise<Buffer>((resolve, reject) => {
      pdfDoc.pipe(stream);
      pdfDoc.end();

      stream.on('finish', () => {
        const buffer = stream.getContents();
        if (!buffer) return reject(new Error('No se pudo generar el PDF'));
        resolve(buffer);
      });

      stream.on('error', reject);
    });
  }
}
