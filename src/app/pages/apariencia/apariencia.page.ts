import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonIcon,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonSegment,
  IonSegmentButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { moon, sunny, contrast, arrowBack } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apariencia',
  templateUrl: './apariencia.page.html',
  styleUrls: ['./apariencia.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonIcon,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonSegment,
    IonSegmentButton
  ]
})
export class AparienciaPage implements OnInit {
  
  temaSeleccionado: 'light' | 'dark' | 'auto' = 'auto';
  autoSwitch: boolean = true;

  constructor(private router: Router) {
    addIcons({ moon, sunny, contrast, arrowBack });
  }

  ngOnInit() {
    this.cargarTema();
  }

  cargarTema() {
    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado) {
      this.temaSeleccionado = temaGuardado as 'light' | 'dark' | 'auto';
      this.aplicarTema();
    }
  }

  cambiarTema(event: any) {
    this.temaSeleccionado = event.detail.value;
    this.aplicarTema();
    localStorage.setItem('tema', this.temaSeleccionado);
  }

  aplicarTema() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Remover ambas clases primero
    document.documentElement.classList.remove('ion-palette-dark');
    
    if (this.temaSeleccionado === 'auto') {
      // Usar preferencia del sistema
      if (prefersDark.matches) {
        document.documentElement.classList.add('ion-palette-dark');
      }
    } else if (this.temaSeleccionado === 'dark') {
      document.documentElement.classList.add('ion-palette-dark');
    }
    // Si es 'light', la clase ya fue removida
  }

  volver() {
    this.router.navigateByUrl('/perfil');
  }
}
