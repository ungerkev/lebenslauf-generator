import { Module } from '@nestjs/common';

import { PdfGeneratorModule } from './pdf-generator/pdf-generator.module';

@Module({
  imports: [PdfGeneratorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
