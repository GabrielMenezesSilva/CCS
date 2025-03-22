import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
})
export class LocationsComponent {
  locations = [
    {
      city: 'Dietikon',
      address: 'Lerzenstrasse 8',
      postalCode: '8953 Dietikon',
      country: 'Kanton Zürich',
      phone: 'Tel: +41 22 754 16 79',
      email: 'administration@congregationchretienne.ch',
      services: [
        {
          day: 'WEDNESDAY',
          time: '19:30',
          type: 'WORSHIP',
          language: 'DE/PT',
        },
        {
          day: 'SATURDAY',
          time: '19:00',
          type: 'WORSHIP',
          language: 'DE/PT',
        },
        {
          day: 'SECOND_SUNDAY',
          time: '10:30',
          type: 'YOUTH',
          language: 'DE/PT',
        },
      ],
      musicRehearsal: {
        day: 'FIRST_WEDNESDAY',
        time: '19:30',
        language: 'DE/PT',
      },
    },
    {
      city: 'Satigny',
      address: 'Route du Mandement 197',
      postalCode: '1242',
      country: 'Kanton Genève',
      phone: 'Tel: +41 22 754 16 79',
      email: 'administration@congregationchretienne.ch',
      services: [
        {
          day: 'WEDNESDAY',
          time: '19:30',
          type: 'WORSHIP',
          language: 'PT',
        },
        {
          day: 'SATURDAY',
          time: '19:30',
          type: 'WORSHIP',
          language: 'FR',
        },
        {
          day: 'SUNDAY',
          time: '17:30',
          type: 'WORSHIP',
          language: 'FR',
        },
        {
          day: 'SUNDAY',
          time: '10:30',
          type: 'YOUTH',
          language: 'FR',
        },
      ],
      musicRehearsal: {
        day: 'SECOND_WEDNESDAY',
        time: '19:30',
        language: 'FR',
      },
    },
    {
      city: 'Basel-Landschaft',
      address: 'Mühlemattstrasse 25',
      postalCode: '4104',
      country: 'Kanton Basel',
      phone: 'Tel: +41 22 754 16 79',
      email: 'administration@congregationchretienne.ch',
      services: [
        {
          day: 'WEDNESDAY',
          time: '19:30',
          type: 'WORSHIP',
          language: 'PT',
        },
        {
          day: 'SATURDAY',
          time: '19:30',
          type: 'WORSHIP',
          language: 'PT',
        },
        {
          day: 'FIRST_SATURDAY',
          time: '14:30',
          type: 'YOUTH',
          language: 'PT',
        },
        {
          day: 'THIRD_SUNDAY',
          time: '10:30',
          type: 'YOUTH',
          language: 'PT',
        },
      ],
      musicRehearsal: {
        day: 'THIRD_WEDNESDAY',
        time: '19:30',
        language: 'PT',
      },
    },
    {
      city: 'Cheseaux',
      address: 'Chemin Praz-Lau, 03',
      postalCode: '1033',
      country: 'Kanton Lausanne',
      phone: 'Tel: +41 22 754 16 79',
      email: 'administration@congregationchretienne.ch',
      services: [
        {
          day: 'THURSDAY',
          time: '20:00',
          type: 'WORSHIP',
          language: 'FR',
        },
        {
          day: 'SUNDAY',
          time: '15:30',
          type: 'WORSHIP',
          language: 'FR',
        },
        {
          day: 'SECOND_SUNDAY',
          time: '15:30',
          type: 'YOUTH',
          language: 'FR',
        },
      ],
      musicRehearsal: {
        day: 'FOURTH_WEDNESDAY',
        time: '19:30',
        language: 'FR',
      },
    },
    {
      city: 'Rosé',
      address: 'Route de Rosé, 48 - 1. étage',
      postalCode: '1754',
      country: 'Kanton Fribourg',
      phone: 'Tel: +41 22 754 16 79',
      email: 'administration@congregationchretienne.ch',
      services: [
        {
          day: 'SUNDAY',
          time: '15:30',
          type: 'WORSHIP',
          language: 'PT/FR',
        },
      ],
      musicRehearsal: {
        day: 'LAST_WEDNESDAY',
        time: '19:30',
        language: 'PT/FR',
      },
    },
    {
      city: 'Siders',
      address: 'Rue des Sablons, 15',
      postalCode: '3960',
      country: 'Kanton Sierre',
      phone: 'Tel: +41 22 754 16 79',
      email: 'administration@congregationchretienne.ch',
      services: [
        {
          day: 'SATURDAY',
          time: '19:30',
          type: 'WORSHIP',
          language: 'PT',
        },
        {
          day: 'FIRST_SATURDAY',
          time: '19:30',
          type: 'YOUTH',
          language: 'PT',
        },
      ],
      musicRehearsal: {
        day: 'FIRST_WEDNESDAY',
        time: '19:30',
        language: 'PT',
      },
    },
    {
      city: 'Ebikon',
      address: 'Luzernerstrasse 48',
      postalCode: '6030 Ebikon',
      country: 'Kanton Luzern',
      phone: 'Tel: +41 22 754 16 79',
      email: 'administration@congregationchretienne.ch',
      services: [
        {
          day: 'SUNDAY',
          time: '15:30',
          type: 'WORSHIP',
          language: 'DE',
        },
      ],
      musicRehearsal: {
        day: 'SECOND_WEDNESDAY',
        time: '19:30',
        language: 'DE',
      },
    },
    {
      city: 'Lugano',
      address: 'Sala multiuso/palestra di Gandria - Raccord 3',
      postalCode: '6978',
      country: 'Kanton Lugano',
      phone: 'Tel: +41 22 754 16 79',
      email: 'administration@congregationchretienne.ch',
      services: [
        {
          day: 'LAST_SUNDAY',
          time: '15:30',
          type: 'WORSHIP',
          language: 'IT/PT',
        },
      ],
      musicRehearsal: {
        day: 'THIRD_WEDNESDAY',
        time: '19:30',
        language: 'IT/PT',
      },
    },
    {
      city: 'Chur',
      address: 'Bienenstrasse 9',
      postalCode: '7000 Chur',
      country: 'Kanton Grisons',
      phone: 'Tel: +41 22 754 16 79',
      email: 'administration@congregationchretienne.ch',
      services: [
        {
          day: 'SUNDAY',
          time: '15:30',
          type: 'WORSHIP',
          language: 'DE/PT',
        },
      ],
      musicRehearsal: {
        day: 'FOURTH_WEDNESDAY',
        time: '19:30',
        language: 'DE/PT',
      },
    },
  ];

  expandedIndex: number = -1;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  toggleAccordion(event: Event): void {
    if (!this.isBrowser) return;

    const target = event.target as HTMLElement;
    const accordionItem = target.closest('.location-accordion-item');
    if (accordionItem) {
      const items = document.querySelectorAll('.location-accordion-item');
      const index = Array.from(items).indexOf(accordionItem);
      this.expandedIndex = this.expandedIndex === index ? -1 : index;
    }
  }

  getPhoneNumber(phone: string): string {
    return 'tel:' + phone.replace(/[^0-9+]/g, '');
  }
}
