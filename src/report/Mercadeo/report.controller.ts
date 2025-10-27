// report.controller.ts
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

   @Get(':id/pdf')
  async generatePdf(@Param('id') id: string, @Res() res: Response) {
    const pdf = await this.reportService.generatePdf(Number(id));

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="reporte_${id}.pdf"`,
    });
    res.send(pdf);
  }



  @Get(':id/pdfb')
async getPdf(@Param('id') id: string, @Res() res: Response) {
  const pdfBuffer = await this.reportService.generatePdf(Number(id));
  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="reporte_${id}.pdf"`,
    'Content-Length': pdfBuffer.length,
  });
  res.end(pdfBuffer);
}


 // Endpoint para PDFMake
  @Get(':id/pdfmake')
  async generatePdfMake(@Param('id') id: string, @Res() res: Response) {
    const pdf = await this.reportService.generatePdfmake(Number(id));

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="reporte_pdfmake_${id}.pdf"`,
    });
    res.send(pdf);
  }


}
