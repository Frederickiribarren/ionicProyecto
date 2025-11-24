import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonAvatar, IonButton, IonIcon, } from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonAvatar, IonButton, IonIcon],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PerfilPage implements OnInit {

    imagenCapturada: string | undefined;
    center: { lat: number; lng: number } = { lat: -34.6037, lng: -58.3816 };

  constructor(private router: Router) { }

  ngOnInit() {
  }

async tomarFoto() {
    try {
      const foto =  await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      this.imagenCapturada = foto.dataUrl;
    } catch (error) {
      console.error('Error al tomar foto:', error);
    }
  }

  onLogout() {
    // Aquí podrías limpiar estado/localStorage antes de redirigir
    console.log('Cerrar sesión');
    this.router.navigateByUrl('/login');
  }

  openGeotest() {
    // Navegar a la página de geotest donde se muestra/gestionará el mapa
    this.router.navigateByUrl('/geotest');
  }

}
