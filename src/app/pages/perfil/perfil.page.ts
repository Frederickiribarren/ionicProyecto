import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonAvatar, IonButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { AuthService } from '../../services/auth.service';
import { EditProfileModalComponent } from './edit-profile-modal.component';
import { 
  camera, 
  createOutline, 
  calendarOutline, 
  notificationsOutline, 
  timeOutline, 
  personOutline, 
  colorPaletteOutline, 
  shieldCheckmarkOutline, 
  helpCircleOutline, 
  chevronForwardOutline, 
  logOutOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';

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
    totalTareas: number = 0;
    totalRecordatorios: number = 0;
    nombre: string = 'Nombre Usuario';
    username: string = 'usuario123';
    email: string = 'Correo@correo.com';

  constructor(
    private router: Router, 
    private modalCtrl: ModalController,
    private authService: AuthService
  ) {
    addIcons({ 
      camera, 
      createOutline, 
      calendarOutline, 
      notificationsOutline, 
      timeOutline, 
      personOutline, 
      colorPaletteOutline, 
      shieldCheckmarkOutline, 
      helpCircleOutline, 
      chevronForwardOutline, 
      logOutOutline,
      checkmarkCircleOutline
    });
  }

  ngOnInit() {
    this.cargarEstadisticas();
    this.cargarDatosPerfil();
  }

  cargarDatosPerfil() {
    // Cargar datos del usuario autenticado desde AuthService
    if (this.authService.isLoggedIn()) {
      const usuario = this.authService.getUsuario();
      if (usuario) {
        this.nombre = this.authService.getNombreCompleto();
        this.username = usuario.email.split('@')[0]; // usar parte del email como username
        this.email = this.authService.getEmail();
        
        // Usar foto de perfil de la API (base64 o URL)
        const fotoAPI = this.authService.getFotoPerfil();
        
        // Solo usar imagen local si NO hay imagen válida de la API
        const imagenLocal = localStorage.getItem('imagenPerfil');
        
        // Priorizar imagen de API si existe y no es la default
        if (fotoAPI && fotoAPI !== 'https://ionicframework.com/docs/img/demos/avatar.svg') {
          this.imagenCapturada = fotoAPI;
          console.log('Usando foto de perfil de la API (base64 o URL)');
        } else if (imagenLocal) {
          this.imagenCapturada = imagenLocal;
          console.log('Usando imagen local capturada');
        } else {
          this.imagenCapturada = fotoAPI; // imagen por defecto
          console.log('Usando imagen por defecto');
        }
        
        console.log('Usuario cargado desde API:', usuario);
      }
    }
  }

  cargarEstadisticas() {
    // Cargar tareas desde localStorage
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      try {
        const tareas = JSON.parse(tareasGuardadas);
        this.totalTareas = Array.isArray(tareas) ? tareas.length : 0;
      } catch (e) {
        this.totalTareas = 0;
      }
    }

    // Cargar recordatorios desde localStorage
    const recordatoriosGuardados = localStorage.getItem('recordatorios');
    if (recordatoriosGuardados) {
      try {
        const recordatorios = JSON.parse(recordatoriosGuardados);
        this.totalRecordatorios = Array.isArray(recordatorios) ? recordatorios.length : 0;
      } catch (e) {
        this.totalRecordatorios = 0;
      }
    }
  }

  async tomarFoto() {
    try {
      const foto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      this.imagenCapturada = foto.dataUrl;
      
      // Guardar imagen en localStorage
      if (foto.dataUrl) {
        localStorage.setItem('imagenPerfil', foto.dataUrl);
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
    }
  }

  async abrirEditarPerfil() {
    const modal = await this.modalCtrl.create({
      component: EditProfileModalComponent
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    
    if (data) {
      this.nombre = data.nombre;
      this.username = data.username;
      this.email = data.email;
      
      // Guardar en localStorage
      localStorage.setItem('perfil', JSON.stringify(data));
    }
  }

  irInformacionPersonal() {
    this.router.navigateByUrl('/informacion-personal');
  }

  irNotificaciones() {
    this.router.navigateByUrl('/notificaciones');
  }

  irApariencia() {
    this.router.navigateByUrl('/apariencia');
  }

  irPrivacidadSeguridad() {
    this.router.navigateByUrl('/privacidad-seguridad');
  }

  irAyudaSoporte() {
    this.router.navigateByUrl('/ayuda-soporte');
  }

  onLogout() {
    // Cerrar sesión usando AuthService
    this.authService.logout();
    console.log('Cerrar sesión');
    this.router.navigateByUrl('/login');
  }

  openGeotest() {
    // Navegar a la página de geotest donde se muestra/gestionará el mapa
    this.router.navigateByUrl('/geotest');
  }

}
