import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonIcon,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TareaPage } from '../tarea/tarea.page';
import { PerfilPage } from '../perfil/perfil.page';
import { CalendarPage } from '../calendar/calendar.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonIcon,
    CommonModule,
    FormsModule,
    TareaPage,
    PerfilPage
    ,
    CalendarPage
  ]
})
export class DashboardPage implements OnInit {
  currentView: string = 'tarea';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Verificar si el usuario está autenticado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  changeView(view: string) {
    if (view === 'calendario') {
      // Navegar a la ruta del calendario dentro del dashboard
      this.router.navigateByUrl('/dashboard/calendario');
      this.currentView = 'calendario';
      return;
    }
    this.currentView = view;
  }

}
