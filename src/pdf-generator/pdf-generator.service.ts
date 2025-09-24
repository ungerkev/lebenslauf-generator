import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer';
import * as React from 'react';

import { renderHtml } from './pdf/render-html';
import {
  FirstPdfTemplate,
  FirstPdfTemplateProps,
} from './pdf/templates/first-pdf-template';

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

  async generatePdf(data: FirstPdfTemplateProps): Promise<Uint8Array> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();

    const html = renderHtml(React.createElement(FirstPdfTemplate, data), {
      title: `${data.name} – Lebenslauf`,
    });

    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // ensure webfonts/tailwind is ready (cdn script applies styles synchronously after load)
    await page.evaluate(() => document.fonts?.ready);

    // screen media gives you Tailwind screen styles; print media also works if you add print-specific rules
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
}
