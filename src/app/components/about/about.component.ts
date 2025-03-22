import { Component, OnInit, OnDestroy } from '@angular/core';
import { NlToBrPipe } from '../../pipes/nl-to-br.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NlToBrPipe, TranslateModule, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit, OnDestroy {
  title = 'INSTITUTIONAL.TITLE';
  subtitle = 'INSTITUTIONAL.SUBTITLE';
  contactTitle = 'INSTITUTIONAL.CONTACT.TITLE';
  private langChangeSubscription: Subscription | undefined;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    // Força a atualização das traduções quando o componente é inicializado
    this.translate.reloadLang(this.translate.currentLang);

    // Inscreve-se nas mudanças de idioma
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      // Força a atualização das traduções quando o idioma é alterado
      this.translate.reloadLang(this.translate.currentLang);
    });
  }

  ngOnDestroy() {
    // Cancela a inscrição para evitar memory leaks
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
