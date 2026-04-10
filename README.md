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

Cada entrega correcta suma puntos y contribuye al contador global de **personas alimentadas**, visible para toda la comunidad de jugadores.

---

## ⚙️ Tecnología y Arquitectura

El proyecto sigue el patrón **MVC (Modelo–Vista–Controlador)**:

```
📁 ProyectoJuegoODS/
├── 📁 model/        # Lógica de negocio y acceso a BD
├── 📁 view/         # Interfaz de usuario y plantillas
├── 📁 controller/   # Gestión de peticiones y flujo
└── 📁 assets/       # Imágenes, audio y recursos estáticos
```

---

## 🗄️ Entidades CRUD

### 👤 Usuarios
| Operación | Descripción |
|-----------|-------------|
| Inserción | Registro con nombre, email, avatar y fecha de nacimiento |
| Listado | Panel admin con tabla de usuarios |
| Baja | Eliminación de cuenta con confirmación |
| Modificación | Edición de perfil y cambio de contraseña |
| Búsqueda avanzada | Filtro por nombre, email, fecha y rango de puntuación |

### 🏆 Puntuaciones
| Operación | Descripción |
|-----------|-------------|
| Inserción | Guardar puntuación al finalizar partida |
| Listado | Ranking global ordenado de mayor a menor |
| Baja | Eliminar puntuaciones irregulares (admin) |
| Búsqueda | Filtro por usuario y fecha |

### 📬 Formulario de Contacto / Sugerencias
| Operación | Descripción |
|-----------|-------------|
| Inserción | Envío de sugerencias con nombre, email, categoría, mensaje y urgencia |
| Listado | Panel admin con bandeja de mensajes |
| Baja | Eliminar mensajes resueltos |
| Búsqueda | Filtro por categoría y fecha |

---

## 📋 Backlog — Historias de Usuario

### 🖥️ Épica 1: Interfaz y Controles

| ID | Historia de Usuario | Prioridad | Sprint |
|----|---------------------|-----------|--------|
| US-01 | Como jugador, quiero ver un menú principal con botones de Jugar, Puntuaciones y Contacto. | 🔴 Alta | 1 |
| US-02 | Como jugador, quiero registrarme con un formulario que incluya nombre, email, avatar y fecha de nacimiento. | 🔴 Alta | 1 |
| US-03 | Como jugador, quiero un formulario de login con email y contraseña. | 🔴 Alta | 1 |
| US-04 | Como jugador, quiero ver mi perfil y poder editar mis datos. | 🟡 Media | 2 |

### 🗺️ Épica 2: Navegación entre Vistas

| ID | Historia de Usuario | Prioridad | Sprint |
|----|---------------------|-----------|--------|
| US-05 | Como jugador, quiero navegar entre el menú, el juego, puntuaciones, perfil y contacto. | 🔴 Alta | 1 |
| US-06 | Como jugador, quiero una vista de instrucciones antes de empezar. | 🟡 Media | 1 |
| US-07 | Como jugador, quiero ver una pantalla de Game Over con mi puntuación final y opciones. | 🔴 Alta | 2 |

### 🎮 Épica 3: Mecánica de Juego (Eventos)

| ID | Historia de Usuario | Prioridad | Sprint |
|----|---------------------|-----------|--------|
| US-08 | Como jugador, quiero mover al personaje con el teclado (flechas / WASD). | 🔴 Alta | 1 |
| US-09 | Como jugador, quiero que el personaje recoja alimentos haciendo clic o colisionando. | 🔴 Alta | 1 |
| US-10 | Como jugador, quiero lanzar/entregar comida a personas necesitadas arrastrando (Drag & Drop). | 🔴 Alta | 2 |
| US-11 | Como jugador, quiero que los obstáculos aparezcan y deba esquivarlos. | 🔴 Alta | 2 |
| US-12 | Como jugador, quiero que las personas muestren su pedido de comida con un icono o bocadillo. | 🟡 Media | 2 |
| US-13 | Como jugador, quiero un temporizador visible que limite la partida. | 🔴 Alta | 2 |

### 🗄️ Épica 4: Operaciones CRUD

| ID | Historia de Usuario | Prioridad | Sprint |
|----|---------------------|-----------|--------|
| US-14 | Como admin, quiero poder listar todos los usuarios registrados. | 🔴 Alta | 2 |
| US-15 | Como admin, quiero poder dar de baja a un usuario. | 🔴 Alta | 2 |
| US-16 | Como admin, quiero buscar usuarios por nombre o email. | 🟡 Media | 3 |
| US-17 | Como jugador, quiero guardar mi puntuación al finalizar la partida. | 🔴 Alta | 2 |
| US-18 | Como jugador, quiero ver el ranking global de puntuaciones. | 🔴 Alta | 2 |
| US-19 | Como admin, quiero poder eliminar puntuaciones irregulares. | 🟢 Baja | 3 |
| US-20 | Como usuario, quiero enviar sugerencias mediante un formulario de contacto. | 🔴 Alta | 2 |
| US-21 | Como admin, quiero ver, responder y eliminar los mensajes de contacto. | 🟡 Media | 3 |

### 🌍 Épica 5: Competencia Ciudadana (ODS)

| ID | Historia de Usuario | Prioridad | Sprint |
|----|---------------------|-----------|--------|
| US-22 | Como jugador, quiero ver mensajes educativos sobre el hambre y la pobreza entre niveles. | 🔴 Alta | 3 |
| US-23 | Como jugador, quiero que la mecánica del juego refleje activamente el ODS 2 (Hambre Cero). | 🔴 Alta | 2 |
| US-24 | Como jugador, quiero ver un contador de 'personas alimentadas' global acumulado entre sesiones. | 🟡 Media | 3 |

### 🧹 Épica 6: Código Limpio (Clean Code)

| ID | Historia de Usuario | Prioridad | Sprint |
|----|---------------------|-----------|--------|
| US-25 | Como equipo, queremos estructurar el proyecto con MVC claro. | 🔴 Alta | 1 |
| US-26 | Como equipo, queremos garantizar que no hay código duplicado (DRY). | 🔴 Alta | 2 |

### 👥 Épica 7: Trabajo en Equipo

| ID | Historia de Usuario | Prioridad | Sprint |
|----|---------------------|-----------|--------|
| US-27 | Como equipo, queremos usar ramas de Git por funcionalidad (`feature/US-XX-descripcion`). | 🔴 Alta | 1 |
| US-28 | Como equipo, queremos hacer code reviews antes de integrar cambios. | 🔴 Alta | 1 |

---

## 🗓️ Planificación de Sprints

### Sprint 1 — Fundamentos
> Auth, menú, movimiento básico, estructura MVC y flujo Git

`US-01` `US-02` `US-03` `US-05` `US-06` `US-08` `US-09` `US-25` `US-27` `US-28` — **33 puntos**

### Sprint 2 — Núcleo del juego
> Drag & Drop, CRUD base, pantallas de juego y narrativa ODS

`US-04` `US-07` `US-10` `US-11` `US-12` `US-13` `US-14` `US-15` `US-17` `US-18` `US-20` `US-22` `US-23` `US-26` — **43 puntos**

### Sprint 3 — Pulido y panel admin
> Búsqueda avanzada, ranking global, gestión de contacto

`US-16` `US-19` `US-21` `US-24` — **11 puntos**

**Total: 87 puntos de historia**

---

## ✅ Cobertura de Rúbrica

| Criterio | Cobertura |
|----------|-----------|
| **Interfaz y Controles** | ✅ `input text`, `textarea`, `hidden`, `select`, `radio`, `check`, `button`, `a`, `file`, `date` |
| **Navegación entre vistas** | ✅ 6+ vistas con menú de navegación claro |
| **Eventos (Juegos/Interacción)** | ✅ Teclado, ratón y Drag & Drop |
| **Operaciones CRUD** | ✅ Inserción, Listado, Baja, Modificación y Búsqueda avanzada |
| **Competencia Ciudadana (ODS)** | ✅ ODS 2 integrado activamente en la mecánica del juego |
| **Código Limpio (Clean Code)** | ✅ MVC, DRY, nombres semánticos y comentarios |
| **Trabajo en Equipo** | ✅ Ramas por feature, pull requests y code reviews |

---

## 🤝 Contribución

1. Crea tu rama: `git checkout -b feature/US-XX-descripcion`
2. Realiza tus cambios y haz commit: `git commit -m "feat(US-XX): descripción"`
3. Abre un Pull Request hacia `main`
4. Espera la revisión de al menos un compañero antes de hacer merge