import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatTabsModule, MatCardModule,
    MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatCheckboxModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  announcements: any[] = [];
  circulars: any[] = [];
  offerings: any[] = [];
  events: any[] = [];

  announcementForm: FormGroup;
  circularForm: FormGroup;
  offeringForm: FormGroup;
  eventForm: FormGroup;

  loading = true;

  constructor(private fb: FormBuilder, private supabase: SupabaseService) {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      relatorio: ['', Validators.required],
      is_important: [false]
    });

    this.circularForm = this.fb.group({
      title: ['', Validators.required],
      file_url: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.offeringForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['']
    });

    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: [''],
      event_date: ['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    try {
      const parts = await Promise.all([
        this.supabase.getAnnouncements(),
        this.supabase.getCirculars(),
        this.supabase.getOfferings(),
        this.supabase.getEvents()
      ]);
      this.announcements = parts[0].data || [];
      this.circulars = parts[1].data || [];
      this.offerings = parts[2].data || [];
      this.events = parts[3].data || [];
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  // --- ANNOUNCEMENTS ---
  async addAnnouncement() {
    if (this.announcementForm.invalid) return;
    await this.supabase.createAnnouncement(this.announcementForm.value);
    this.announcementForm.reset({ is_important: false });
    await this.loadData();
  }
  async deleteAnnouncement(id: string) {
    if (confirm('Tem certeza que deseja excluir?')) {
      await this.supabase.deleteAnnouncement(id);
      await this.loadData();
    }
  }

  // --- CIRCULARS ---
  async addCircular() {
    if (this.circularForm.invalid) return;
    await this.supabase.createCircular(this.circularForm.value);
    this.circularForm.reset();
    await this.loadData();
  }
  async deleteCircular(id: string) {
    if (confirm('Tem certeza que deseja excluir?')) {
      await this.supabase.deleteCircular(id);
      await this.loadData();
    }
  }

  // --- OFFERINGS ---
  async addOffering() {
    if (this.offeringForm.invalid) return;
    await this.supabase.createOffering(this.offeringForm.value);
    this.offeringForm.reset();
    await this.loadData();
  }
  async deleteOffering(id: string) {
    if (confirm('Tem certeza que deseja excluir?')) {
      await this.supabase.deleteOffering(id);
      await this.loadData();
    }
  }

  // --- EVENTS ---
  async addEvent() {
    if (this.eventForm.invalid) return;
    await this.supabase.createEvent(this.eventForm.value);
    this.eventForm.reset();
    await this.loadData();
  }
  async deleteEvent(id: string) {
    if (confirm('Tem certeza que deseja excluir?')) {
      await this.supabase.deleteEvent(id);
      await this.loadData();
    }
  }
}
