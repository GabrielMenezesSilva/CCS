import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit {
  offerings: any[] = [];
  loading = true;

  constructor(private supabase: SupabaseService) { }

  async ngOnInit() {
    if (!this.supabase.isBrowser) {
      this.loading = false;
      return;
    }
    try {
      const { data, error } = await this.supabase.getOfferings();
      if (error) throw error;
      this.offerings = data || [];
    } catch (error) {
      console.error('Error fetching offerings', error);
    } finally {
      this.loading = false;
    }
  }
}
