import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  languages = [
    { code: 'pt', name: 'Português' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
  ];

  menuItems = [
    { path: '/', translationKey: 'NAV.HOME' },
    { path: '/institucional', translationKey: 'NAV.INSTITUTIONAL' },
    { path: '/endereco-casas-oracao', translationKey: 'NAV.LOCATIONS' },
  ];

  currentLang: string = 'pt';
  isMobileMenuOpen: boolean = false;
  isLanguageDropdownOpen: boolean = false;
  private isBrowser: boolean;

  constructor(
    private translate: TranslateService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // Define o idioma padrão
    this.translate.setDefaultLang('pt');

    if (this.isBrowser) {
      // Tenta recuperar o idioma salvo no localStorage
      const savedLang = localStorage.getItem('preferredLanguage');
      if (savedLang) {
        this.currentLang = savedLang;
        this.translate.use(savedLang);
      } else {
        // Se não houver idioma salvo, usa o idioma do navegador
        const browserLang = this.translate.getBrowserLang();
        if (
          browserLang &&
          this.languages.some((lang) => lang.code === browserLang)
        ) {
          this.currentLang = browserLang;
          this.translate.use(browserLang);
        }
      }
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.isLanguageDropdownOpen = false;
    }
  }

  toggleLanguageDropdown() {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  getCurrentLanguageName(): string {
    const currentLanguage = this.languages.find(
      (lang) => lang.code === this.currentLang
    );
    return currentLanguage ? currentLanguage.name : '';
  }

  selectLanguage(langCode: string) {
    this.currentLang = langCode;
    this.translate.use(langCode);
    if (this.isBrowser) {
      localStorage.setItem('preferredLanguage', langCode);
    }
    this.isLanguageDropdownOpen = false;
  }

  onLanguageChange(event: any) {
    const newLang = event.target.value;
    this.selectLanguage(newLang);
  }

  navigateToLocations() {
    this.router.navigate(['/endereco-casas-oracao']);
    this.toggleMobileMenu();
  }

  navigateToInstitutional() {
    this.router.navigate(['/institucional']);
    this.toggleMobileMenu();
  }
}
