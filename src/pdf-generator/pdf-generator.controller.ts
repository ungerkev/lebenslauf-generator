import { Body, Controller, Header, Post, Res } from '@nestjs/common';
import type { Response } from 'express';

import { PdfGeneratorService } from './pdf-generator.service';
import type { FirstPdfTemplateProps } from './pdf/templates/first-pdf-template';

@Controller('pdf-generator')
export class PdfGeneratorController {
  constructor(private readonly pdf: PdfGeneratorService) {}

  @Post('generate')
  @Header('Content-Type', 'application/pdf')
  async generate(@Body() body: FirstPdfTemplateProps, @Res() res: Response) {
    const pdfBuffer = await this.pdf.generatePdf(body);

    // inline = show in browser, attachment = force download
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="lebenslauf_generated.pdf"`,
    );

    res.send(pdfBuffer);
  }
}
