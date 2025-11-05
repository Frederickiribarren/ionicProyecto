import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon
} from '@ionic/angular/standalone';
import { TareaPage } from '../tarea/tarea.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonIcon,
    CommonModule,
    FormsModule,
    TareaPage
  ]
})
export class DashboardPage implements OnInit {
  currentView: string = 'tarea';

  constructor() { }

  ngOnInit() {
  }

  changeView(view: string) {
    this.currentView = view;
  }

}
