import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { IonInput, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FormsModule, IonInput, IonInputPasswordToggle]
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

  irDashboard() {
    this.router.navigate(['/dashboard']);
  }
}