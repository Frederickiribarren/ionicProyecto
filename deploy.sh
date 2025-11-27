#!/bin/bash
set -e

# Instala dependencias npm
npm install

# Instala plugins Capacitor necesarios
npm install @capacitor/camera @capacitor/geolocation @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/preferences @capacitor/status-bar

# Sincroniza Capacitor
npx cap sync

echo "Dependencias instaladas y Capacitor sincronizado. Listo para build o deploy."
