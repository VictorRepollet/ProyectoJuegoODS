# 🌍 Feed the World — Juego ODS

> Juego educativo interactivo basado en los Objetivos de Desarrollo Sostenible (ODS) de la ONU.  
> Proyecto de aula — DAW 1 | JavaScript Vanilla + HTML + CSS | Patrón MVC

---

## 🎯 ODS Beneficiados

| ODS | Nombre | Impacto en el juego |
|-----|--------|---------------------|
| 🟡 ODS 2 | **Hambre Cero** | Mecánica principal: entregar alimentos a personas necesitadas |
| 🔴 ODS 1 | **Fin de la Pobreza** | Garantizar alimentación libera recursos económicos para otras necesidades |

---

## 🕹️ Descripción del juego

El jugador arrastra alimentos desde una zona de recogida y los entrega a las personas correctas según sus pedidos, utilizando mecánica **Drag & Drop**. Cada entrega correcta suma 100 puntos; los errores restan 10. La partida dura 60 segundos. Al terminar, se guarda la puntuación automáticamente en el ranking global.

---

## ⚙️ Tecnología y Arquitectura

El proyecto está desarrollado íntegramente en **JavaScript Vanilla** sin frameworks externos, aplicando el patrón **MVC (Modelo–Vista–Controlador)** con módulos ES6.

```txt
📁 ProyectoJuegoODS/
└── 📁 fuentes/
    ├── index.html
    └── 📁 js/
        ├── app.js                         # Punto de entrada principal
        ├── navegacion.js                  # Sistema de navegación entre vistas
        ├── 📁 controladores/
        │   ├── controlador-juego.js       # Lógica del juego Drag & Drop
        │   └── controlador-jugadores.js   # CRUD completo de jugadores
        ├── 📁 modelos/
        │   ├── jugadores.js               # Clase entidad Jugador
        │   ├── modelo-jugadores.js        # Almacenamiento en Set
        │   └── modelo-puntuaciones.js     # Almacenamiento en Array
        └── 📁 vistas/
            ├── vista-juego.js             # UI y eventos del juego
            ├── vista-contacto.js          # Formulario de contacto
            └── vista-puntuaciones.js      # Ranking y formulario de puntuaciones
```

---

## 🚀 Instalación y uso

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/feed-the-world.git
```

2. Abre `fuentes/index.html` directamente en el navegador **o** usa un servidor local (recomendado por los módulos ES6):

```bash
npx serve fuentes/
```

3. No requiere instalación de dependencias ni build.

> ⚠️ Los módulos ES6 (`import`/`export`) requieren servir el proyecto desde un servidor HTTP. Abrir el archivo directamente desde el sistema de archivos (`file://`) puede causar errores CORS en algunos navegadores.

---

## ✅ Funcionalidades implementadas

### Juego

- Mecánica Drag & Drop para entregar alimentos a personas
- Alimentos y personas se barajan aleatoriamente en cada partida
- Temporizador de 60 segundos con indicador visual de tiempo crítico
- Sistema de puntuación: +100 por entrega correcta, -10 por error
- Regeneración automática de rondas al alimentar a todas las personas
- Botón de pausa
- Pantalla de Game Over con puntuación y personas alimentadas
- Guardado automático de puntuación al finalizar la partida

### Jugadores (CRUD completo)

- Registro de jugadores (nombre, edad, email, contraseña)
- Listado con tabla interactiva
- Edición de datos desde la propia tabla
- Eliminación con confirmación
- Búsqueda en tiempo real por nombre o email
- Filtrado y ordenación alfabética

### Puntuaciones

- Guardado automático tras cada partida
- Inserción manual desde formulario
- Ranking ordenado de mayor a menor puntuación

### Contacto

- Formulario con validación de campos obligatorios
  (nombre, email, descripción, género, tipo, términos)

### Navegación

- Sistema de vistas únicas (solo una visible a la vez)
- Navegación por botones sin recarga de página
- Redirección automática al ranking al terminar una partida

---

## 🗄️ Entidades del sistema

### 👤 Jugador

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Number (auto) | Identificador único autoincremental |
| nombre | String | Nombre del jugador |
| age | Number | Edad |
| email | String | Correo electrónico |
| password | String | Contraseña |

### 🏆 Puntuación

| Campo | Tipo | Descripción |
|-------|------|-------------|
| nombre | String | Nombre del jugador |
| puntuacion | Number | Puntos obtenidos en la partida |

---

## 👥 Equipo

| Miembro | Rol principal |
|---------|--------------|
| Alejandro | Modelos: `jugadores.js`, `modelo-jugadores.js`, `modelo-puntuaciones.js` |
| Carlos | Controladores: `controlador-jugadores.js`, `controlador-juego.js` |
| Víctor | Integración: `app.js`, `index.html`, `style.css`, `navegacion.js` |

---

## 🤝 Flujo de trabajo Git

```bash
# Crear rama por funcionalidad
git checkout -b feature/HU-X-descripcion

# Commit semántico
git commit -m "feat(HU-X): descripción del cambio"

# Pull Request hacia main con revisión de al menos un compañero
```

---

## 📋 Estado del proyecto

| Módulo | Estado |
|--------|--------|
| Estructura MVC | ✅ Completo |
| CRUD Jugadores | ✅ Completo |
| Sistema de navegación | ✅ Completo |
| Juego Drag & Drop | ✅ Completo |
| Temporizador y HUD | ✅ Completo |
| Ranking y puntuaciones | ✅ Completo |
| Vista Contacto | ✅ Completo |