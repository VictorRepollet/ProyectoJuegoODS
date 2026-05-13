/**
 * vista-juego.js — Vista del juego Drag & Drop
 * 
 * Gestiona la presentación de alimentos y personas, temporizador y puntuación.
 * Maneja eventos de arrastre y validación de entregas correctas/incorrectas.
 * 
 * El HTML se define en index.html usando templates (#template-alimento y #template-persona).
 * Esta clase solo obtiene referencias, clona templates y agrega eventos dinámicos.
 * 
 * @author Alejandro, Carlos y Victor
 * @version 1.0.0
 */

/**
 * Vista principal del juego 
 * Gestiona UI, entrada del usuario, temporizador y puntuación
 */
export default class VistaJuegoDragDrop {

    // ────────────────────────────── Referencias DOM
    /** @type {HTMLElement} Contenedor donde se renderizarán los alimentos arrastrables */
    #zonaAlimentos;
    
    /** @type {HTMLElement} Contenedor donde se renderizarán las personas (dropzones) */
    #zonaPersonas;
    
    /** @type {HTMLElement} Panel que se muestra cuando termina el juego */
    #panelGameOver;
    
    /** @type {HTMLTemplateElement} Template HTML para clonar elementos de alimento */
    #templateAlimento;
    
    /** @type {HTMLTemplateElement} Template HTML para clonar elementos de persona */
    #templatePersona;

    // ────────────────────────────── Callbacks hacia el controlador
    /** @type {Function} Callback que se ejecuta cuando hay una entrega (correcta o incorrecta) */
    #onEntrega;
    
    /** @type {Function} Callback que se ejecuta cuando se agota el tiempo */
    #onTiempoAgotado;
    
    /** @type {Function} Callback para solicitar el nombre del jugador al terminar */
    #onSolicitarNombre;

    // ────────────────────────────── Estado local de la UI
    /** @type {number} Intervalo del temporizador */
    #intervaloTimer;
    
    /** @type {number} Tiempo restante en segundos */
    #tiempoRestante;
    
    /** @type {number} Puntuación acumulada en la partida */
    #puntuacion;
    
    /** @type {boolean} Indica si el juego está pausado */
    #pausado;
    
    /** @type {Array} Catálogo de alimentos disponibles para regeneración */
    #alimentosDisponibles;
    
    /** @type {Array} Catálogo de personas disponibles para regeneración */
    #personasDisponibles;

    /**
     * Crea una nueva instancia de la vista del juego
     * Inicializa variables, obtiene referencias del DOM y configura botones
     */
    constructor() {
        this.#tiempoRestante  = 60;
        this.#puntuacion      = 0;
        this.#pausado         = false;
        this.#onEntrega       = null;
        this.#onTiempoAgotado = null;
        this.#alimentosDisponibles = [];
        this.#personasDisponibles = [];
        this.#obtenerReferenciasIU();
        this.#configurarBotonesFijos();
    }

    /**
     * Obtiene referencias a todos los elementos del DOM necesarios para el juego
     * Sigue el mismo patrón que el resto del proyecto
     * @private
     */
    #obtenerReferenciasIU() {
        this.#zonaAlimentos    = document.querySelector('#zona-alimentos');
        this.#zonaPersonas     = document.querySelector('#zona-personas');
        this.#panelGameOver    = document.querySelector('#gameover-panel');
        this.#templateAlimento = document.querySelector('#template-alimento');
        this.#templatePersona  = document.querySelector('#template-persona');
    }

    /**
     * Configura los event listeners de los botones fijos del HTML
     * Estos botones están presentes en el HTML, no se generan dinámicamente
     * @private
     */
    #configurarBotonesFijos() {
        document.querySelector('#btn-pausa-juego')
            ?.addEventListener('click', () => this.#alternarPausa());
    }

    /**
     * Registra un callback que se ejecutará cuando haya una entrega
     * @param {Function} callback - Función que recibe (idAlimento, idPersona, correcto)
     */
    onEntrega(callback)           { this.#onEntrega = callback; }
    
    /**
     * Registra un callback que se ejecutará cuando se agote el tiempo
     * @param {Function} callback - Función que recibe los datos finales del juego
     */
    onTiempoAgotado(callback)     { this.#onTiempoAgotado = callback; }
    
    /**
     * Registra un callback para solicitar el nombre del jugador
     * @param {Function} callback - Función para pedir nombre al jugador
     */
    onSolicitarNombre(callback)   { this.#onSolicitarNombre = callback; }

    /**
     * Inicia una nueva partida de juego
     * Renderiza alimentos y personas, configura dropzones y arranca el temporizador
     * 
     * @param {Array} alimentos - Lista de alimentos disponibles
     * @param {Array} personas - Lista de personas que piden alimentos
     * @param {number} [tiempo=60] - Tiempo en segundos para la partida
     * @public
     */
    iniciar(alimentos, personas, tiempo = 60) {
        this.#tiempoRestante = tiempo;
        this.#puntuacion     = 0;
        this.#pausado        = false;

        // Guardar catálogos para regeneración
        this.#alimentosDisponibles = alimentos;
        this.#personasDisponibles = personas;

        // Ocultar game over por si venimos de una partida anterior
        this.#panelGameOver.style.display = 'none';

        this.#renderizarAlimentos(alimentos);
        this.#renderizarPersonas(personas);
        this.#configurarDropzones();
        this.#arrancarTemporizador();
        this.#actualizarHUD();
    }

    /**
     * Renderiza los alimentos en la zona de alimentos
     * Clona el template HTML y crea elementos arrastrables dinámicamente
     * Asigna eventos dragstart y dragend a cada alimento
     * 
     * @param {Array} alimentos - Lista de alimentos a renderizar
     * @private
     */
    #renderizarAlimentos(alimentos) {
        this.#zonaAlimentos.innerHTML = '';

        alimentos.forEach(alimento => {
            // Clonar el template definido en index.html
            const clone = this.#templateAlimento.content.cloneNode(true);
            const div   = clone.querySelector('.alimento-draggable');

            // Rellenar datos
            div.setAttribute('id',        `alimento-${alimento.id}`);
            div.setAttribute('data-tipo', alimento.tipo);
            div.querySelector('.alimento-emoji').textContent  = alimento.tipo;
            div.querySelector('.alimento-nombre').textContent = alimento.nombre;

            // ── dragstart: guardar id (igual que el profesor) ──
            div.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', div.id);
                e.target.style.opacity = '0.4';
                div.classList.add('arrastrando');
            });

            // ── dragend: restaurar opacidad ──
            div.addEventListener('dragend', (e) => {
                e.target.style.opacity = '1';
                div.classList.remove('arrastrando');
            });

            this.#zonaAlimentos.appendChild(div);
        });
    }

    /**
     * Renderiza las personas en la zona de personas
     * Clona el template HTML y crea dropzones dinámicamente
     * Cada persona muestra su pedido (emoji del alimento que desea)
     * 
     * @param {Array} personas - Lista de personas a renderizar
     * @private
     */
    #renderizarPersonas(personas) {
        this.#zonaPersonas.innerHTML = '';

        personas.forEach(persona => {
            // Clonar el template definido en index.html
            const clone = this.#templatePersona.content.cloneNode(true);
            const div   = clone.querySelector('.persona-dropzone');

            // Rellenar datos
            div.setAttribute('id',          `persona-${persona.id}`);
            div.setAttribute('data-pedido', persona.pedido);
            div.querySelector('.bocadillo-pedido').textContent = persona.pedido;
            div.querySelector('.persona-nombre').textContent   = persona.nombre;

            this.#zonaPersonas.appendChild(div);
        });
    }

    /**
     * Regenera todos los alimentos cuando se agotan
     * Vuelve a renderizar los alimentos del catálogo original
     * @private
     */
    #regenerarAlimentos() {
        this.#renderizarAlimentos(this.#alimentosDisponibles);
    }

    /**
     * Regenera las personas con pedidos aleatorios variados
     * Asegura que no haya repeticiones de pedidos
     * Se ejecuta cuando todas las personas han sido alimentadas
     * @private
     */
    #regenerarPersonas() {
        // Obtener todos los tipos de alimentos disponibles
        const tiposAlimentos = this.#alimentosDisponibles.map(a => a.tipo);
        
        // Mezclar los tipos de alimentos
        const tiposBarajados = [...tiposAlimentos].sort(() => Math.random() - 0.5);
        
        // Asignar pedidos variados a cada persona
        const personasReencontradas = this.#personasDisponibles.map((p, idx) => ({
            ...p,
            id: `per-${idx}-${Date.now()}`,
            pedido: tiposBarajados[idx % tiposBarajados.length]  // Distribuir sin repetir
        }));
        
        this.#renderizarPersonas(personasReencontradas);
        this.#configurarDropzones();
    }


    /**
     * Configura los eventos Drag & Drop en las dropzones (personas)
     * Implementa dragover, dragleave y drop para validar entregas
     * Patrón: dragover → dragleave → drop
     * @private
     */
    #configurarDropzones() {
        const dropzones = document.querySelectorAll('.persona-dropzone');

        dropzones.forEach(dropzone => {

            // dragover: prevenir default para permitir drop (igual que el profesor)
            dropzone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropzone.classList.add('highlight');
            });

            // dragleave: quitar highlight
            dropzone.addEventListener('dragleave', () => {
                dropzone.classList.remove('highlight');
            });

            // drop: comprobar si el alimento coincide con el pedido
            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzone.classList.remove('highlight');

                const idAlimento   = e.dataTransfer.getData('text/plain');
                const elemAlimento = document.getElementById(idAlimento);
                if (!elemAlimento) return;

                const tipoArrastrado = elemAlimento.getAttribute('data-tipo');
                const tipoPedido     = dropzone.getAttribute('data-pedido');
                const correcto       = tipoArrastrado === tipoPedido;

                if (correcto) {
                    this.#animarEntregaCorrecta(dropzone, elemAlimento);
                } else {
                    this.#animarEntregaFallida(dropzone, elemAlimento);
                }

                if (this.#onEntrega) {
                    this.#onEntrega(idAlimento, dropzone.id, correcto);
                }
            });
        });
    }

    /**
     * Anima una entrega correcta
     * Muestra feedback visual positivo, suma puntos y regenera si es necesario
     * 
     * @param {HTMLElement} dropzone - Elemento de la persona que recibe el alimento
     * @param {HTMLElement} elemAlimento - Elemento del alimento arrastrado
     * @private
     */
    #animarEntregaCorrecta(dropzone, elemAlimento) {
        dropzone.classList.add('satisfecha');
        dropzone.querySelector('.persona-bocadillo').style.display = 'none';

        // Texto +100 flotante (único elemento creado aquí, es efímero)
        const feedback = document.createElement('div');
        feedback.classList.add('feedback-puntos');
        feedback.textContent = '+100';
        dropzone.appendChild(feedback);
        setTimeout(() => feedback.remove(), 1200);

        // ── ALIMENTO: Feedback visual SIN eliminarlo ──
        elemAlimento.style.opacity = '0.3';
        setTimeout(() => {
            elemAlimento.style.opacity = '1';
        }, 600);

        this.#puntuacion += 100;
        this.#actualizarHUD();

        // ── BUCLE: Chequear si quedan personas sin alimentar ──
        setTimeout(() => {
            const personasActivas = document.querySelectorAll(
                '.persona-dropzone:not(.satisfecha)'
            );
            
            // Si no hay más personas, regenerar AMBAS (alimentos y personas)
            if (personasActivas.length === 0) {
                this.#regenerarAlimentos();
                this.#regenerarPersonas();
            }
        }, 500);
    }

    /**
     * Anima una entrega fallida
     * Muestra feedback visual negativo y resta puntos
     * 
     * @param {HTMLElement} dropzone - Elemento de la persona que rechaza el alimento
     * @param {HTMLElement} elemAlimento - Elemento del alimento arrastrado
     * @private
     */
    #animarEntregaFallida(dropzone, elemAlimento) {
        dropzone.classList.add('error-shake');
        setTimeout(() => dropzone.classList.remove('error-shake'), 500);

        elemAlimento.classList.add('error-flash');
        setTimeout(() => elemAlimento.classList.remove('error-flash'), 500);

        this.#puntuacion = Math.max(0, this.#puntuacion - 10);
        this.#actualizarHUD();
    }

    /**
     * Actualiza el HUD (pantalla de información) con puntos y tiempo
     * Cambia el color del tiempo cuando entra en zona crítica (<= 10s)
     * @private
     */
    #actualizarHUD() {
        const elPuntos = document.querySelector('#hud-puntos');
        const elTiempo = document.querySelector('#hud-tiempo');

        if (elPuntos) elPuntos.textContent = `PTS: ${this.#puntuacion}`;
        if (elTiempo) {
            elTiempo.textContent = `⏱ ${this.#tiempoRestante}s`;
            elTiempo.classList.toggle('tiempo-critico', this.#tiempoRestante <= 10);
        }
    }

    /**
     * Inicia el temporizador que decuenta el tiempo
     * Decrementa cada segundo y muestra Game Over cuando llega a 0
     * @private
     */
    #arrancarTemporizador() {
        this.#intervaloTimer = setInterval(() => {
            if (this.#pausado) return;
            this.#tiempoRestante--;
            this.#actualizarHUD();
            if (this.#tiempoRestante <= 0) {
                clearInterval(this.#intervaloTimer);
                this.#mostrarGameOver();
            }
        }, 1000);
    }

    /**
     * Alterna el estado de pausa del juego
     * Cambia el texto del botón y pausa el temporizador
     * @private
     */
    #alternarPausa() {
        this.#pausado = !this.#pausado;
        const btn = document.querySelector('#btn-pausa-juego');
        if (btn) btn.textContent = this.#pausado ? '[ CONTINUAR ]' : '[ PAUSA ]';
    }

    /**
     * Detiene el temporizador inmediatamente
     * @public
     */
    detener() { clearInterval(this.#intervaloTimer); }

    /**
     * Muestra el panel de Game Over al terminar el tiempo
     * Actualiza puntuación y número de personas alimentadas
     * Solicita el nombre del jugador para guardar la puntuación
     * @private
     */
    #mostrarGameOver() {
        const entregados = document.querySelectorAll('.persona-dropzone.satisfecha').length;

        document.querySelector('#gameover-puntuacion').textContent =
            `PUNTUACIÓN: ${this.#puntuacion}`;
        document.querySelector('#gameover-entregados').textContent =
            `🍽 ${entregados} PERSONAS ALIMENTADAS`;

        this.#panelGameOver.style.display = 'flex';

        // ── Pedir nombre del jugador ──
        const nombre = prompt('🏆 GAME OVER\n\n¿Cuál es tu nombre?\n\n(Para guardar tu puntuación)');
        
        if (nombre && nombre.trim()) {
            // Notificar al controlador con nombre y puntuación
            if (this.#onTiempoAgotado) {
                this.#onTiempoAgotado({ 
                    puntuacion: this.#puntuacion, 
                    nombre: nombre.trim(),
                    entregados: entregados
                });
            }
        }
    }

    /**
     * Agrega un alimento individual a la zona de alimentos
     * Útil para agregar elementos dinámicamente durante el juego
     * 
     * @param {Object} alimento - Alimento a agregar
     * @public
     */
    agregarAlimento(alimento) {
        this.#renderizarAlimentos([alimento]);
        this.#configurarDropzones();
    }

    /**
     * Agrega una persona individual a la zona de personas
     * Útil para agregar elementos dinámicamente durante el juego
     * 
     * @param {Object} persona - Persona a agregar
     * @public
     */
    agregarPersona(persona) {
        this.#renderizarPersonas([persona]);
        this.#configurarDropzones();
    }

    /**
     * Obtiene la puntuación actual del jugador
     * 
     * @returns {number} Puntuación acumulada
     * @public
     */
    getPuntuacion() { return this.#puntuacion; }
}