import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    this.inicializarTema();
  }

  inicializarTema() {
    const temaGuardado = localStorage.getItem('tema');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Remover clase primero
    document.documentElement.classList.remove('ion-palette-dark');
    
    if (temaGuardado) {
      if (temaGuardado === 'auto') {
        if (prefersDark.matches) {
          document.documentElement.classList.add('ion-palette-dark');
        }
      } else if (temaGuardado === 'dark') {
        document.documentElement.classList.add('ion-palette-dark');
      }
      // Si es 'light', la clase ya fue removida
    }
  }
}
