import { Module } from '@nestjs/common';
import { PdfGeneratorService } from './pdf-generator.service';

@Module({
  providers: [PdfGeneratorService]
})
export class PdfGeneratorModule {}
