import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonButtons,
  IonBackButton,
  IonAccordionGroup,
  IonAccordion,
  IonInput,
  IonTextarea
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { helpCircle, chatbubbles, mail, call, document, arrowBack, chevronDown } from 'ionicons/icons';
import { Router } from '@angular/router';

interface FAQ {
  pregunta: string;
  respuesta: string;
}

@Component({
  selector: 'app-ayuda-soporte',
  templateUrl: './ayuda-soporte.page.html',
  styleUrls: ['./ayuda-soporte.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButton, 
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonButtons,
    IonBackButton,
    IonAccordionGroup,
    IonAccordion,
    IonInput,
    IonTextarea
  ]
})
export class AyudaSoportePage implements OnInit {

  faqs: FAQ[] = [
    {
      pregunta: '¿Cómo agrego una tarea?',
      respuesta: 'Ve a la sección de Tareas, presiona el botón "+" y completa el formulario con el título, descripción, prioridad y fecha de vencimiento.'
    },
    {
      pregunta: '¿Cómo programo recordatorios?',
      respuesta: 'En el calendario, presiona sobre una fecha y se abrirá un modal donde puedes agregar el título, descripción y hora del recordatorio.'
    },
    {
      pregunta: '¿Las notificaciones funcionan en segundo plano?',
      respuesta: 'Sí, las notificaciones se programan usando Capacitor Local Notifications y funcionarán incluso si la app está cerrada.'
    },
    {
      pregunta: '¿Dónde se guardan mis datos?',
      respuesta: 'Todos tus datos se almacenan localmente en tu dispositivo usando localStorage. No se envían a ningún servidor externo.'
    },
    {
      pregunta: '¿Puedo exportar mis datos?',
      respuesta: 'Sí, ve a Privacidad y Seguridad y selecciona "Exportar mis datos" para descargar un archivo JSON con toda tu información.'
    },
    {
      pregunta: '¿Cómo cambio el tema de la app?',
      respuesta: 'Ve a Apariencia en tu perfil y selecciona entre tema claro, oscuro o automático según tu preferencia.'
    }
  ];

  nombre: string = '';
  email: string = '';
  mensaje: string = '';

  constructor(private router: Router) {
    addIcons({ helpCircle, chatbubbles, mail, call, document, arrowBack, chevronDown });
  }

  ngOnInit() {
  }

  enviarConsulta() {
    if (!this.nombre || !this.email || !this.mensaje) {
      console.error('Completa todos los campos');
      return;
    }

    // Aquí iría la lógica para enviar la consulta
    console.log('Consulta enviada:', { nombre: this.nombre, email: this.email, mensaje: this.mensaje });
    
    // Limpiar formulario
    this.nombre = '';
    this.email = '';
    this.mensaje = '';
    
    alert('¡Gracias! Tu consulta ha sido enviada. Te responderemos pronto.');
  }

  volver() {
    this.router.navigateByUrl('/perfil');
  }
}
