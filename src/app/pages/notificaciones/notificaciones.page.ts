import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonIcon,
  IonToggle,
  IonItem,
  IonLabel,
  IonList,
  IonButtons,
  IonBackButton,
  IonInput
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { notifications, checkmarkCircle, time, arrowBack } from 'ionicons/icons';
import { Router } from '@angular/router';

interface ConfigNotificaciones {
  tareas: boolean;
  recordatorios: boolean;
  noMolestar: boolean;
  horaInicio: string;
  horaFin: string;
}

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonIcon,
    IonToggle,
    IonItem,
    IonLabel,
    IonList,
    IonButtons,
    IonBackButton,
    IonInput
  ]
})
export class NotificacionesPage implements OnInit {
  
  config: ConfigNotificaciones = {
    tareas: true,
    recordatorios: true,
    noMolestar: false,
    horaInicio: '22:00',
    horaFin: '08:00'
  };

  constructor(private router: Router) {
    addIcons({ notifications, checkmarkCircle, time, arrowBack });
  }

  ngOnInit() {
    this.cargarConfiguracion();
  }

  cargarConfiguracion() {
    const configGuardada = localStorage.getItem('configNotificaciones');
    if (configGuardada) {
      try {
        this.config = JSON.parse(configGuardada);
      } catch (e) {
        console.error('Error cargando configuración:', e);
      }
    }
  }

  guardarConfiguracion() {
    localStorage.setItem('configNotificaciones', JSON.stringify(this.config));
    console.log('Configuración de notificaciones guardada');
  }

  volver() {
    this.router.navigateByUrl('/perfil');
  }
}
