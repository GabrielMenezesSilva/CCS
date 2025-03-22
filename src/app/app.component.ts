import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Congrégation Chrétienne en Suisse';
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private translate: TranslateService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Define os idiomas disponíveis
    this.translate.addLangs(['pt', 'fr', 'de', 'it']);

    // Define o idioma padrão
    this.translate.setDefaultLang('pt');

    if (this.isBrowser) {
      // Tenta recuperar o idioma salvo no localStorage
      const savedLang = localStorage.getItem('preferredLanguage');
      if (savedLang && this.translate.getLangs().includes(savedLang)) {
        this.translate.use(savedLang);
      } else {
        // Se não houver idioma salvo, usa o idioma do navegador ou o padrão
        const browserLang = this.translate.getBrowserLang();
        const lang =
          browserLang && this.translate.getLangs().includes(browserLang)
            ? browserLang
            : 'pt';
        this.translate.use(lang);
        localStorage.setItem('preferredLanguage', lang);
      }
    }
  }

  ngOnInit() {
    // Força a atualização das traduções quando o aplicativo é inicializado
    if (this.isBrowser) {
      this.translate.reloadLang(this.translate.currentLang);
    }
  }
}
