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
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, checkmark } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
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
    IonLabel
  ]
})
export class EditProfileModalComponent implements OnInit {
  
  nombre: string = '';
  username: string = '';
  email: string = '';

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService
  ) {
    addIcons({ close, checkmark });
  }

  ngOnInit() {
    // Cargar datos del usuario autenticado desde AuthService
    if (this.authService.isLoggedIn()) {
      const usuario = this.authService.getUsuario();
      if (usuario) {
        this.nombre = this.authService.getNombreCompleto();
        this.username = usuario.email.split('@')[0];
        this.email = this.authService.getEmail();
      }
    } else {
      // Valores por defecto si no hay usuario autenticado
      this.nombre = 'Nombre Usuario';
      this.username = 'usuario123';
      this.email = 'Correo@correo.com';
    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  guardar() {
    if (!this.nombre || !this.username || !this.email) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    const perfil = {
      nombre: this.nombre,
      username: this.username,
      email: this.email
    };

    this.modalCtrl.dismiss(perfil);
  }
}
