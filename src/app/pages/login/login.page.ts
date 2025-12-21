import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { IonInput, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

interface Usuario {
  id: number,
  nombre: String,
  apellido: String,
  email: String,
  password: string,
  activo: boolean,
  fechaNacimiento: string,
  fotoPerfil: string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FormsModule, IonInput, IonInputPasswordToggle]
})
export class LoginPage implements OnInit {

  usuarios: Usuario[] = [];

  model = { email: '', password: '' };
  showPassword = false;
  loading = false;

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private alertCtrl: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.cargarUser();
  }

  irRegister() {
    this.router.navigate(['/register']);
  }

  irDashboard() {
    this.router.navigate(['/dashboard']);
  }

  cargarUser(): Promise<void> {
    const apiUrl = 'http://localhost:8080/json';
    return new Promise((resolve) => {
      this.http.get<Usuario[]>(apiUrl).subscribe({
        next: (respuesta) => {
          this.usuarios = respuesta;
          console.log('Usuarios cargados:', this.usuarios);
          resolve();
        }, error: (error) => {
          console.error('Error al cargar usuarios:', error);
          resolve();
        }
      });
    });
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

   async login() {
    this.loading = true;
    if (!this.model.email || !this.model.password) {
      await this.showAlert('Error', 'Ingrese email y contraseña');
      this.loading = false;
      return;
    }

    const loginData = {
      email: this.model.email.trim(),
      password: this.model.password
    };

    try {
      // Llamar al endpoint de autenticación del backend
      const response = await this.http.post<any>('http://localhost:8080/api/login', loginData).toPromise();
      
      console.log('Login exitoso:', response);
      
      // Guardar datos del usuario usando el servicio
      this.authService.setUsuario(response.usuario);
      
      // Si usas JWT, guarda el token
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      
      this.router.navigate(['/dashboard']);
      
    } catch (error: any) {
      console.error('Error de login:', error);
      
      if (error.status === 401) {
        await this.showAlert('Credenciales inválidas', 'Email o contraseña incorrectos');
        localStorage.removeItem('imagenPerfil');
        location.reload();
      } else {
        await this.showAlert('Error', 'No se pudo conectar con el servidor');
      }
    }

    this.loading = false;
  }
}
