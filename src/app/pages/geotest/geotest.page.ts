import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonButton, IonIcon, IonItem } from '@ionic/angular/standalone';

interface GPSLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

@Component({
  selector: 'app-geotest',
  templateUrl: './geotest.page.html',
  styleUrls: ['./geotest.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonButton, IonIcon, IonItem, CommonModule, FormsModule]
})
export class GeotestPage implements OnInit {

  unaUbicacion: GPSLocation | undefined;
  obteniendoUbicacion: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  async obtenerUbicacion() {
    this.obteniendoUbicacion = true;
    try {
      console.log('Funcionalidad de geolocalización deshabilitada. Instale @capacitor/geolocation para habilitarla.');
      // TODO: Reinstalar @capacitor/geolocation si se necesita esta funcionalidad
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
    } finally {
      this.obteniendoUbicacion = false;
    }
  }

  obtenerEnlaceMapa(): string {
    if (this.unaUbicacion) {
      return `https://www.google.com/maps/search/?api=1&query=${this.unaUbicacion.latitude},${this.unaUbicacion.longitude}`;
      
    }
    return '';
  } 
}