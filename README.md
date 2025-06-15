# Different - Sistema de Gestión para Peluquería

Una aplicación web moderna y elegante para la gestión de una peluquería, desarrollada con Next.js 14, TypeScript, TailwindCSS y Framer Motion.

## 🚀 Características

### 🎨 Diseño Moderno
- **UI moderna y elegante** con gradientes atractivos
- **Animaciones suaves** con Framer Motion
- **Completamente responsive** para todos los dispositivos
- **Íconos profesionales** con Lucide Icons

### 🏠 Dashboard Principal
- Métricas de ingresos y egresos
- Gráficos de evolución mensual
- Ranking de empleadas por rendimiento
- Actividad reciente detallada

### 💰 Gestión de Balance
- **ABM de transacciones** (Ingresos y Egresos)
- Filtros por tipo y categoría
- Búsqueda en tiempo real
- Resumen visual de balance

### 👥 Gestión de Empleadas
- Listado completo del equipo
- Perfiles detallados con especialidades
- Métricas de rendimiento individual
- Filtros por rol y estado

### 🔐 Autenticación
- Página de login elegante
- Transiciones suaves entre páginas
- Credenciales de demo prellenadas

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS
- **Animaciones**: Framer Motion
- **Íconos**: Lucide React
- **Datos Mock**: Faker.js

## 📦 Instalación

1. **Clona el repositorio**:
   ```bash
   git clone [repository-url]
   cd different-peluqueria
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Ejecuta en modo desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abre en el navegador**:
   ```
   http://localhost:3000
   ```

## 🎯 Credenciales de Demo

Para acceder a la aplicación, usa las siguientes credenciales:

- **Email**: `maria@different.com`
- **Contraseña**: `password123`

## 📱 Navegación

### Rutas Principales

- **`/`** - Redirección automática al login
- **`/login`** - Página de inicio de sesión
- **`/dashboard`** - Panel principal con métricas
- **`/balance`** - Gestión de ingresos y egresos
- **`/empleadas`** - Gestión del equipo

### Estructura de Navegación

```
├── Login (Página de entrada)
├── Dashboard (Métricas generales)
├── Balance (Gestión financiera)
└── Empleadas (Gestión del equipo)
```

## 🏗️ Arquitectura

### Estructura de Carpetas

```
src/
├── app/                    # App Router de Next.js
│   ├── login/             # Página de login
│   ├── dashboard/         # Dashboard principal
│   ├── balance/           # Gestión de balance
│   ├── empleadas/         # Gestión de empleadas
│   ├── layout.tsx         # Layout raíz
│   └── page.tsx           # Página principal
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes UI básicos
│   ├── layout/           # Componentes de layout
│   └── dashboard/        # Componentes específicos
├── lib/                  # Utilidades y configuración
│   ├── types.ts          # Tipos TypeScript
│   ├── mock-data.ts      # Datos de demo
│   └── utils.ts          # Funciones utilitarias
└── styles/               # Estilos globales
```

### Componentes Principales

- **`DashboardLayout`**: Layout principal con sidebar y header
- **`Sidebar`**: Navegación lateral animada
- **`Header`**: Barra superior con búsqueda y perfil
- **`MetricCard`**: Tarjetas de métricas reutilizables
- **`Card`**: Componente base para tarjetas
- **`Button`**: Botón reutilizable con variantes

## 🎨 Paleta de Colores

La aplicación utiliza una paleta de colores moderna:

- **Primario**: Gradiente púrpura a rosa (`from-purple-600 to-pink-600`)
- **Sidebar**: Gradiente púrpura oscuro (`from-purple-900 to-pink-800`)
- **Éxito**: Verde (`green-500`)
- **Error**: Rojo (`red-500`)
- **Información**: Azul (`blue-500`)

## 📊 Datos Mock

La aplicación incluye datos de ejemplo realistas:

- **5 empleadas** con perfiles completos
- **Transacciones** de ingresos y egresos
- **Métricas** de rendimiento por empleada
- **Evolución mensual** de servicios

## 🔧 Personalización

### Agregar Nuevas Rutas

1. Crea una nueva carpeta en `src/app/`
2. Agrega un archivo `page.tsx`
3. Actualiza el sidebar en `src/components/layout/Sidebar.tsx`

### Modificar Datos Mock

Edita `src/lib/mock-data.ts` para personalizar:
- Empleadas
- Transacciones
- Métricas
- Servicios mensuales

### Personalizar Estilos

Modifica `tailwind.config.ts` para:
- Cambiar colores de marca
- Agregar nuevas animaciones
- Personalizar espaciado

## 🚀 Producción

Para construir para producción:

```bash
# Construir la aplicación
npm run build

# Ejecutar en modo producción
npm start
```

## 📝 Licencia

Este proyecto es un demo educativo para mostrar las capacidades de desarrollo con Next.js y tecnologías modernas.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la aplicación:

1. Fork el proyecto
2. Crea una branch para tu feature
3. Commit tus cambios
4. Push a la branch
5. Abre un Pull Request

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda:

- Abre un issue en GitHub
- Contacta al equipo de desarrollo

---

Desarrollado con ❤️ para Different Peluquería
