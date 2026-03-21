import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'institucional', component: AboutComponent },
  { path: 'endereco-casas-oracao', component: LocationsComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'circulares',
    loadComponent: () => import('./components/circulares/circulares.component').then(m => m.CircularesComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'ofertas',
    loadComponent: () => import('./components/ofertas/ofertas.component').then(m => m.OfertasComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'eventos',
    loadComponent: () => import('./components/eventos/eventos.component').then(m => m.EventosComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' },
];
