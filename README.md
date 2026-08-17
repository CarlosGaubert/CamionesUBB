# 🚛 Sistema de Gestión de Flota y Transporte Terrestre (Camiones UBB)

Sistema web integral para la administración, monitoreo y control operativo de flotas de camiones, remolques, conductores, mantenciones preventivas/correctivas, combustible y rendimiento financiero.

![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react&style=flat-square)
![Material--UI](https://img.shields.io/badge/Material--UI-v4-0081CB?logo=material-ui&style=flat-square)
![Node](https://img.shields.io/badge/Node-16.x-green?logo=node.js&style=flat-square)
![Yarn](https://img.shields.io/badge/Package%20Manager-Yarn-2C8EBB?logo=yarn&style=flat-square)
![Theme](https://img.shields.io/badge/Theme-Light%20%2F%20Dark-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)

> 📦 **Proyecto Completo:** Este repositorio contiene el **Frontend (Cliente Web React)** del sistema *Camiones UBB*. La API REST y la lógica del servidor se encuentran en el repositorio hermano: [**ServidorCamionesUBB (Backend)**](https://github.com/CarlosGaubert/ServidorCamionesUBB).

---

## 📋 Tabla de Contenidos
* [Descripción General](#-descripción-general)
* [Características y Módulos](#-características-y-módulos)
* [Stack Tecnológico](#-stack-tecnológico)
* [Estructura del Proyecto](#-estructura-del-proyecto)
* [Requisitos Previos](#-requisitos-previos)
* [Instalación y Puesta en Marcha](#-instalación-y-puesta-en-marcha)
* [Scripts Disponibles](#-scripts-disponibles)
* [Conexión con el Backend (API)](#-conexión-con-el-backend-api)

---

## 🌟 Descripción General

Esta plataforma está diseñada para optimizar los procesos de transporte de carga y logística de flotas vehiculares. Proporciona una interfaz moderna, limpia y personalizable (con soporte para **Modo Claro** y **Modo Oscuro** en tonos grises neutros), permitiendo gestionar todo el ciclo operacional de la empresa.

---

## 📦 Características y Módulos

El sistema se divide en varios módulos funcionales:

### 1. 📊 Dashboard Principal (Inicio)
* **Tarjetas de KPIs:** Monitoreo en tiempo real de flota activa, conductores en nómina, alertas de control de licencias y mantenciones.
* **Alertas de Licencias de Conducir:** Listado y seguimiento de vencimientos de licencias municipales con filtros y exportación a CSV.
* **Accesos Rápidos:** Accesos directos a las acciones más frecuentes.

### 2. 🚛 Gestión de Flota (Camiones y Carros)
* Registro, edición y fichas técnicas de camiones y carros/remolques.
* Asignación dinámica de carros a camiones.
* Registro de odómetro mensual y control de seguros/pólizas.

### 3. 👨‍✈️ Personal y Conductores
* Administración y fichas de choferes y otros empleados.
* Asignación de conductor a camión (ADC).
* Registro y categorización de eventos/incidencias del conductor.
* Cálculo de sueldos y costos indirectos de personal.

### 4. 🔧 Módulo de Mantenciones
* **Preventivas:** Programación periódica de mantenciones preventivas (APMP), seguimiento y control de cumplimiento.
* **Correctivas:** Registro de fallas mecánicas, repuestos y costos de reparación.
* **Órdenes de Trabajo:** Generación e impresión de órdenes de trabajo para taller mecánico.

### 5. ⛽ Combustible y Tarjetas de Carga
* Registro y consulta de boletas de carga de combustible.
* Administración y asignación de Tarjetas de Carga de Combustible (TCC).

### 6. 🗺️ Rutas, Obras y Clientes
* Definición de rutas, distancias y obras de destino.
* Registro de clientes y tarifas diferenciadas por cliente.
* Control de instituciones financieras asociadas (leasing / créditos).

### 7. 🛣️ Operaciones y Programas de Viaje
* Planificación de programas de viaje generales y por camión.
* Registro detallado de viajes efectuados y viajes cancelados/no efectuados.
* Control y liquidación de gastos asociados por viaje.

### 8. 📈 Rentabilidad y Métricas
* Informes de productividad, rendimiento de combustible, costos vs. utilidad.
* Balances y resultados financieros detallados por camión y por mes.

### 🌓 Modo Oscuro / Modo Claro
* Conmutador en la barra superior con persistencia automática en `localStorage` y adaptación de paleta neutral de tonos grises.

---

## 🛠️ Stack Tecnológico

* **Frontend:** React 17
* **Enrutamiento:** `react-router-dom` (v5)
* **Diseño e Interfaz:** Material-UI v4 (`@material-ui/core`, `@material-ui/icons`, `material-datatable`)
* **Tipografía:** Inter (Google Fonts)
* **Gráficos:** `chart.js` y `react-chartjs-2`
* **Formularios & Alertas:** `react-hook-form`, `rut.js`, `sweetalert2`
* **Cliente HTTP:** `axios` (con proxy a `http://localhost:4000`)

---

## 📁 Estructura del Proyecto

```text
CamionesUBB/
├── public/                     # Archivos públicos y plantilla HTML
│   └── index.html
├── src/
│   ├── views/
│   │   ├── DrawerNavigation/   # Menú lateral y barra superior (AppBar)
│   │   ├── Home.jsx            # Dashboard principal con métricas y alertas
│   │   └── Secciones/          # Vistas modulares (Camión, Mantenciones, Viajes, etc.)
│   ├── Tema.jsx                # Configuración de temas Material-UI (Claro y Oscuro)
│   ├── ThemeContext.js         # Contexto de cambio de tema y persistencia
│   ├── App.js                  # Enrutador principal y configuración
│   ├── App.css                 # Estilos utilitarios y animaciones
│   ├── index.css               # Estilos globales y reset
│   └── index.js                # Punto de entrada de React
├── .gitignore                  # Exclusiones para control de versiones Git
├── .nvmrc                      # Versión de Node recomendada (Node 16)
├── package.json                # Dependencias y scripts
└── yarn.lock                   # Lockfile de dependencias Yarn
```

---

## ⚙️ Requisitos Previos

* **Node.js:** Versión `16.x` (LTS recomendada: `v16.20.2`).
* **Yarn:** Versión `1.22+` instalada globalmente (`npm install -g yarn`).
* **NVM (Node Version Manager):** Recomendado para gestionar la versión de Node fácilmente.

---

## 🚀 Instalación y Puesta en Marcha

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/CamionesUBB.git
cd CamionesUBB
```

### 2. Usar la versión correcta de Node.js
Si utilizas **NVM**:
```bash
nvm use
# O si no tienes Node 16 instalado:
nvm install 16 && nvm use 16
```

### 3. Instalar las dependencias
```bash
yarn install
```

### 4. Iniciar el servidor de desarrollo
```bash
yarn start
```

La aplicación se abrirá automáticamente en tu navegador en:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📜 Scripts Disponibles

* `yarn start`: Inicia el servidor de desarrollo en `http://localhost:3000`.
* `yarn build`: Compila la aplicación optimizada para producción en la carpeta `build`.
* `yarn test`: Ejecuta los tests del proyecto.

> **Nota para usuarios de Windows:** El proyecto incluye archivos `.bat` de conveniencia en la raíz (`iniciar.bat`, `instalar paquetes.bat`) para facilitar la ejecución con un doble clic.

---

## 🔌 Conexión con el Backend (API)

La aplicación consume la API REST provista por el repositorio del servidor:
* **Repositorio Backend:** [ServidorCamionesUBB](https://github.com/CarlosGaubert/ServidorCamionesUBB)
* **Tecnología Backend:** Node.js + Express + Sequelize + MySQL
* **Documentación de Endpoints:** `http://localhost:4000/api/docs` (Swagger UI)

La aplicación tiene configurado un proxy en `package.json`:
```json
"proxy": "http://localhost:4000"
```
Para que las peticiones a la base de datos y endpoints `/api/...` respondan con datos reales, asegúrate de tener ejecutándose la API en el puerto `4000`. Si el backend está apagado, la aplicación continuará funcionando y mostrará las interfaces de manera segura con estados de carga/espera.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo [LICENSE](file:///Users/carlosgaubert/Desktop/github%20repositorios/CamionesUBB-main/LICENSE) para más información.
