import { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';

/**
 * wraps a react tree with a basic HTML + tailwind (cdn) shell
 * puppeteer will load this html with setContent().
 */
export function renderHtml(doc: ReactElement, opts?: { title?: string }) {
  const body = renderToString(doc);

  // NOTE: using the official Tailwind CDN script is fine for your first PDF.
  // when you need full control/offline rendering: precompile CSS and inline it.
  return `<!doctype html>
<html lang="de">
<head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${opts?.title ?? 'Lebenslauf'}</title>

  <!-- Tailwind CDN (works in headless Chrome). This points to the latest,
       which today covers v3+/v4 runtime. For production, prefer precompiled CSS. -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Font CDN (Calibri-compatible: Carlito) -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Carlito:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">


  <style>
    /* PDF page setup */
    @page { size: A4; margin: 0; }
    @media print { body { -webkit-print-color-adjust: exact; } }
    html, body { font-family: "Carlito", "Calibri", Arial, sans-serif; }
  </style>
</head>
<body class="bg-white">
  <div id="root">${body}</div>
</body>
</html>`;
}
