// report.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import { buildReportHeader ,buildPdfHeader } from '../utils/report-header.util';
import { ConfigService } from '@nestjs/config';


import PdfPrinter = require('pdfmake');

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService
    , private configService: ConfigService, 
  ) {}



private async getOrderHtml(id: number): Promise<string> {
  const order = await this.prisma.manufacturingOrder.findUnique({
    where: { idManufacturingOrder: id },
    include: { details: true },
  });

  if (!order) throw new NotFoundException('Orden no encontrada');


  const fechaCreacion = order.createDate
  ? new Date(order.createDate).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  : '';


  console.log('Order Details:', order);
   // Traer cliente desde otra base
  const customer = await this.prisma.$queryRawUnsafe<any[]>(`
    SELECT FantasyName, name, taxregnr  
    FROM inmsa.customer  
    WHERE code = '${order.customerCode}'
  `);

  const cliente = customer[0] || {};

  return `
    
  <div style="font-family: Arial, sans-serif; font-size: 10pt; margin:0; padding:0; margin-right:100px;">
    

<!-- Tabla "ORDEN DE PRDOUCCION " -->
<table style="width:80%; margin-left:0; margin-right:100px; border-collapse:separate; border-spacing:0 2px; font-size:10pt;">
  <tr>
    <td style="border:1px solid black; text-align:left; font-weight:bold; padding:5px; width:35%;">
      ORDEN DE PRODUCCIÓN Nº.
    </td>
    <td style="border:1px solid black; text-align:left; padding:5px; width:45%;">
      ${order.productionOrder}
    </td>
    <td style="border:none; padding:5px; width:2%;">
      <!-- Vacío -->
    </td>
  </tr>
</table>


<!-- Tabla "PARA" -->
<table style="width:80%; margin-left:0; margin-right:100px; border-collapse:separate; border-spacing:0 2px; font-size:10pt;">
  <tr>
    <td style="border:1px solid black; text-align:left; font-weight:bold; padding:5px; width:20%;">
      PARA:
    </td>
    <td style="border:1px solid black; text-align:left; padding:5px; width:68%;">
      ${order.assignedTo}
    </td>
    <td style="border:none; padding:5px; width:2%;">
      <!-- Vacío -->
    </td>
  </tr>
</table>
  

<!-- Tabla "De" -->
<table style="width:80%; margin-left:0; margin-right:100px; border-collapse:separate; border-spacing:0 2px; font-size:10pt;">
  <tr>
    <td style="border:1px solid black; text-align:left; font-weight:bold; padding:5px; width:20%;">
      DE:
    </td>
    <td style="border:1px solid black; text-align:left; padding:5px; width:68%;">
      ${order.requestedBy}
    </td>
    <td style="border:none; padding:5px; width:2%;">
      <!-- Vacío -->
    </td>
  </tr>
</table>

<!-- Tabla "Fecha" con mismo ancho -->
<table style="width:80%; margin-left:0; margin-right:100px; border-collapse:separate; border-spacing:0 2px; font-size:10pt;">
  <tr>
    <td style="border:1px solid black; text-align:left; font-weight:bold; padding:5px; width:20%;">
      FECHA:
    </td>
    <td style="border:1px solid black; text-align:left; padding:5px; width:68%;">
      ${fechaCreacion}
    </td>
    <td style="border:none; padding:5px; width:2%;">
      <!-- Vacío -->
    </td>
  </tr>
</table>



     <table style="width:115%; margin-left:0; margin-right:100px; border-collapse:separate; border-spacing:0 2px; font-size:10pt;">
      <tr>
        <td style="border:1px solid black; text-align:left; font-weight:bold; padding:5px;">
          CLIENTE:
        </td>
        <td style="border:1px solid black; text-align:left; padding:5px; padding-right:105px;">
          ${cliente.FantasyName ?? ''}
        </td>
        <td style="border:1px solid black; text-align:left; padding:5px; padding-right:57px;">
          R.T.N No.
        </td>
        <td style="border:1px solid black; text-align:left; padding:5px; padding-right:57px;">
          ${cliente.taxregnr ?? ''}
         
        </td>
      </tr>
    </table>



<table style="width:115%; margin:10 auto; border-collapse:collapse; font-size:10pt; border:1px solid black;">
  <!-- Encabezado -->
  <tr>
    <td colspan="3" style="border:1px solid black; text-align:center; font-weight:bold; padding:5px;">
      NOMBRE DEL CONTACTO
    </td>
  </tr>

  <!-- Fila de títulos y valores en columnas -->
  <tr>
    <td style="border:1px solid black; text-align:left; padding:5px; width:33%;">
      <div style="font-weight:bold;">Nombre:</div>
      <div style="margin-top:5px;">${order.contactName ?? ''}</div>
    </td>
    <td style="border:1px solid black; text-align:left; padding:5px; width:33%;">
      <div style="font-weight:bold;">Celular:</div>
      <div style="margin-top:5px;">${order.contactPhone ?? ''}</div>
    </td>
    <td style="border:1px solid black; text-align:left; padding:5px; width:34%;">
      <div style="font-weight:bold;">Correo:</div>
      <div style="margin-top:5px;">${order.contactEmail ?? ''}</div>
    </td>
  </tr>
</table>


<table style="width:115%; margin:10 auto; border-collapse:collapse; font-size:10pt; border:1px solid black;">
  <!-- Encabezado -->
  <tr>
    <td colspan="3" style="border:1px solid black; text-align:center; font-weight:bold; padding:5px;">
      DESCRIPCION DEL PROYECTO
    </td>
  </tr>

  <!-- Fila de títulos y valores en columnas -->
  <tr>
    <td style="border:1px solid black; text-align:left; padding:5px; width:33%;">
    
      <div style="margin-top:5px;">${order.projectScope ?? ''}</div>
    </td>
 
  </tr>
</table>

<table style="width:115%; margin:10 auto; border-collapse:collapse; font-size:10pt; border:1px solid black;">
  <!-- Encabezado -->
  <tr>
    <td colspan="3" style="border:1px solid black; text-align:center; font-weight:bold; padding:5px;">
      LOCALIZACION
    </td>
  </tr>

  <!-- Fila de títulos y valores en columnas -->
  <tr>
    <td style="border:1px solid black; text-align:left; padding:5px; width:33%;">
    
      <div style="margin-top:5px;">${order.location ?? ''}</div>
    </td>
 
  </tr>
</table>


<!-- Tabla "PESO" con mismo ancho -->
<table style="width:80%; margin-left:0; margin-right:100px; border-collapse:separate; border-spacing:0 2px; font-size:10pt;">
  <tr>
    <td style="border:1px solid black; text-align:left; font-weight:bold; padding:5px; width:20%;">
      PESO:
    </td>
    <td style="border:1px solid black; text-align:left; padding:5px; width:68%;">
      ${order.metalWeight ?? ''}  ${order.unitofMeasure ?? ''} 
    </td>
    <td style="border:none; padding:5px; width:2%;">
      <!-- Vacío -->
    </td>
  </tr>
</table>


<!-- Tabla "GRANTOTAL" con mismo ancho -->
<table style="width:80%; margin-left:0; margin-right:100px; border-collapse:separate; border-spacing:0 2px; font-size:10pt;">
  <tr>
    <td style="border:1px solid black; text-align:left; font-weight:bold; padding:5px; width:30%;">
      GRAN TOTAL:
    </td>
     <td style="border:1px solid black; text-align:left; padding:5px; width:10%;">
      ${order.currency ?? ''} 
    </td>
    <td style="border:1px solid black; text-align:left; padding:5px; width:40%;">
      ${order.grandTotal ?? ''} 
    </td>
    <td style="border:none; padding:5px; width:2%;">
      <!-- Vacío -->
    </td>
  </tr>
</table>


<!-- Tabla "GRANTOTAL" con mismo ancho -->
<table style="width:80%; margin-left:0; margin-right:100px; border-collapse:separate; border-spacing:0 2px; font-size:10pt;">
  <tr>
    <td style="border:1px solid black; text-align:left; font-weight:bold; padding:5px; width:40%;">
      FACTOR CAMBIO = HNL / ${order.currency ?? ''} = 
    </td>
    
    <td style="border:1px solid black; text-align:left; padding:5px; width:40%;">
      ${order.paymentFactor ?? ''} 
    </td>
    <td style="border:none; padding:5px; width:2%;">
      <!-- Vacío -->
    </td>
  </tr>
</table>

<table style="width:115%; margin:10 auto; border-collapse:collapse; font-size:10pt; border:1px solid black;">
  <!-- Encabezado -->
  <tr>
    <td colspan="3" style="border:1px solid black; text-align:center; font-weight:bold; padding:5px;">
      FORMA DE PAGO:
    </td>
  </tr>

  <!-- Fila de títulos y valores en columnas -->
  <tr>
    <td style="border:1px solid black; text-align:left; padding:5px; width:33%;">
    
      <div style="margin-top:5px;">${order.payTerm ?? ''}</div>
    </td>
 
  </tr>
</table>


<table style="width:115%; margin:10 auto; border-collapse:collapse; font-size:10pt; border:1px solid black;">
  <!-- Encabezado -->
  <tr>
    <td colspan="3" style="border:1px solid black; text-align:center; font-weight:bold; padding:5px;">
      TIEMPO DE PAGO:
    </td>
  </tr>

  <!-- Fila de títulos y valores en columnas -->
  <tr>
    <td style="border:1px solid black; text-align:left; padding:5px; width:33%;">
    
      <div style="margin-top:5px;">${order.deliveryTime ?? ''}</div>
    </td>
 
  </tr>
</table>


<table style="width:115%; margin:10 auto; border-collapse:collapse; font-size:10pt; border:1px solid black;">
  <!-- Encabezado -->
  <tr>
    <td colspan="3" style="border:1px solid black; text-align:center; font-weight:bold; padding:5px;">
      OBSERVACIONES:
    </td>
  </tr>

  <!-- Fila de títulos y valores en columnas -->
  <tr>
    <td style="border:1px solid black; text-align:left; padding:5px; width:33%;">
    
      <div style="margin-top:5px;">
      <ul>
  ${order.details.map(d => `<li>${d.description}</li>`).join('')}
</ul>
      </div>
    </td>
 
  </tr>
</table>


  </div>




  `;
}




   async generatePdf(headerId: number): Promise<Buffer> {

      console.log('entrando al repore')
       const chromePath = this.configService.get<string>('CHROME_PATH');


    // 1️⃣ Consultar el encabezado con id = 1
    const headerData = await this.prisma.reportHeader.findUnique({
      where: { id: 1 },
    });

    if (!headerData) {
      throw new Error('No se encontró el encabezado');
    }

    // Convertir la ruta del logo a base64 para mostrar en el PDF
    let logoBase64 = '';
    if (headerData.companyLogo) {
      const logoPath = headerData.companyLogo;
      const logoBuffer = fs.readFileSync(logoPath);
      const ext = logoPath.split('.').pop();
      logoBase64 = `data:image/${ext};base64,${logoBuffer.toString('base64')}`;
    }

    const fechaActual = new Date().toLocaleDateString('es-ES', {
  month: 'short',
  year: 'numeric',
}).replace('.', '').replace(' ', ' / ');

// Resultado: "sep/2025"


    console.log('entrando al repore')
    const bodyHtml = await this.getOrderHtml(headerId); // id que recibes del endpoint

    // 2️⃣ Generar HTML dinámico
    const html = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 10px 40px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #333; padding: 5px; text-align: left; }
        </style>
      </head>
      <body>
        ${bodyHtml}
      </body>
      </html>
    `;

    // 3️⃣ Lanzar Puppeteer
const browser = await puppeteer.launch({
  headless: true,
  executablePath: chromePath,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--single-process',
  ],
});

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // 4️⃣ Generar PDF con encabezado y pie de página
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '120px', bottom: '50px' },
      displayHeaderFooter: true,
  headerTemplate: buildReportHeader(headerData, logoBase64, fechaActual),
      footerTemplate: `
        <div style="font-size:10px; width:100%; text-align:center;">
          Página <span class="pageNumber"></span> de <span class="totalPages"></span>
        </div>`,
    }); 

    await browser.close();
    return Buffer.from(pdfBuffer);
  }


  // Dentro de ReportService

private async getOrderData(id: number) {
  const order = await this.prisma.manufacturingOrder.findUnique({
    where: { idManufacturingOrder: id },
    include: { details: true },
  });

  if (!order) throw new NotFoundException('Orden no encontrada');

  const customer = await this.prisma.$queryRawUnsafe<any[]>(`
    SELECT FantasyName, name, taxregnr
    FROM inmsa.customer
    WHERE code = '${order.customerCode}'
  `);

  const cliente = customer[0] || {};

  return { order, cliente };
}

async generatePdfmake(headerId: number): Promise<Buffer> {
  // 1️⃣ Obtener datos de la orden y cliente
  const { order, cliente } = await this.getOrderData(headerId);

  // 2️⃣ Obtener datos del encabezado
  const headerData = await this.prisma.reportHeader.findUnique({
    where: { id: 1 },
  });
  if (!headerData) throw new Error('No se encontró el encabezado');

  // 3️⃣ Convertir logo a base64
  let logoBase64 = '';
  if (headerData.companyLogo) {
    const logoBuffer = fs.readFileSync(headerData.companyLogo);
    const ext = headerData.companyLogo.split('.').pop();
    logoBase64 = `data:image/${ext};base64,${logoBuffer.toString('base64')}`;
  }

  const fechaActual = new Date().toLocaleDateString('es-ES', {
    month: 'short',
    year: 'numeric',
  }).replace('.', '').replace(' ', ' / ');

  // 4️⃣ Configuración de fuentes pdfmake
   const fonts = {
    Arial: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique',
    },
  };

  const printer = new PdfPrinter(fonts);

  // 5️⃣ Definir contenido del PDF
  const docDefinition: any = {
    defaultStyle: { font: 'Arial' }, // Aquí asignamos Arial por default
    pageSize: 'A4',
    pageMargins: [40, 100, 40, 40], // margen superior grande para header
    header: () => buildPdfHeader(headerData, logoBase64, fechaActual),
    footer: (currentPage, pageCount) => ({
      text: `Página ${currentPage} de ${pageCount}`,
      alignment: 'center',
      fontSize: 9,
      margin: [0, 0, 0, 10],
    }),
    content: [
      { text: `ORDEN DE PRODUCCIÓN Nº: ${order.productionOrder}`, bold: true, margin: [0, 0, 0, 5] },
      { text: `Para: ${order.assignedTo}`, margin: [0, 0, 0, 5] },
      { text: `De: ${order.requestedBy}`, margin: [0, 0, 0, 5] },
      { text: `Fecha: ${order.createDate ? new Date(order.createDate).toLocaleDateString('es-ES') : ''}`, margin: [0, 0, 0, 10] },

      {
        table: {
          widths: ['*', '*', '*', '*'],
          body: [
            ['Cliente', cliente.FantasyName ?? '', 'R.T.N', cliente.taxregnr ?? ''],
          ],
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 10],
      },

      {
        table: {
          widths: ['*', '*', '*'],
          body: [
            ['Nombre del contacto', 'Celular', 'Correo'],
            [order.contactName ?? '', order.contactPhone ?? '', order.contactEmail ?? ''],
          ],
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 10],
      },

      { text: 'Descripción del Proyecto', bold: true, margin: [0, 0, 0, 5] },
      { text: order.projectScope ?? '', margin: [0, 0, 0, 10] },

      { text: 'Localización', bold: true, margin: [0, 0, 0, 5] },
      { text: order.location ?? '', margin: [0, 0, 0, 10] },

      {
        table: {
          widths: ['*', '*'],
          body: [
            ['Peso', `${order.metalWeight ?? ''} ${order.unitofMeasure ?? ''}`],
            ['Gran Total', `${order.currency ?? ''} ${order.grandTotal ?? ''}`],
            ['Factor Cambio', `${order.paymentFactor ?? ''}`],
          ],
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 10],
      },

      { text: 'Forma de Pago', bold: true, margin: [0, 0, 0, 5] },
      { text: order.payTerm ?? '', margin: [0, 0, 0, 10] },

      { text: 'Tiempo de Pago', bold: true, margin: [0, 0, 0, 5] },
      { text: order.deliveryTime ?? '', margin: [0, 0, 0, 10] },

      { text: 'Observaciones', bold: true, margin: [0, 0, 0, 5] },
      {
        ul: order.details.map(d => d.description),
        margin: [0, 0, 0, 10],
      },
    ],
  };

  // 6️⃣ Generar PDF
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  const chunks: Uint8Array[] = [];
  return new Promise<Buffer>((resolve, reject) => {
    pdfDoc.on('data', (chunk) => chunks.push(chunk));
    pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
    pdfDoc.on('error', (err) => reject(err));
    pdfDoc.end();
  });
}



}
