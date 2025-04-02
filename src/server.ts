import { APP_BASE_HREF } from '@angular/common';
import express, { Request, Response, NextFunction } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { config } from './app/app.config.server';
import { AppComponent } from './app/app.component';
import { ApplicationRef } from '@angular/core';
import { renderApplication } from '@angular/platform-server';

// Constantes necessárias para o caminho do diretório
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuração do servidor Express
export function app(): express.Express {
  const server = express();
  const serverDistFolder = resolve(
    __dirname,
    '../dist/congregation-chretienne/browser'
  );
  const browserDistFolder = resolve(
    __dirname,
    '../dist/congregation-chretienne/browser'
  );
  const indexHtml = join(serverDistFolder, 'index.html');

  // Servir arquivos estáticos
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Servir arquivos estáticos do diretório dist/browser
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // Todas as requisições regulares são tratadas pelo Angular
  server.get('*', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { protocol, originalUrl, baseUrl, headers } = req;
      const url = `${protocol}://${headers.host}${originalUrl}`;

      const html = await renderApplication(AppComponent as any, {
        document: indexHtml,
        url,
        platformProviders: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      });

      res.send(html);
    } catch (err: any) {
      next(err);
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Iniciar o servidor
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
