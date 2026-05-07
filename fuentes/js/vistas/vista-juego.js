/**
 * vista-juego-dragdrop.js — Mecánica de juego con Drag & Drop
 *   dragstart → guarda el id del alimento
 *   dragover  → previene el default para permitir drop
 *   drop      → comprueba si el alimento coincide con el pedido
 *
 * El HTML vive en index.html (vista #juego + templates).
 * Este archivo solo obtiene referencias, clona templates y añade eventos.
 */

export default class VistaJuegoDragDrop {

    // ─── Referencias DOM ──────────────────────────
    #zonaAlimentos;       // #zona-alimentos
    #zonaPersonas;        // #zona-personas
    #panelGameOver;       // #gameover-panel
    #templateAlimento;    // <template id="template-alimento">
    #templatePersona;     // <template id="template-persona">

    // ─── Callbacks hacia el controlador ──────────
    #onEntrega;           // (idAlimento, idPersona, correcto) => void
    #onTiempoAgotado;     // (puntuacion) => void
    #onSolicitarNombre;   // (callback) => void para pedir nombre al jugador

    // ─── Estado local de UI ───────────────────────
    #intervaloTimer;
    #tiempoRestante;
    #puntuacion;
    #pausado = false;
    #alimentosDisponibles;  // Catálogo de alimentos
    #personasDisponibles;   // Catálogo de personas para regenerar

    constructor() {
        this.#tiempoRestante  = 60;
        this.#puntuacion      = 0;
        this.#onEntrega       = null;
        this.#onTiempoAgotado = null;
        this.#alimentosDisponibles = [];
        this.#personasDisponibles = [];
        this.#obtenerReferenciasIU();
        this.#configurarBotonesFijos();
    }

    // ─────────────────────────────────────────────
    //  REFERENCIAS AL DOM  (mismo patrón que el resto del proyecto)
    // ─────────────────────────────────────────────
    #obtenerReferenciasIU() {
        this.#zonaAlimentos    = document.querySelector('#zona-alimentos');
        this.#zonaPersonas     = document.querySelector('#zona-personas');
        this.#panelGameOver    = document.querySelector('#gameover-panel');
        this.#templateAlimento = document.querySelector('#template-alimento');
        this.#templatePersona  = document.querySelector('#template-persona');
    }

    // ─────────────────────────────────────────────
    //  BOTONES fijos del HTML (pausa, reiniciar...)
    // ─────────────────────────────────────────────
    #configurarBotonesFijos() {
        document.querySelector('#btn-pausa-juego')
            ?.addEventListener('click', () => this.#alternarPausa());
    }

    // ─────────────────────────────────────────────
    //  REGISTRAR CALLBACKS (los conecta el controlador)
    // ─────────────────────────────────────────────
    onEntrega(callback)           { this.#onEntrega = callback; }
    onTiempoAgotado(callback)     { this.#onTiempoAgotado = callback; }
    onSolicitarNombre(callback)   { this.#onSolicitarNombre = callback; }

    // ─────────────────────────────────────────────
    //  INICIAR — rellena las zonas y arranca el timer
    // ─────────────────────────────────────────────
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

    // ─────────────────────────────────────────────
    //  RENDERIZAR ALIMENTOS
    //  Clona el <template id="template-alimento"> del HTML
    //  y rellena los datos — sin escribir HTML aquí
    // ─────────────────────────────────────────────
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

    // ─────────────────────────────────────────────
    //  RENDERIZAR PERSONAS
    //  Clona el <template id="template-persona"> del HTML
    // ─────────────────────────────────────────────
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

    // ─────────────────────────────────────────────
    //  REGENERAR ALIMENTOS — restaurar todos los alimentos
    // ─────────────────────────────────────────────
    #regenerarAlimentos() {
        this.#renderizarAlimentos(this.#alimentosDisponibles);
    }

    // ─────────────────────────────────────────────
    //  REGENERAR PERSONAS — crear nuevas con pedidos aleatorios VARIADOS
    // ─────────────────────────────────────────────
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


    //  Patrón idéntico al del profesor: dragover → dragleave → drop
    // ─────────────────────────────────────────────
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

    // ─────────────────────────────────────────────
    //  ANIMACIONES de feedback
    // ─────────────────────────────────────────────
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

    #animarEntregaFallida(dropzone, elemAlimento) {
        dropzone.classList.add('error-shake');
        setTimeout(() => dropzone.classList.remove('error-shake'), 500);

        elemAlimento.classList.add('error-flash');
        setTimeout(() => elemAlimento.classList.remove('error-flash'), 500);

        this.#puntuacion = Math.max(0, this.#puntuacion - 10);
        this.#actualizarHUD();
    }

    // ─────────────────────────────────────────────
    //  HUD — actualizar puntos y tiempo
    // ─────────────────────────────────────────────
    #actualizarHUD() {
        const elPuntos = document.querySelector('#hud-puntos');
        const elTiempo = document.querySelector('#hud-tiempo');

        if (elPuntos) elPuntos.textContent = `PTS: ${this.#puntuacion}`;
        if (elTiempo) {
            elTiempo.textContent = `⏱ ${this.#tiempoRestante}s`;
            elTiempo.classList.toggle('tiempo-critico', this.#tiempoRestante <= 10);
        }
    }

    // ─────────────────────────────────────────────
    //  TEMPORIZADOR
    // ─────────────────────────────────────────────
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

    #alternarPausa() {
        this.#pausado = !this.#pausado;
        const btn = document.querySelector('#btn-pausa-juego');
        if (btn) btn.textContent = this.#pausado ? '[ CONTINUAR ]' : '[ PAUSA ]';
    }

    detener() { clearInterval(this.#intervaloTimer); }

    // ─────────────────────────────────────────────
    //  GAME OVER — muestra el panel que ya existe en el HTML
    //  Solo actualiza los datos dinámicos (puntuación y personas)
    // ─────────────────────────────────────────────
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

    // ─────────────────────────────────────────────
    //  API pública
    // ─────────────────────────────────────────────
    agregarAlimento(alimento) {
        this.#renderizarAlimentos([alimento]);
        this.#configurarDropzones();
    }

    agregarPersona(persona) {
        this.#renderizarPersonas([persona]);
        this.#configurarDropzones();
    }

    getPuntuacion() { return this.#puntuacion; }
}