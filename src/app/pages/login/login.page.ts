import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonIcon, IonSpinner, CommonModule, FormsModule, IonInput]
})
export class LoginPage implements OnInit {

  model = { email: '', password: '' };
  showPassword = false;
  loading = false;

  constructor(private router: Router) { }

  ngOnInit() {}

  irRegister() {
    this.router.navigate(['/register']);
  }

}
