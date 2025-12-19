import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonDatetime, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, ModalController } from '@ionic/angular/standalone';
import { AddReminderModalComponent } from './add-reminder-modal.component';
import { addIcons } from 'ionicons';
import { add, trashOutline, calendarOutline, addCircle } from 'ionicons/icons';
import { DeviceService } from '../../services/device.service';

interface Recordatorio {
  titulo: string;
  descripcion: string;
  hora: string;
  fecha: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonDatetime, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, CommonModule, FormsModule]
})
export class CalendarPage implements OnInit {

  selectedDate: string;
  todosLosRecordatorios: Recordatorio[] = [];
  recordatoriosDelDia: Recordatorio[] = [];

  constructor(
    private modalCtrl: ModalController,
    private deviceService: DeviceService
  ) {
    addIcons({ add, trashOutline, calendarOutline, addCircle });
    // Inicializar con la fecha local actual
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    this.selectedDate = `${year}-${month}-${day}T00:00:00.000Z`;
  }

  ngOnInit() {
    this.cargarRecordatorios();
    this.filtrarRecordatoriosPorFecha();
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail ? event.detail.value : event;
    this.filtrarRecordatoriosPorFecha();
  }

  goToToday() {
    this.selectedDate = new Date().toISOString();
    this.filtrarRecordatoriosPorFecha();
  }

  async openAddEvent() {
    const modal = await this.modalCtrl.create({
      component: AddReminderModalComponent,
      componentProps: {
        fecha: this.selectedDate
      }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      this.todosLosRecordatorios.push(data);
      this.guardarRecordatorios();
      this.filtrarRecordatoriosPorFecha();
      
      // Vibrar al agregar
      this.deviceService.vibrarExito();
      
      // Programar notificación si tiene hora
      if (data.hora) {
        const fechaHora = new Date(`${data.fecha.split('T')[0]}T${data.hora}`);
        if (fechaHora > new Date()) {
          await this.deviceService.programarNotificacion(
            Date.now(),
            '🗓️ Recordatorio',
            data.titulo,
            fechaHora
          );
        }
      }
    }
  }

  filtrarRecordatoriosPorFecha() {
    const fechaSeleccionada = new Date(this.selectedDate).toDateString();
    this.recordatoriosDelDia = this.todosLosRecordatorios.filter(recordatorio => {
      const fechaRecordatorio = new Date(recordatorio.fecha).toDateString();
      return fechaRecordatorio === fechaSeleccionada;
    }).sort((a, b) => {
      if (a.hora && b.hora) {
        return a.hora.localeCompare(b.hora);
      }
      return 0;
    });
  }

  cargarRecordatorios() {
    const guardados = localStorage.getItem('recordatorios');
    if (guardados) {
      this.todosLosRecordatorios = JSON.parse(guardados);
    }
  }

  guardarRecordatorios() {
    localStorage.setItem('recordatorios', JSON.stringify(this.todosLosRecordatorios));
  }

  eliminarRecordatorio(recordatorio: Recordatorio) {
    this.todosLosRecordatorios = this.todosLosRecordatorios.filter(r => r !== recordatorio);
    this.guardarRecordatorios();
    this.filtrarRecordatoriosPorFecha();
    this.deviceService.vibrarError();
  }

  async agregarACalendarioNativo(recordatorio: Recordatorio) {
    try {
      const fechaHora = new Date(`${recordatorio.fecha.split('T')[0]}T${recordatorio.hora || '12:00'}`);
      const fechaFin = new Date(fechaHora.getTime() + 60 * 60 * 1000); // 1 hora después

      const exito = await this.deviceService.agregarEventoCalendario(
        recordatorio.titulo,
        '', // ubicación
        recordatorio.descripcion || '',
        fechaHora,
        fechaFin
      );

      if (exito) {
        this.deviceService.vibrarExito();
        console.log('✅ Evento agregado al calendario nativo');
      } else {
        this.deviceService.vibrarAdvertencia();
        console.log('⚠️ No se pudo agregar al calendario');
      }
    } catch (error) {
      console.error('Error al agregar al calendario:', error);
      this.deviceService.vibrarError();
    }
  }

}
