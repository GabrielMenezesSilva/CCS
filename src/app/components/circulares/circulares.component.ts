import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-circulares',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './circulares.component.html',
  styleUrls: ['./circulares.component.scss']
})
export class CircularesComponent implements OnInit {
  circulars: any[] = [];
  loading = true;

  constructor(private supabase: SupabaseService) { }

  async ngOnInit() {
    if (!this.supabase.isBrowser) {
      this.loading = false;
      return;
    }
    try {
      const { data, error } = await this.supabase.getCirculars();
      if (error) throw error;
      this.circulars = data || [];
    } catch (error) {
      console.error('Error fetching circulars', error);
    } finally {
      this.loading = false;
    }
  }
}
