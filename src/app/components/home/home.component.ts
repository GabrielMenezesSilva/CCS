import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  importantAnnouncements: any[] = [];
  loading = true;

  constructor(private router: Router, private supabase: SupabaseService) { }

  async ngOnInit() {
    if (!this.supabase.isBrowser) {
      this.loading = false;
      return;
    }
    try {
      const { data, error } = await this.supabase.getImportantAnnouncements();
      if (!error && data) {
        this.importantAnnouncements = data;
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  navigateToLocations() {
    this.router.navigate(['/endereco-casas-oracao']);
  }

  navigateToInstitutional() {
    this.router.navigate(['/institucional']);
  }

  navigateToEventos() {
    this.router.navigate(['/eventos']);
  }

  navigateToCirculares() {
    this.router.navigate(['/circulares']);
  }

  navigateToOfertas() {
    this.router.navigate(['/ofertas']);
  }
}
