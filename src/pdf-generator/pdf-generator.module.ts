import { Module } from '@nestjs/common';

import { PdfGeneratorController } from './pdf-generator.controller';
import { PdfGeneratorService } from './pdf-generator.service';

@Module({
  providers: [PdfGeneratorService],
  controllers: [PdfGeneratorController],
})
export class PdfGeneratorModule {}
