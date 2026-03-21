import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  events: any[] = [];
  loading = true;

  constructor(private supabase: SupabaseService) { }

  async ngOnInit() {
    if (!this.supabase.isBrowser) {
      this.loading = false;
      return;
    }
    try {
      const { data, error } = await this.supabase.getEvents();
      if (error) throw error;
      this.events = data || [];
    } catch (error) {
      console.error('Error fetching events', error);
    } finally {
      this.loading = false;
    }
  }
}
