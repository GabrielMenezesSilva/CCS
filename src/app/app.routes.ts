import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LocationsComponent } from './components/locations/locations.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'institucional', component: AboutComponent },
  { path: 'endereco-casas-oracao', component: LocationsComponent },
  { path: '**', redirectTo: '' },
];
