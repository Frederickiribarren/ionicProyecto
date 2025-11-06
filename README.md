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