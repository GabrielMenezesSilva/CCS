import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

// Loader específico para o servidor que usa o sistema de arquivos
export class TranslateServerLoader implements TranslateLoader {
  constructor() {}

  getTranslation(lang: string): Observable<any> {
    const filePath = path.join(
      process.cwd(),
      'dist',
      'congregation-chretienne',
      'browser',
      'assets',
      'i18n',
      `${lang}.json`
    );
    return from(
      new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(data));
          }
        });
      })
    );
  }
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateServerLoader,
      },
      defaultLanguage: 'pt',
      useDefaultLang: true,
      isolate: false,
    }).providers!,
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
