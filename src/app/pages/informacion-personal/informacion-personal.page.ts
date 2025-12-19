import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonList,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { save, person, mail, call, location, calendar, arrowBack } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.page.html',
  styleUrls: ['./informacion-personal.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButton, 
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonTextarea,
    IonList,
    IonButtons,
    IonBackButton
  ]
})
export class InformacionPersonalPage implements OnInit {
  
  nombre: string = '';
  username: string = '';
  email: string = '';
  telefono: string = '';
  direccion: string = '';
  fechaNacimiento: string = '';
  biografia: string = '';

  constructor(private router: Router) {
    addIcons({ save, person, mail, call, location, calendar, arrowBack });
  }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Cargar datos básicos del perfil
    const perfilGuardado = localStorage.getItem('perfil');
    if (perfilGuardado) {
      try {
        const perfil = JSON.parse(perfilGuardado);
        this.nombre = perfil.nombre || '';
        this.username = perfil.username || '';
        this.email = perfil.email || '';
      } catch (e) {
        console.error('Error cargando perfil:', e);
      }
    }

    // Cargar información personal extendida
    const infoGuardada = localStorage.getItem('informacionPersonal');
    if (infoGuardada) {
      try {
        const info = JSON.parse(infoGuardada);
        this.telefono = info.telefono || '';
        this.direccion = info.direccion || '';
        this.fechaNacimiento = info.fechaNacimiento || '';
        this.biografia = info.biografia || '';
      } catch (e) {
        console.error('Error cargando información personal:', e);
      }
    }
  }

  guardar() {
    // Actualizar perfil básico
    const perfil = {
      nombre: this.nombre,
      username: this.username,
      email: this.email
    };
    localStorage.setItem('perfil', JSON.stringify(perfil));

    // Guardar información extendida
    const informacionPersonal = {
      telefono: this.telefono,
      direccion: this.direccion,
      fechaNacimiento: this.fechaNacimiento,
      biografia: this.biografia
    };
    localStorage.setItem('informacionPersonal', JSON.stringify(informacionPersonal));

    console.log('Información personal guardada');
    this.router.navigateByUrl('/perfil');
  }

  volver() {
    this.router.navigateByUrl('/perfil');
  }
}
