import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonAvatar, IonButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
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

  constructor(private router: Router, private modalCtrl: ModalController) {
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
    const perfilGuardado = localStorage.getItem('perfil');
    if (perfilGuardado) {
      try {
        const perfil = JSON.parse(perfilGuardado);
        this.nombre = perfil.nombre || 'Nombre Usuario';
        this.username = perfil.username || 'usuario123';
        this.email = perfil.email || 'Correo@correo.com';
      } catch (e) {
        console.error('Error cargando perfil:', e);
      }
    }

    // Cargar imagen capturada si existe
    const imagenGuardada = localStorage.getItem('imagenPerfil');
    if (imagenGuardada) {
      this.imagenCapturada = imagenGuardada;
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
    // Aquí podrías limpiar estado/localStorage antes de redirigir
    console.log('Cerrar sesión');
    this.router.navigateByUrl('/login');
  }

  openGeotest() {
    // Navegar a la página de geotest donde se muestra/gestionará el mapa
    this.router.navigateByUrl('/geotest');
  }

}
