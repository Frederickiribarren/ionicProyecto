import { Injectable } from '@angular/core';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  activo: boolean;
  fechaNacimiento: string;
  fotoPerfil: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario: Usuario | null = null;

  constructor() {
    this.cargarUsuarioDesdeStorage();
  }

  private cargarUsuarioDesdeStorage() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      try {
        this.usuario = JSON.parse(usuarioGuardado);
      } catch (e) {
        console.error('Error al cargar usuario desde localStorage:', e);
      }
    }
  }

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUsuario(): Usuario | null {
    return this.usuario;
  }

  getNombreCompleto(): string {
    if (!this.usuario) return 'Usuario';
    return `${this.usuario.nombre} ${this.usuario.apellido}`.trim();
  }

  getNombre(): string {
    return this.usuario?.nombre || 'Usuario';
  }

  getApellido(): string {
    return this.usuario?.apellido || '';
  }

  getEmail(): string {
    return this.usuario?.email || '';
  }

  getFotoPerfil(): string {
    return this.usuario?.fotoPerfil || 'https://ionicframework.com/docs/img/demos/avatar.svg';
  }

  getFechaNacimiento(): string {
    return this.usuario?.fechaNacimiento || '';
  }

  isLoggedIn(): boolean {
    return this.usuario !== null;
  }

  logout() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  }
}
