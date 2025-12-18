import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonDatetime, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, ModalController } from '@ionic/angular/standalone';
import { AddReminderModalComponent } from './add-reminder-modal.component';
import { addIcons } from 'ionicons';
import { add, trashOutline, calendarOutline, addCircle } from 'ionicons/icons';

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

  selectedDate: string = new Date().toISOString();
  todosLosRecordatorios: Recordatorio[] = [];
  recordatoriosDelDia: Recordatorio[] = [];

  constructor(private modalCtrl: ModalController) {
    addIcons({ add, trashOutline, calendarOutline, addCircle });
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
  }

}
