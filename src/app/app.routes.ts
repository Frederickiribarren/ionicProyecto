import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'testcamera',
    loadComponent: () => import('./pages/testcamera/testcamera.page').then( m => m.TestcameraPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'tarea',
    loadComponent: () => import('./pages/tarea/tarea.page').then( m => m.TareaPage)
  },
  {
    path: 'geotest',
    loadComponent: () => import('./pages/geotest/geotest.page').then( m => m.GeotestPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'calendar',
    loadComponent: () => import('./pages/calendar/calendar.page').then( m => m.CalendarPage)
  },
  {
    path: 'informacion-personal',
    loadComponent: () => import('./pages/informacion-personal/informacion-personal.page').then( m => m.InformacionPersonalPage)
  },
  {
    path: 'notificaciones',
    loadComponent: () => import('./pages/notificaciones/notificaciones.page').then( m => m.NotificacionesPage)
  },
  {
    path: 'apariencia',
    loadComponent: () => import('./pages/apariencia/apariencia.page').then( m => m.AparienciaPage)
  },
  {
    path: 'privacidad-seguridad',
    loadComponent: () => import('./pages/privacidad-seguridad/privacidad-seguridad.page').then( m => m.PrivacidadSeguridadPage)
  },
  {
    path: 'ayuda-soporte',
    loadComponent: () => import('./pages/ayuda-soporte/ayuda-soporte.page').then( m => m.AyudaSoportePage)
  },
];
