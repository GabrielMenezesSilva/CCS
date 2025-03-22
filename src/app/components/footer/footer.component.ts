import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  contactInfo = {
    address: 'Route du Mandement, 197 - Satigny (GE): 1242 - Suisse',
    email: 'administration@congregationchretienne.ch',
    phone: '0041 22.754.16.79',
  };
}
