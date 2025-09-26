import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer, { Browser } from 'puppeteer';
import * as React from 'react';
import { ZodError } from 'zod';

import { renderHtml } from './pdf/render-html';
import { TEMPLATES } from './pdf/templates';
import { PdfTemplate } from './types/pdf-template.types';

@Injectable()
export class PdfGeneratorService implements OnModuleInit, OnModuleDestroy {
  private browser?: Browser;

  async onModuleInit() {
    await this.getBrowser();
  }

  async onModuleDestroy() {
    if (this.browser) {
      await this.browser.close().catch(() => void 0);
    }
  }

  private async getBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch();
    }
    return this.browser;
  }

  public validateSelectedTemplateName(name?: string) {
    if (!name) {
      throw new BadRequestException('Template name is required');
    }

    if (!(name in TEMPLATES)) {
      throw new NotFoundException(`Unknown template '${name}'`);
    }
  }

  public async generatePdf<TProps extends object>(
    template: PdfTemplate<TProps>,
    data: unknown,
  ): Promise<Uint8Array> {
    let props: TProps;

    try {
      props = template.schema.parse(data);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new BadRequestException(
          e.issues.map((i) => ({
            path: i.path.join('.'),
            code: i.code,
            message: i.message,
          })),
        );
      }
      throw e;
    }

    const browser = await this.getBrowser();
    const page = await browser.newPage();

    const html = renderHtml(React.createElement(template.component, props));

    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts?.ready);
    await page.emulateMediaType('screen');

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: true,
    });

    await page.close();
    return pdf;
  }

  public getTemplateComponent(templateName: string) {
    const filePath = join(
      process.cwd(),
      'src/pdf-generator/pdf/templates',
      `${templateName}.template.tsx`,
    );

    if (!existsSync(filePath)) {
      throw new NotFoundException(
        `Component file with template '${templateName}' not found`,
      );
    }

    return readFileSync(filePath, 'utf8');
  }
}
