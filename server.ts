import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';

import { REQUEST, RESPONSE } from './src/express.tokens';


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // Redirects FIRST
  server.get('/content/assets/outdoor/resource/*', (req, res) => {
    return res.redirect(301, 'https://www.excellentpublicity.com/outdoor');
  });

  server.get('/content/assets/transit/resource/*', (req, res) => {
    return res.redirect(301, 'https://www.excellentpublicity.com/transit');
  });

  server.get('/content/assets/cinema/resource/*', (req, res) => {
    return res.redirect(301, 'https://www.excellentpublicity.com/cinema');
  });

  server.get('/content/assets/radio/resource/*', (req, res) => {
    return res.redirect(301, 'https://www.excellentpublicity.com/radio');
  });

  server.get('/mailtoinquiry@excellentpublicity.com', (req, res) => {
    return res.redirect(301, '/contact');
  });

  server.get('/inquiry@excellentpublicity.com', (req, res) => {
    return res.redirect(301, '/contact');
  });

  server.get('/monitoringtools/', (req, res) => {
    return res.redirect(301, '/monitoring-tools');
  });

  server.get('/monitoringtools/*', (req, res) => {
    return res.redirect(301, '/monitoring-tools');
  });

  server.get('/aitools/', (req, res) => {
    return res.redirect(301, '/ai-tools');
  });

  server.get('/aitools/*', (req, res) => {
    return res.redirect(301, '/ai-tools');
  });

  server.get(/^\/infilm\/(.+)$/, (req, res) => {

    const path = req.originalUrl
      .split('?')[0]
      .replace(/^\/infilm\//, '');

    return res.redirect(
      301,
      `/in-film-advertising-and-cobranding/${path}`
    );
  });

  server.get('/infilm/', (req, res) => {
    return res.redirect(301, '/in-film-advertising-and-cobranding');
  });

  server.get('/eventsponsorship/', (req, res) => {
    return res.redirect(301, '/events-and-sponsorship');
  });

  server.get(/^\/eventsponsorship\/(.+)$/, (req, res) => {

    const path = req.originalUrl
      .split('?')[0]
      .replace(/^\/eventsponsorship\//, '');

    return res.redirect(
      301,
      `/events-and-sponsorship/${path}`
    );
  });


  server.get('/www.excellentpublicity.com', (req, res) => {
    return res.redirect(301, '/');
  });

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        inlineCriticalCss: false, // new add
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl },
        { provide: REQUEST, useValue: req },   // <-- add this
        { provide: RESPONSE, useValue: res },  // <-- and this
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  console.log('SSR SERVER STARTING...')

  const port = process.env['PORT'] || 4201;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
export * from './src/main.server';