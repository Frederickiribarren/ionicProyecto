import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  ModalController 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-reminder-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Nuevo Recordatorio</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cancelar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">Título</ion-label>
        <ion-input [(ngModel)]="titulo" placeholder="Ingrese el título"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Descripción</ion-label>
        <ion-textarea [(ngModel)]="descripcion" placeholder="Ingrese una descripción (opcional)" rows="3"></ion-textarea>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Hora</ion-label>
        <ion-input [(ngModel)]="hora" type="time" placeholder="Seleccione la hora"></ion-input>
      </ion-item>

      <ion-button expand="block" (click)="guardar()" [disabled]="!titulo" class="ion-margin-top">
        Guardar Recordatorio
      </ion-button>
    </ion-content>
  `,
  styles: [`
    ion-button {
      margin-top: 20px;
    }
  `]
})
export class AddReminderModalComponent {
  @Input() fecha!: string;
  
  titulo: string = '';
  descripcion: string = '';
  hora: string = '';

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  guardar() {
    if (this.titulo.trim()) {
      this.modalCtrl.dismiss({
        titulo: this.titulo,
        descripcion: this.descripcion,
        hora: this.hora,
        fecha: this.fecha
      });
    }
  }
}
