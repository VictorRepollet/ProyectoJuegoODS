# 🎮 BACKLOG — Juego ODS: Hambre Cero
**Proyecto: Feed the World | ODS 2 – Hambre Cero | ODS 1 – Fin de la Pobreza**

---

## 📋 Tabla de Historias de Usuario

| ID | ÉPICA | HISTORIA DE USUARIO | CRITERIOS DE ACEPTACIÓN | PRIORIDAD | PUNTOS | SPRINT | ENTIDAD CRUD | CRITERIO RÚBRICA |
|----|-------|---------------------|--------------------------|-----------|--------|--------|--------------|------------------|
| US-01 | 🖥️ Interfaz y Controles | Como jugador, quiero ver un menú principal con botones de Jugar, Puntuaciones y Contacto. | - Botón 'Jugar' lanza el juego<br>- Botón 'Puntuaciones' muestra tabla<br>- Botón 'Contacto' abre formulario<br>- Usa `<button>`, `<a>` | 🔴 Alta | 3 | 1 | — | Interfaz y Controles |
| US-02 | 🖥️ Interfaz y Controles | Como jugador, quiero registrarme con un formulario que incluya nombre, email, avatar y fecha de nacimiento. | - Usa `<input text>`, `<input date>`, `<input file>` para avatar<br>- Validaciones en cliente<br>- Guarda en BD | 🔴 Alta | 5 | 1 | Usuarios | Interfaz y Controles / CRUD |
| US-03 | 🖥️ Interfaz y Controles | Como jugador, quiero un formulario de login con email y contraseña. | - Usa `<input text>`, `<input hidden>` para token<br>- Muestra errores claros<br>- Redirige al juego tras login | 🔴 Alta | 3 | 1 | Usuarios | Interfaz y Controles / CRUD |
| US-04 | 🖥️ Interfaz y Controles | Como jugador, quiero ver mi perfil y poder editar mis datos. | - Formulario con `<input text>`, `<input file>`<br>- Cambio de contraseña<br>- Botón guardar cambios | 🟡 Media | 3 | 2 | Usuarios | Interfaz y Controles / CRUD |
| US-05 | 🗺️ Navegación | Como jugador, quiero navegar entre el menú, el juego, puntuaciones, perfil y contacto. | - Mínimo 5 vistas distintas<br>- Menú de navegación visible<br>- URL/estado actualizado en cada vista | 🔴 Alta | 3 | 1 | — | Navegación entre vistas |
| US-06 | 🗺️ Navegación | Como jugador, quiero una vista de instrucciones antes de empezar. | - Explicación de mecánicas<br>- Botón volver al menú<br>- Botón empezar partida | 🟡 Media | 2 | 1 | — | Navegación entre vistas |
| US-07 | 🗺️ Navegación | Como jugador, quiero ver una pantalla de Game Over con mi puntuación final y opciones. | - Muestra puntuación de la partida<br>- Botón Reintentar<br>- Botón Volver al menú<br>- Botón Guardar puntuación | 🔴 Alta | 2 | 2 | Puntuaciones | Navegación entre vistas |
| US-08 | 🎮 Mecánica de Juego | Como jugador, quiero mover al personaje con el teclado (flechas / WASD). | - Detección de keydown/keyup<br>- Movimiento fluido<br>- El personaje no sale del mapa | 🔴 Alta | 5 | 1 | — | Eventos (Juegos/Interacción) |
| US-09 | 🎮 Mecánica de Juego | Como jugador, quiero que el personaje recoja alimentos haciendo clic o colisionando. | - Evento de ratón y colisión<br>- El alimento desaparece al recogerse<br>- Se muestra en inventario visual | 🔴 Alta | 5 | 1 | — | Eventos (Juegos/Interacción) |
| US-10 | 🎮 Mecánica de Juego | Como jugador, quiero lanzar/entregar comida a personas necesitadas arrastrando (Drag & Drop). | - Implementa drag & drop nativo o con eventos<br>- La persona acepta/rechaza según su pedido<br>- Suma/resta puntuación | 🔴 Alta | 8 | 2 | — | Eventos (Juegos/Interacción) |
| US-11 | 🎮 Mecánica de Juego | Como jugador, quiero que los obstáculos aparezcan y deba esquivarlos. | - Obstáculos con movimiento propio<br>- Colisión detectada correctamente<br>- Reduce vida/puntuación al chocar | 🔴 Alta | 5 | 2 | — | Eventos (Juegos/Interacción) |
| US-12 | 🎮 Mecánica de Juego | Como jugador, quiero que las personas necesitadas muestren su pedido de comida con un icono o bocadillo. | - Cada NPC tiene una necesidad aleatoria<br>- Se muestra visualmente<br>- Coincidencia correcta da más puntos | 🟡 Media | 3 | 2 | — | Eventos (Juegos/Interacción) |
| US-13 | 🎮 Mecánica de Juego | Como jugador, quiero un temporizador visible que limite la partida. | - Timer regresivo en pantalla<br>- Al llegar a 0 termina la partida<br>- Puede ampliarse con bonus | 🔴 Alta | 3 | 2 | — | Eventos (Juegos/Interacción) |
| US-14 | 🗄️ CRUD – Usuarios | Como admin, quiero poder listar todos los usuarios registrados. | - Vista con tabla de usuarios<br>- Columnas: nombre, email, fecha registro<br>- Paginación o scroll | 🔴 Alta | 3 | 2 | Usuarios | Operaciones CRUD |
| US-15 | 🗄️ CRUD – Usuarios | Como admin, quiero poder dar de baja a un usuario. | - Botón eliminar con confirmación<br>- Registro desaparece de la lista<br>- Acción registrada en BD | 🔴 Alta | 2 | 2 | Usuarios | Operaciones CRUD |
| US-16 | 🗄️ CRUD – Usuarios | Como admin, quiero buscar usuarios por nombre o email. | - Input de búsqueda con filtro en tiempo real<br>- Búsqueda avanzada (fecha, rango puntos)<br>- Resultados actualizados sin recargar | 🟡 Media | 3 | 3 | Usuarios | Operaciones CRUD |
| US-17 | 🗄️ CRUD – Puntuaciones | Como jugador, quiero guardar mi puntuación al finalizar la partida. | - Inserción en BD con usuario, puntos, fecha<br>- Confirmación visual al guardar<br>- Asociada al usuario autenticado | 🔴 Alta | 3 | 2 | Puntuaciones | Operaciones CRUD |
| US-18 | 🗄️ CRUD – Puntuaciones | Como jugador, quiero ver el ranking global de puntuaciones. | - Lista ordenada de mayor a menor<br>- Muestra usuario, puntos, fecha<br>- Resalta mi posición | 🔴 Alta | 3 | 2 | Puntuaciones | Operaciones CRUD |
| US-19 | 🗄️ CRUD – Puntuaciones | Como admin, quiero poder eliminar puntuaciones irregulares. | - Botón eliminar en tabla admin<br>- Confirmación obligatoria<br>- Cambio reflejado en ranking | 🟢 Baja | 2 | 3 | Puntuaciones | Operaciones CRUD |
| US-20 | 🗄️ CRUD – Contacto | Como usuario, quiero enviar sugerencias mediante un formulario de contacto. | - Campos: nombre, email, categoría (`<select>`), mensaje (`<textarea>`), urgente (`<radio>`), suscribirse (`<check>`)<br>- Validación completa<br>- Guardado en BD | 🔴 Alta | 4 | 2 | Formulario Contacto | Interfaz y Controles / CRUD |
| US-21 | 🗄️ CRUD – Contacto | Como admin, quiero ver, responder y eliminar los mensajes de contacto. | - Lista de mensajes con estado<br>- Baja de mensajes resueltos<br>- Búsqueda por categoría/fecha | 🟡 Media | 3 | 3 | Formulario Contacto | Operaciones CRUD |
| US-22 | 🌍 ODS & Concienciación | Como jugador, quiero ver mensajes educativos sobre el hambre y la pobreza entre niveles. | - Al menos 5 datos reales sobre ODS 2 y ODS 1<br>- Diseño atractivo con icono ODS<br>- Fuente citada | 🔴 Alta | 2 | 3 | — | Competencia Ciudadana (ODS) |
| US-23 | 🌍 ODS & Concienciación | Como jugador, quiero que la mecánica del juego refleje activamente el ODS 2 (Hambre Cero). | - Narrativa alineada con reducir el hambre<br>- Los NPC representan personas vulnerables reales<br>- Puntuación ligada a alimentar correctamente | 🔴 Alta | 3 | 2 | — | Competencia Ciudadana (ODS) |
| US-24 | 🌍 ODS & Concienciación | Como jugador, quiero ver un contador de 'personas alimentadas' global acumulado entre sesiones. | - Dato guardado en BD<br>- Visible en menú principal<br>- Refuerza impacto colectivo | 🟡 Media | 3 | 3 | Puntuaciones | Competencia Ciudadana (ODS) |
| US-25 | 🧹 Código Limpio | Como equipo, queremos estructurar el proyecto con MVC claro. | - Carpetas `model/`, `view/`, `controller/` definidas<br>- Sin lógica de negocio en la vista<br>- README con arquitectura documentada | 🔴 Alta | 3 | 1 | — | Código Limpio (Clean Code) |
| US-26 | 🧹 Código Limpio | Como equipo, queremos garantizar que no hay código duplicado (DRY). | - Funciones reutilizables para operaciones CRUD<br>- Helpers compartidos para validaciones<br>- Revisión en pull requests | 🔴 Alta | 2 | 2 | — | Código Limpio (Clean Code) |
| US-27 | 👥 Trabajo en Equipo | Como equipo, queremos usar ramas de Git por funcionalidad. | - Rama por cada historia de usuario<br>- Naming: `feature/US-XX-descripcion`<br>- PRs obligatorios antes de merge a main | 🔴 Alta | 2 | 1 | — | Trabajo en Equipo |
| US-28 | 👥 Trabajo en Equipo | Como equipo, queremos hacer code reviews antes de integrar cambios. | - Al menos 1 revisor por PR<br>- Checklist de revisión definido<br>- Merge solo si aprobado | 🔴 Alta | 2 | 1 | — | Trabajo en Equipo |

---

## 🗓️ Resumen por Sprint

| Sprint | Foco principal | Historias | Puntos |
|--------|----------------|-----------|--------|
| **Sprint 1** | Fundamentos: Auth, Menú, Movimiento, MVC, Git | US-01, 02, 03, 05, 06, 08, 09, 25, 27, 28 | 33 |
| **Sprint 2** | Núcleo del juego: Drag & Drop, CRUD base, ODS narrativa | US-04, 07, 10, 11, 12, 13, 14, 15, 17, 18, 20, 22, 23, 26 | 43 |
| **Sprint 3** | Pulido: búsqueda avanzada, ranking global, panel admin | US-16, 19, 21, 24 | 11 |

**Total: 87 puntos de historia**

---

## 🏷️ Leyenda

| Símbolo | Prioridad | Descripción |
|---------|-----------|-------------|
| 🔴 Alta | Must Have | Funcionalidad crítica del MVP |
| 🟡 Media | Should Have | Mejora importante pero no bloquea |
| 🟢 Baja | Nice to Have | Mejora futura |

---

## 🗂️ Entidades CRUD

### Usuarios
- **Inserción**: US-02 (Registro)
- **Listado**: US-14 (Lista admin)
- **Baja**: US-15 (Eliminar usuario)
- **Modificación**: US-04 (Editar perfil)
- **Búsqueda avanzada**: US-16 (Filtro por nombre/email/fecha)

### Puntuaciones
- **Inserción**: US-17 (Guardar puntuación)
- **Listado**: US-18 (Ranking global)
- **Baja**: US-19 (Eliminar irregulares)
- **Búsqueda/Filtro**: US-18 (ordenación), US-24 (acumulado global)

### Formulario de Contacto / Sugerencias
- **Inserción**: US-20 (Enviar sugerencia)
- **Listado**: US-21 (Ver mensajes admin)
- **Baja**: US-21 (Eliminar mensajes resueltos)
- **Búsqueda**: US-21 (Filtro por categoría/fecha)

---

## ✅ Cobertura de Rúbrica

| Criterio Rúbrica | Historias | Estado |
|------------------|-----------|--------|
| Interfaz y Controles | US-01, 02, 03, 04, 20 | ✅ Cubre input text, textarea, hidden, select, radio, check, button, a, file, date |
| Navegación entre vistas | US-05, 06, 07 | ✅ 6+ vistas con menú de navegación claro |
| Eventos (Juegos/Interacción) | US-08, 09, 10, 11, 12, 13 | ✅ Teclado, ratón y Drag & Drop |
| Operaciones CRUD | US-14–21 | ✅ Inserción, Listado, Baja, Modificación y Búsqueda avanzada |
| Competencia Ciudadana (ODS) | US-22, 23, 24 | ✅ ODS 2 integrado activamente en mecánica |
| Código Limpio (Clean Code) | US-25, 26 | ✅ MVC, DRY, nombres semánticos, comentarios |
| Trabajo en Equipo | US-27, 28 | ✅ Ramas por feature, PRs y code reviews |