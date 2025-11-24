import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonDatetime, IonIcon, IonFab, IonFabButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonFab, IonFabButton, IonDatetime, IonList, IonItem, IonLabel, CommonModule, FormsModule]
})
export class CalendarPage implements OnInit {

  selectedDate: string = new Date().toISOString();
  events: Array<{ title: string; time: string }> = [];

  constructor() { }

  ngOnInit() {
    // placeholder: cargar eventos desde servicio/localStorage
    this.events = [
      { title: 'Reunión con equipo', time: new Date().toISOString() },
    ];
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail ? event.detail.value : event;
    // aquí podrías filtrar eventos por fecha
  }

  goToToday() {
    this.selectedDate = new Date().toISOString();
  }

  openAddEvent() {
    // placeholder: abrir modal o navegar a creación de evento
    const titulo = prompt('Título del evento');
    if (titulo) {
      this.events.unshift({ title: titulo, time: this.selectedDate });
    }
  }

}
