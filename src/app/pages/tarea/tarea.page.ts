import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonBadge,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  estado: 'pendiente' | 'progreso' | 'finalizada';
  fecha: Date;
}

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonBadge,
    CommonModule, 
    FormsModule
  ]
})
export class TareaPage implements OnInit {
  tareas: Tarea[] = [];
  nuevaTarea = {
    titulo: '',
    descripcion: '',
    estado: 'pendiente' as 'pendiente' | 'progreso' | 'finalizada'
  };

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      try {
        this.tareas = JSON.parse(tareasGuardadas);
      } catch (e) {
        console.error('Error al cargar tareas:', e);
        this.tareas = [];
      }
    }
  }

  guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }



  agregarTarea() {
    if (!this.nuevaTarea.titulo.trim()) {
      this.mostrarToast('Por favor ingresa un título para la tarea', 'warning');
      return;
    }

    const tarea: Tarea = {
      id: Date.now(),
      titulo: this.nuevaTarea.titulo,
      descripcion: this.nuevaTarea.descripcion,
      estado: this.nuevaTarea.estado,
      fecha: new Date()
    };

    this.tareas.push(tarea);
    this.guardarTareas();
    this.mostrarToast('✅ Tarea agregada exitosamente', 'success');
    
    // Limpiar formulario
    this.nuevaTarea = {
      titulo: '',
      descripcion: '',
      estado: 'pendiente'
    };
  }

  getTareasPorEstado(estado: 'pendiente' | 'progreso' | 'finalizada'): Tarea[] {
    return this.tareas.filter(t => t.estado === estado);
  }

  async editarTarea(tarea: Tarea) {
    const alert = await this.alertController.create({
      header: 'Editar Tarea',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: tarea.titulo,
          placeholder: 'Título'
        },
        {
          name: 'descripcion',
          type: 'textarea',
          value: tarea.descripcion,
          placeholder: 'Descripción'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.titulo.trim()) {
              tarea.titulo = data.titulo;
              tarea.descripcion = data.descripcion;
              this.guardarTareas();
              this.mostrarToast('✏️ Tarea actualizada', 'primary');
            }
          }
        },
        {
          text: 'Mover a Progreso',
          handler: () => {
            tarea.estado = 'progreso';
            this.guardarTareas();
            this.mostrarToast('📋 Tarea movida a En Progreso', 'primary');
          }
        }
      ]
    });

    await alert.present();
  }

  async enviarNotificacion(tarea: Tarea) {
    const alert = await this.alertController.create({
      header: '🔔 Notificación',
      message: `¿Deseas recibir recordatorios sobre "${tarea.titulo}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Notificar',
          handler: () => {
            this.mostrarToast('🔔 Notificación configurada para esta tarea', 'warning');
          }
        },
        {
          text: 'Marcar como Finalizada',
          handler: () => {
            tarea.estado = 'finalizada';
            this.guardarTareas();
            this.mostrarToast('🎉 ¡Tarea completada!', 'success');
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarTarea(tarea: Tarea) {
    const alert = await this.alertController.create({
      header: 'Eliminar Tarea',
      message: `¿Estás seguro de eliminar "${tarea.titulo}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            const index = this.tareas.findIndex(t => t.id === tarea.id);
            if (index > -1) {
              this.tareas.splice(index, 1);
              this.guardarTareas();
              this.mostrarToast('🗑️ Tarea eliminada', 'danger');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
      color: color
    });
    await toast.present();
  }
}
