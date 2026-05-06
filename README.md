# 🎮 Feed the World — Juego ODS

> Juego educativo basado en la concienciación de los Objetivos de Desarrollo Sostenible (ODS) de la ONU.

---

## 🌍 ODS Beneficiados

| ODS | Nombre | Impacto en el juego |
|-----|--------|---------------------|
| 🟡 ODS 2 | **Hambre Cero** | Mecánica principal: alimentar a personas necesitadas |
| 🔴 ODS 1 | **Fin de la Pobreza** | Al garantizar comida, la gente dispone de más recursos económicos para otras necesidades |

---

## 🕹️ Descripción

El jugador controla un personaje que recoge alimentos en un lado de la pantalla y debe hacérselos llegar a las personas más necesitadas, lanzándolos o entregándolos en mano según los gustos y pedidos de cada persona, mientras esquiva obstáculos que aparecen a lo largo del nivel.

---

## ⚙️ Tecnología y Arquitectura

El proyecto sigue el patrón **MVC (Modelo–Vista–Controlador)** en JavaScript vanilla:

```
📁 ProyectoJuegoODS/
├── 📁 fuentes/
│   ├── 📁 js/
│   │   ├── 📁 controladores/    # Gestión del flujo y lógica de UI
│   │   ├── 📁 modelos/          # Lógica de datos
│   │   └── 📁 vistas/           # Interfaz y eventos del DOM
│   └── index.html
├── 📁 bocetos/                  # Diseños iniciales
├── 📁 documentacion/            # Documentación del proyecto
└── README.md
```

---

## ✅ Estado actual del proyecto

### Completado

| Módulo | Estado | Descripción |
|--------|--------|-------------|
| **Estructura MVC** | ✅ Hecho | Separación clara en controladores, modelos y vistas |
| **CRUD Jugadores** | ✅ Hecho | Inserción, listado, baja y modificación de jugadores |
| **Vista Puntuaciones** | ✅ Hecho | Formulario de inserción y ranking ordenado con `ModeloPuntuaciones` |
| **Vista Contacto** | ⚠️ Parcial | Formulario con validaciones, pero el envío es simulado (sin modelo) |
| **Navegación entre vistas** | ⚠️ En progreso | Las vistas existen pero se muestran todas a la vez — falta sistema de navegación |
| **Flujo Git / Ramas** | ✅ Hecho | Trabajo con ramas por funcionalidad |

### En progreso / Pendiente

| Módulo | Estado | Descripción |
|--------|--------|-------------|
| **Sistema de navegación** | ❌ Pendiente | Mostrar solo una vista activa según el menú |
| **ModeloContacto** | ❌ Pendiente | Persistencia real de mensajes de contacto |
| **Mecánica de juego** | ❌ Pendiente | Movimiento del personaje, recolección, Drag & Drop, temporizador |
| **Login / Registro** | ❌ Pendiente | Formularios de autenticación |
| **Pantalla Game Over** | ❌ Pendiente | Vista final con puntuación y opciones |
| **Panel admin** | ❌ Pendiente | Gestión de usuarios, puntuaciones y contactos |
| **Mensajes ODS** | ❌ Pendiente | Contenido educativo entre niveles |

---

## 🗄️ Entidades CRUD implementadas

### 👤 Jugadores (ControladorJugadores)
| Operación | Estado |
|-----------|--------|
| Inserción | ✅ |
| Listado | ✅ |
| Baja | ✅ |
| Modificación | ✅ |
| Búsqueda avanzada | ❌ Pendiente |

### 🏆 Puntuaciones (ModeloPuntuaciones)
| Operación | Estado |
|-----------|--------|
| Inserción | ✅ |
| Listado ordenado | ✅ |
| Baja (admin) | ❌ Pendiente |
| Búsqueda | ❌ Pendiente |

### 📬 Contacto (VistaContacto)
| Operación | Estado |
|-----------|--------|
| Inserción | ⚠️ Simulada |
| Listado (admin) | ❌ Pendiente |
| Baja | ❌ Pendiente |
| Búsqueda | ❌ Pendiente |

---

## 📋 Historias de Usuario — Estado

### Sprint 1

| ID | Historia | Estado |
|----|----------|--------|
| US-01 | Menú principal | ⚠️ Parcial |
| US-02 | Registro de usuario | ❌ Pendiente |
| US-03 | Login | ❌ Pendiente |
| US-05 | Navegación entre vistas | ⚠️ En progreso |
| US-06 | Vista de instrucciones | ❌ Pendiente |
| US-08 | Movimiento con teclado | ❌ Pendiente |
| US-09 | Recoger alimentos | ❌ Pendiente |
| US-25 | Estructura MVC | ✅ Hecho |
| US-27 | Ramas de Git | ✅ Hecho |
| US-28 | Code reviews | ✅ Hecho |

### Sprint 2

| ID | Historia | Estado |
|----|----------|--------|
| US-04 | Editar perfil | ❌ Pendiente |
| US-07 | Pantalla Game Over | ❌ Pendiente |
| US-10 | Drag & Drop | ❌ Pendiente |
| US-11 | Obstáculos | ❌ Pendiente |
| US-12 | Pedidos de comida | ❌ Pendiente |
| US-13 | Temporizador | ❌ Pendiente |
| US-14 | Listar usuarios (admin) | ✅ Hecho |
| US-15 | Dar de baja usuario (admin) | ✅ Hecho |
| US-17 | Guardar puntuación | ✅ Hecho |
| US-18 | Ranking global | ✅ Hecho |
| US-20 | Formulario de contacto | ⚠️ Parcial |
| US-23 | Mecánica ODS 2 activa | ❌ Pendiente |
| US-26 | DRY / sin código duplicado | ⚠️ En progreso |

---

## 🤝 Contribución

1. Crea tu rama: `git checkout -b feature/US-XX-descripcion`
2. Realiza tus cambios y haz commit: `git commit -m "feat(US-XX): descripción"`
3. Abre un Pull Request hacia `main`
4. Espera la revisión de al menos un compañero antes de hacer merge
