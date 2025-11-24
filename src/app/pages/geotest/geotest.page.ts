import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonButton, IonIcon, IonItem } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';

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
      //const permisos = await Geolocation.requestPermissions();
      //if (permisos.location === "granted") {
        const posicion = await Geolocation.getCurrentPosition(
          {
            enableHighAccuracy: true,
            timeout: 10000,
          }
        );
        this.unaUbicacion = {
          latitude: posicion.coords.latitude,
          longitude: posicion.coords.longitude,
          accuracy: posicion.coords.accuracy,
          timestamp: posicion.timestamp
        };
        console.log('Ubicación obtenida:', this.unaUbicacion);
     // } else {
      //  console.error('Permiso de ubicación denegado');
     // }
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