import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMsg = '';

  constructor(private supabase: SupabaseService, private router: Router) { }

  async handleLogin() {
    try {
      this.loading = true;
      this.errorMsg = '';
      const { error } = await this.supabase.signInWithPassword(this.email, this.password);
      if (error) throw error;

      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMsg = error.error_description || error.message;
    } finally {
      this.loading = false;
    }
  }
}
