import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton } from '@ionic/angular/standalone';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-testcamera',
  templateUrl: './testcamera.page.html',
  styleUrls: ['./testcamera.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, CommonModule, FormsModule]
})
export class TestcameraPage implements OnInit {

  imagenCapturada: string | undefined;

  constructor() { }

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
      console.log('Foto capturada:', this.imagenCapturada);
      console.log('Foto completa:', foto);
    } catch (error) {
      console.error('Error al tomar foto:', error);
    }
  }
}
