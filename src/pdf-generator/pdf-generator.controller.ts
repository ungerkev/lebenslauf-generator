import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';
import type { Response } from 'express';

import { PdfGeneratorService } from './pdf-generator.service';
import { TEMPLATES } from './pdf/templates';
import type { TemplateName } from './types/pdf-template.types';

@Controller('pdf-generator')
export class PdfGeneratorController {
  constructor(private readonly pdfGeneratorService: PdfGeneratorService) {}

  @Post('generate/:template')
  async generate(
    @Param('template') templateName: TemplateName,
    @Body() body: unknown,
  ) {
    this.pdfGeneratorService.validateSelectedTemplateName(templateName);
    const template = TEMPLATES[templateName];
    const bytes = await this.pdfGeneratorService.generatePdf(template, body);

    return new StreamableFile(Buffer.from(bytes), {
      type: 'application/pdf',
      disposition: `attachment; filename="lebenslauf_generated.pdf"`,
    });
  }

  @Get('preview/:template')
  serveInvoice(
    @Param('template') templateName: TemplateName,
    @Res() res: Response,
  ) {
    this.pdfGeneratorService.validateSelectedTemplateName(templateName);

    const component =
      this.pdfGeneratorService.getTemplateComponent(templateName);

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.send(component);
  }
}
