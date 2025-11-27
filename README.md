# TaskReminder (Ionic + Angular + Capacitor)

> Aplicación móvil híbrida para crear y gestionar tareas, ver calendario y perfil de usuario. Construida con Ionic, Angular y Capacitor.

## Qué incluye el proyecto

- Páginas principales:
  - `login` — inicio de sesión.
  - `register` — registro de usuarios.
  - `dashboard` — pantalla principal con navegación entre `tarea`, `calendario` y `perfil`.
  - `tarea` — CRUD de tareas con estados (Pendiente, En Progreso, Finalizada).
  - `calendar` — vista de calendario con selector de fecha, lista de eventos y FAB para añadir eventos.
  - `perfil` — perfil de usuario con avatar, captura de foto (Capacitor Camera) y mapa / geolocalización.
  - `geotest` / `testcamera` / `geotest` — páginas de prueba para funciones nativas.

## Estructura principal

```
src/
  app/
    pages/
      login/
      register/
      dashboard/
      tarea/
      calendar/
      perfil/
      geotest/
  assets/
  theme/
```

## Rutas (Router)

- `''` -> redirect a `/login`
- `/login`, `/register`, `/dashboard`, `/tarea`, `/calendar`, `/perfil`, `/geotest`

Nota: `dashboard` contiene componentes embebidos (`<app-tarea>`, `<app-perfil>`, `<app-calendar>`) y también tiene rutas dedicadas para el calendario si se desea navegación explícita (p.ej. `/dashboard/calendario`).

## Cómo ejecutar en desarrollo

1. Instala dependencias:

```bash
npm install
```

2. Ejecuta en el navegador (dev server):

```bash
ionic serve
```

3. Para ejecutar en dispositivo/emulador (Capacitor Android):

```bash
ionic build
npx cap sync android
npx cap open android
```

## Dependencias necesarias

Instala todas las dependencias con:

```bash
npm install
```

### Principales (npm)

- `@angular/animations`, `@angular/common`, `@angular/compiler`, `@angular/core`, `@angular/forms`, `@angular/platform-browser`, `@angular/platform-browser-dynamic`, `@angular/router` (Angular 20)
- `@ionic/angular` (Ionic 8)
- `ionicons` (iconos)
- `rxjs`, `tslib`, `zone.js`
- `firebase` (opcional, si usas autenticación o backend Firebase)

### Capacitor (core y plugins)

- `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`
- `@capacitor/app`, `@capacitor/camera`, `@capacitor/geolocation`, `@capacitor/haptics`, `@capacitor/keyboard`, `@capacitor/preferences`, `@capacitor/status-bar`

Instala los plugins nativos necesarios:

```bash
npm install @capacitor/camera @capacitor/geolocation @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/preferences @capacitor/status-bar
npx cap sync
```

### Herramientas de desarrollo

- `@angular-devkit/build-angular`, `@angular/cli`, `@angular/compiler-cli`, `@angular/language-service`
- `@ionic/angular-toolkit`
- `typescript`
- Linter: `eslint`, `@angular-eslint/*`, `@typescript-eslint/*`, `eslint-plugin-import`, `eslint-plugin-jsdoc`, `eslint-plugin-prefer-arrow`
- Testing: `jasmine-core`, `jasmine-spec-reporter`, `karma`, `karma-chrome-launcher`, `karma-coverage`, `karma-jasmine`, `karma-jasmine-html-reporter`, `@types/jasmine`

### Otros

- (Opcional) Google Maps web component/plugin nativo — para `<ion-google-map>` en perfil, sigue la documentación oficial para instalar y configurar.

---
Si tienes dudas sobre alguna dependencia, revisa el archivo `package.json` para la lista completa y versiones.

## Consideraciones de permisos

- Android: agregar permisos en `AndroidManifest.xml` para `ACCESS_FINE_LOCATION` y `ACCESS_COARSE_LOCATION`, además de cámara.
- iOS: configurar `Info.plist` con `NSLocationWhenInUseUsageDescription` y `NSCameraUsageDescription`.

## UX / Funcionalidades implementadas

- Perfil: avatar clickable, capturar foto, mapa embebido, botón para abrir `geotest` y (opcional) seguimiento en tiempo real.
- Dashboard: navegación por pestañas (botones) y embebido de páginas clave.
- Tarea: formulario para crear/editar, listas por estado y acciones CRUD.
- Calendar: header, selector de fecha, lista de eventos y botón FAB para añadir eventos.

## Pendientes / Recomendaciones

- Persistencia: guardar tareas, eventos y preferencias en `localStorage` o backend.
- Autenticación real: integrar con un backend (JWT/OAuth) y añadir logout servidor-side.
- Mejorar manejo de permisos y UX en dispositivos móviles (mensajes, estados de carga).
- Tests: añadir pruebas unitarias y de integración (Karma/Jest + Cypress/Playwright).
- Optimizar estilos SCSS para reducir advertencias de presupuesto (mover variables globales a `src/global.scss`).

## Cómo contribuir

- Crea una rama a partir de `main` o `v1` según el flujo de trabajo:

```bash
git checkout -b feat/mi-cambio
```

- Haz commits claros y PR hacia `main`.

## Contacto

Si necesitas que haga alguno de los pendientes (modal de eventos, persistencia o integración de mapas nativos), dime cuál implemento y lo preparo.

---
Generado por el equipo de desarrollo — resumen de estado actual del proyecto.
# Proyectionic

Versión: 0.0.1
Fecha: 2025-11-05

Descripción
-----------
Proyecto móvil híbrido construido con Ionic + Angular y Capacitor. Es una aplicación de recordatorio de tareas (TaskReminder) con gestión de tareas en tres estados: Pendiente, En Progreso y Finalizada.

Estado actual
------------
- Versión actual: 0.0.1
- Rama principal: `main`
- Últimos cambios principales:
  - feat: Implementación de dashboard con sistema de tareas y navegación por tabs personalizada (commit: `52ccea7`)
  - fix(styles): mover variables globales y ajustar budgets para estilos de componente (commit: `a503a13`)
  - chore(styles): small fixes en dashboard y tarea (commit: `222da37`)

Requisitos
----------
- Node.js >= 18
- npm >= 9
- Ionic CLI
- Capacitor (si quieres generar builds nativas)

Instalación
-----------
```bash
git clone https://github.com/Frederickiribarren/ionicProyecto.git
cd ionicProyecto
npm install
```

Desarrollo (web)
----------------
Iniciar servidor de desarrollo:

```bash
npm run start
# o
ionic serve
```

Construcción (producción)
-------------------------
```bash
npm run build
# o
ng run app:build:production
```

Android (Capacitor)
-------------------
Sincronizar con Android y abrir Android Studio:

```bash
npx cap sync android
npx cap open android
```

Estructura relevante
--------------------
- `src/app/pages/dashboard` — Página principal con header y tabs personalizados.
- `src/app/pages/tarea` — Componente/ página de gestión de tareas (CRUD, 3 estados).
- `src/app/pages/login`, `src/app/pages/register` — Autenticación (UI).
- `src/global.scss` — Variables de tema globales y estilos globales.

Cómo versionar y lanzar una nueva versión
----------------------------------------
Este README está ligado al campo `version` en `package.json`.
Para lanzar una nueva versión (semver), sigue estos pasos:

1. Aumenta la versión en `package.json` (ej.: `0.0.1` → `0.1.0`).
2. Actualiza `README.md` sección "Versión" si lo deseas.
3. Commit y push:

```bash
git add package.json README.md
git commit -m "chore(release): v0.1.0"
git tag v0.1.0
git push origin main --tags
```

Changelog (resumen)
-------------------
### v0.0.1 — 2025-11-05
- Implementación inicial del dashboard con pestañas personalizadas.
- Página de tareas con CRUD y estilos modernos.
- Ajustes de estilos globales y configuración de build.

Contacto
--------
Frederick — repo: https://github.com/Frederickiribarren/ionicProyecto

---
Archivo generado automáticamente por petición. Si quieres que incluya más secciones (API, tests, CI/CD) dilo y lo añado.