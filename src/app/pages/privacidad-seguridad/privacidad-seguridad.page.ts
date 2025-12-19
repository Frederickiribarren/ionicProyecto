import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonButtons,
  IonBackButton,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosed, eye, trash, download, arrowBack } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacidad-seguridad',
  templateUrl: './privacidad-seguridad.page.html',
  styleUrls: ['./privacidad-seguridad.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonButtons,
    IonBackButton
  ]
})
export class PrivacidadSeguridadPage implements OnInit {

  constructor(
    private router: Router,
    private alertCtrl: AlertController
  ) {
    addIcons({ lockClosed, eye, trash, download, arrowBack });
  }

  ngOnInit() {
  }

  async cambiarContrasena() {
    const alert = await this.alertCtrl.create({
      header: 'Cambiar Contraseña',
      inputs: [
        {
          name: 'actual',
          type: 'password',
          placeholder: 'Contraseña actual'
        },
        {
          name: 'nueva',
          type: 'password',
          placeholder: 'Nueva contraseña'
        },
        {
          name: 'confirmar',
          type: 'password',
          placeholder: 'Confirmar contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cambiar',
          handler: (data) => {
            if (data.nueva !== data.confirmar) {
              this.mostrarError('Las contraseñas no coinciden');
              return false;
            }
            if (data.nueva.length < 6) {
              this.mostrarError('La contraseña debe tener al menos 6 caracteres');
              return false;
            }
            // Aquí iría la lógica real de cambio de contraseña
            console.log('Contraseña cambiada');
            this.mostrarExito('Contraseña actualizada correctamente');
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  async verDatosAlmacenados() {
    const tareas = localStorage.getItem('tareas');
    const recordatorios = localStorage.getItem('recordatorios');
    const perfil = localStorage.getItem('perfil');
    
    let mensaje = 'Datos almacenados localmente:\n\n';
    mensaje += `- Tareas: ${tareas ? JSON.parse(tareas).length : 0}\n`;
    mensaje += `- Recordatorios: ${recordatorios ? JSON.parse(recordatorios).length : 0}\n`;
    mensaje += `- Perfil: ${perfil ? 'Sí' : 'No'}\n`;

    const alert = await this.alertCtrl.create({
      header: 'Datos Almacenados',
      message: mensaje,
      buttons: ['Cerrar']
    });

    await alert.present();
  }

  async exportarDatos() {
    const datos = {
      tareas: JSON.parse(localStorage.getItem('tareas') || '[]'),
      recordatorios: JSON.parse(localStorage.getItem('recordatorios') || '[]'),
      perfil: JSON.parse(localStorage.getItem('perfil') || '{}'),
      informacionPersonal: JSON.parse(localStorage.getItem('informacionPersonal') || '{}'),
      configNotificaciones: JSON.parse(localStorage.getItem('configNotificaciones') || '{}'),
      tema: localStorage.getItem('tema') || 'auto'
    };

    const dataStr = JSON.stringify(datos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `mis-datos-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.mostrarExito('Datos exportados correctamente');
  }

  async eliminarTodosDatos() {
    const alert = await this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: 'Esta acción eliminará todos tus datos de forma permanente.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            localStorage.clear();
            this.mostrarExito('Todos los datos han sido eliminados');
            this.router.navigateByUrl('/login');
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarExito(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  volver() {
    this.router.navigateByUrl('/perfil');
  }
}
