import { Injectable } from '@angular/core';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() {
    this.inicializarNotificaciones();
  }

  // ==================== NOTIFICACIONES ====================
  async inicializarNotificaciones() {
    try {
      const permisos = await LocalNotifications.checkPermissions();
      if (permisos.display !== 'granted') {
        await LocalNotifications.requestPermissions();
      }
    } catch (error) {
      console.error('Error inicializando notificaciones:', error);
    }
  }

  async programarNotificacion(
    id: number,
    titulo: string,
    mensaje: string,
    fecha: Date
  ): Promise<boolean> {
    try {
      const opciones: ScheduleOptions = {
        notifications: [
          {
            id: id,
            title: titulo,
            body: mensaje,
            schedule: {
              at: fecha
            },
            sound: undefined,
            attachments: undefined,
            actionTypeId: '',
            extra: null
          }
        ]
      };

      await LocalNotifications.schedule(opciones);
      console.log(`Notificación programada para ${fecha}`);
      return true;
    } catch (error) {
      console.error('Error programando notificación:', error);
      return false;
    }
  }

  async notificacionInmediata(titulo: string, mensaje: string): Promise<boolean> {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Date.now(),
            title: titulo,
            body: mensaje,
            schedule: {
              at: new Date(Date.now() + 1000)
            },
            sound: undefined,
            attachments: undefined,
            actionTypeId: '',
            extra: null
          }
        ]
      });
      return true;
    } catch (error) {
      console.error('Error mostrando notificación:', error);
      return false;
    }
  }

  async cancelarNotificacion(id: number) {
    try {
      await LocalNotifications.cancel({ notifications: [{ id }] });
    } catch (error) {
      console.error('Error cancelando notificación:', error);
    }
  }

  async obtenerNotificacionesPendientes() {
    try {
      const pendientes = await LocalNotifications.getPending();
      return pendientes.notifications;
    } catch (error) {
      console.error('Error obteniendo notificaciones pendientes:', error);
      return [];
    }
  }

  // ==================== VIBRACIÓN/HAPTICS ====================
  async vibrarExito() {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      console.error('Error vibrando:', error);
    }
  }

  async vibrarAdvertencia() {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (error) {
      console.error('Error vibrando:', error);
    }
  }

  async vibrarError() {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (error) {
      console.error('Error vibrando:', error);
    }
  }

  async vibrarNotificacion() {
    try {
      await Haptics.notification({ type: 'SUCCESS' as any });
    } catch (error) {
      console.error('Error vibrando:', error);
    }
  }

  async vibrarSeleccion() {
    try {
      await Haptics.selectionStart();
      setTimeout(async () => {
        await Haptics.selectionEnd();
      }, 50);
    } catch (error) {
      console.error('Error vibrando:', error);
    }
  }

  // ==================== CALENDARIO NATIVO ====================
  async verificarPermisosCalendario(): Promise<boolean> {
    try {
      if (!window.plugins || !window.plugins.calendar) {
        console.log('Plugin de calendario no disponible');
        return false;
      }
      
      return new Promise((resolve) => {
        window.plugins.calendar.hasReadWritePermission(
          (hasPermission: boolean) => {
            if (!hasPermission) {
              window.plugins.calendar.requestReadWritePermission(
                () => resolve(true),
                () => resolve(false)
              );
            } else {
              resolve(true);
            }
          },
          () => resolve(false)
        );
      });
    } catch (error) {
      console.error('Error verificando permisos de calendario:', error);
      return false;
    }
  }

  async agregarEventoCalendario(
    titulo: string,
    ubicacion: string,
    notas: string,
    fechaInicio: Date,
    fechaFin: Date
  ): Promise<boolean> {
    try {
      const tienePermisos = await this.verificarPermisosCalendario();
      if (!tienePermisos) {
        console.error('No hay permisos para acceder al calendario');
        return false;
      }

      if (!window.plugins || !window.plugins.calendar) {
        console.error('Plugin de calendario no disponible');
        return false;
      }

      return new Promise((resolve) => {
        window.plugins.calendar.createEventInteractively(
          titulo,
          ubicacion,
          notas,
          fechaInicio,
          fechaFin,
          () => {
            console.log('Evento creado exitosamente');
            resolve(true);
          },
          (error: any) => {
            console.error('Error creando evento:', error);
            resolve(false);
          }
        );
      });
    } catch (error) {
      console.error('Error agregando evento al calendario:', error);
      return false;
    }
  }

  async buscarEventos(titulo: string, fechaInicio: Date, fechaFin: Date): Promise<any[]> {
    try {
      const tienePermisos = await this.verificarPermisosCalendario();
      if (!tienePermisos) {
        return [];
      }

      if (!window.plugins || !window.plugins.calendar) {
        return [];
      }

      return new Promise((resolve) => {
        window.plugins.calendar.findEvent(
          titulo,
          '',
          '',
          fechaInicio,
          fechaFin,
          (eventos: any[]) => resolve(eventos),
          () => resolve([])
        );
      });
    } catch (error) {
      console.error('Error buscando eventos:', error);
      return [];
    }
  }
}

