import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('announcementFileInput') announcementFileInput!: ElementRef;
  @ViewChild('circularFileInput') circularFileInput!: ElementRef;
  @ViewChild('offeringFileInput') offeringFileInput!: ElementRef;
  @ViewChild('eventFileInput') eventFileInput!: ElementRef;

  selectedFiles: { [key: string]: File | null } = {
    announcement: null,
    circular: null,
    offering: null,
    event: null
  };

  constructor(private fb: FormBuilder, private supabase: SupabaseService) {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      relatorio: ['', Validators.required],
      is_important: [false]
    });

    this.circularForm = this.fb.group({
      title: ['', Validators.required],
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

  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[type] = file;
    } else {
      this.selectedFiles[type] = null;
    }
  }

  // --- ANNOUNCEMENTS ---
  async addAnnouncement() {
    if (this.announcementForm.invalid) return;
    this.loading = true;
    const data = { ...this.announcementForm.value };

    if (this.selectedFiles['announcement']) {
      const url = await this.supabase.uploadDocument(this.selectedFiles['announcement']);
      if (url) data.attachment_url = url;
    }

    await this.supabase.createAnnouncement(data);
    this.announcementForm.reset({ is_important: false });
    this.selectedFiles['announcement'] = null;
    if (this.announcementFileInput) this.announcementFileInput.nativeElement.value = '';
    await this.loadData();
  }
  async deleteAnnouncement(id: string) {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.loading = true;
      await this.supabase.deleteAnnouncement(id);
      await this.loadData();
    }
  }

  // --- CIRCULARS ---
  async addCircular() {
    if (this.circularForm.invalid) return;
    this.loading = true;

    // For circulars, file might be mandatory but we allow creating even if failed just to be safe.
    // However, it's a best practice to ensure the file_url is present.
    const data = { ...this.circularForm.value, file_url: '' };

    if (this.selectedFiles['circular']) {
      const url = await this.supabase.uploadDocument(this.selectedFiles['circular']);
      if (url) data.file_url = url;
    } else {
      alert("Por favor, selecione o arquivo PDF da circular.");
      this.loading = false;
      return;
    }

    await this.supabase.createCircular(data);
    this.circularForm.reset();
    this.selectedFiles['circular'] = null;
    if (this.circularFileInput) this.circularFileInput.nativeElement.value = '';
    await this.loadData();
  }
  async deleteCircular(id: string) {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.loading = true;
      await this.supabase.deleteCircular(id);
      await this.loadData();
    }
  }

  // --- OFFERINGS ---
  async addOffering() {
    if (this.offeringForm.invalid) return;
    this.loading = true;
    const data = { ...this.offeringForm.value };

    if (this.selectedFiles['offering']) {
      const url = await this.supabase.uploadDocument(this.selectedFiles['offering']);
      if (url) data.attachment_url = url;
    }

    await this.supabase.createOffering(data);
    this.offeringForm.reset();
    this.selectedFiles['offering'] = null;
    if (this.offeringFileInput) this.offeringFileInput.nativeElement.value = '';
    await this.loadData();
  }
  async deleteOffering(id: string) {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.loading = true;
      await this.supabase.deleteOffering(id);
      await this.loadData();
    }
  }

  // --- EVENTS ---
  async addEvent() {
    if (this.eventForm.invalid) return;
    this.loading = true;
    const data = { ...this.eventForm.value };

    if (this.selectedFiles['event']) {
      const url = await this.supabase.uploadDocument(this.selectedFiles['event']);
      if (url) data.attachment_url = url;
    }

    await this.supabase.createEvent(data);
    this.eventForm.reset();
    this.selectedFiles['event'] = null;
    if (this.eventFileInput) this.eventFileInput.nativeElement.value = '';
    await this.loadData();
  }
  async deleteEvent(id: string) {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.loading = true;
      await this.supabase.deleteEvent(id);
      await this.loadData();
    }
  }
}
