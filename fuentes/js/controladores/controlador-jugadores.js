/**
 * controlador-jugadores.js — Controlador de gestión de jugadores
 * 
 * Maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de jugadores.
 * Conecta la interfaz de usuario con el modelo de datos de jugadores.
 * Incluye búsqueda, filtrado y renderizado dinámico de tabla.
 * 
 * @author Alejandro, Carlos y Victor
 * @version 1.0.0
 */

import Jugador from '../modelos/jugadores.js';
import ModeloJugadores from '../modelos/modelo-jugadores.js';

/**
 * Controlador principal para la gestión de jugadores
 * Implementa la lógica CRUD y la interfaz de usuario
 */
export default class ControladorJugadores {
    /** @type {ModeloJugadores} Instancia del modelo de datos de jugadores */
    #modeloJugadores;

    // ────────────────────────── Referencias del formulario de registro
    /** @type {HTMLInputElement} Campo de nombre en el formulario de registro */
    #nombre;
    
    /** @type {HTMLInputElement} Campo de edad en el formulario de registro */
    #age;
    
    /** @type {HTMLInputElement} Campo de email en el formulario de registro */
    #email;
    
    /** @type {HTMLInputElement} Campo de contraseña en el formulario de registro */
    #password;

    // ────────────────────────── Referencias del formulario de edición
    /** @type {HTMLInputElement} Campo de nombre en el formulario de edición */
    #editarNombre;
    
    /** @type {HTMLInputElement} Campo de edad en el formulario de edición */
    #editarEdad;
    
    /** @type {HTMLInputElement} Campo de email en el formulario de edición */
    #editarEmail;
    
    /** @type {HTMLInputElement} Campo de contraseña en el formulario de edición */
    #editarPassword;
    
    /** @type {HTMLInputElement} Campo oculto con el ID del jugador a editar */
    #editarPlayerId;

    // ────────────────────────── Elementos de botones
    /** @type {HTMLButtonElement} Botón para registrar nuevo jugador */
    #btnRegistro;
    
    /** @type {HTMLButtonElement} Botón para guardar cambios del jugador */
    #btnGuardar;
    
    /** @type {HTMLButtonElement} Botón para eliminar jugador */
    #btnEliminar;

    // ────────────────────────── Elementos de formularios
    /** @type {HTMLFormElement} Formulario de registro de jugadores */
    #formRegistro;
    
    /** @type {HTMLFormElement} Formulario de edición de jugadores */
    #formEditar;

    // ────────────────────────── Elementos de la tabla de jugadores
    /** @type {HTMLSelectElement} Select para filtrar por nombre o email */
    #filtroJugadores;
    
    /** @type {HTMLInputElement} Campo de búsqueda de jugadores */
    #campoBusqueda;
    
    /** @type {HTMLTableSectionElement} Cuerpo de la tabla de jugadores */
    #tablaJugadores;
    
    /** @type {HTMLElement} Elemento para mostrar cuando no hay jugadores */
    #mensajeVacio;

    /**
     * Crea una nueva instancia del controlador de jugadores
     * Inicializa el modelo, obtiene referencias del DOM y configura eventos
     */
    constructor() {
        this.#modeloJugadores = new ModeloJugadores();
        this.#obtenerReferenciasIU();
        this.#configurarEventos();
    }

    /**
     * Obtiene referencias a todos los elementos del DOM necesarios
     * Se ejecuta una sola vez en el constructor
     * @private
     */
    #obtenerReferenciasIU() {
        // Formulario registro
        this.#nombre = document.querySelector('#nombre');
        this.#age   = document.querySelector('#age');
        this.#email  = document.querySelector('#email');
        this.#password = document.querySelector('#password');

        // Formulario editar
        this.#editarNombre   = document.querySelector('#editar-nombre');
        this.#editarEdad     = document.querySelector('#editar-edad');
        this.#editarEmail    = document.querySelector('#editar-email');
        this.#editarPassword = document.querySelector('#editar-password');
        this.#editarPlayerId = document.querySelector('#editar-player-id');

        // Botones
        this.#btnRegistro = document.querySelector('#btn-crear');
        this.#btnGuardar  = document.querySelector('#btn-guardar');
        this.#btnEliminar = document.querySelector('#btn-eliminar');

        // Formularios
        this.#formRegistro = document.querySelector('#form-registro');
        this.#formEditar   = document.querySelector('#form-editar');

        // Tabla y filtros
        this.#filtroJugadores = document.querySelector('#filtro-jugadores');
        this.#campoBusqueda   = document.querySelector('#busqueda-jugadores');
        this.#tablaJugadores  = document.querySelector('#tabla-jugadores tbody');
        this.#mensajeVacio    = document.querySelector('#mensaje-vacio-jugadores');
    }

    /**
     * Configura todos los event listeners para los botones y campos
     * Conecta la interfaz con los métodos de lógica de la aplicación
     * @private
     */
    #configurarEventos() {
        this.#btnRegistro.addEventListener('click', () => this.registrarJugador());
        this.#btnGuardar.addEventListener('click',  () => this.editarJugador());
        this.#btnEliminar.addEventListener('click', () => this.eliminarJugador());

        // Filtro por tipo (nombre/email) — actualiza tabla al cambiar
        this.#filtroJugadores.addEventListener('change', () => this.mostrarJugadores());

        // Búsqueda en tiempo real
        if (this.#campoBusqueda) {
            this.#campoBusqueda.addEventListener('input', () => this.mostrarJugadores());
        }
    }

    /**
     * Crea y registra un nuevo jugador en el sistema
     * Valida los datos antes de guardar
     * 
     * @public
     */
    registrarJugador() {
        const nombre   = this.#nombre.value.trim();
        const age     = this.#age.value.trim();
        const email    = this.#email.value.trim();
        const password = this.#password.value.trim();

        // Validación básica
        if (!nombre || !age || !email || !password) {
            alert(' Por favor, rellena todos los campos.');
            return;
        }

        if (isNaN(age) || age < 1 || age > 120) {
            alert(' La edad debe estar entre 1 y 120.');
            return;
        }

        const jugador = new Jugador(nombre, age, email, password);
        this.#modeloJugadores.agregarJugador(jugador);

        alert(` Jugador "${nombre}" registrado con éxito.`);
        this.#formRegistro.reset();
        this.mostrarJugadores();
    }

    /**
     * Actualiza los datos de un jugador existente
     * Valida los datos antes de guardar
     * 
     * @public
     */
    editarJugador() {
        const id       = this.#editarPlayerId.value;
        const nombre   = this.#editarNombre.value.trim();
        const age     = this.#editarEdad.value.trim();
        const email    = this.#editarEmail.value.trim();
        const password = this.#editarPassword.value.trim();

        if (!id) {
            alert(' No hay ningún jugador seleccionado para editar.');
            return;
        }

        if (!nombre || !age || !email) {
            alert(' Nombre, edad y email son obligatorios.');
            return;
        }

        const actualizado = this.#modeloJugadores.actualizar(id, nombre, age, email, password);

        if (actualizado) {
            alert(`Jugador "${nombre}" actualizado con éxito.`);
            this.#formEditar.reset();
            this.mostrarJugadores();
        } else {
            alert('No se encontró el jugador a actualizar.');
        }
    }

    /**
     * Elimina un jugador del sistema con confirmación del usuario
     * 
     * @public
     */
    eliminarJugador() {
        const id = this.#editarPlayerId.value;

        if (!id) {
            alert('No hay ningún jugador seleccionado para eliminar.');
            return;
        }

        const jugador = this.#modeloJugadores.obtenerPorId(id);
        const nombre  = jugador ? jugador.getNombre() : 'este jugador';

        const confirmar = confirm(`¿Estás seguro de que quieres eliminar a "${nombre}"?`);
        if (!confirmar) return;

        this.#modeloJugadores.eliminar(id);
        alert(`Jugador "${nombre}" eliminado correctamente.`);
        this.#formEditar.reset();
        this.mostrarJugadores();
    }

    /**
     * Carga los datos de un jugador en el formulario de edición
     * 
     * @param {string|number} id - ID único del jugador a cargar
     * @public
     */
    cargarDatosEnFormularioEditar(id) {
        const jugador = this.#modeloJugadores.obtenerPorId(id);
        if (!jugador) {
            alert('Jugador no encontrado.');
            return;
        }

        this.#editarNombre.value   = jugador.getNombre();
        this.#editarEdad.value     = jugador.getEdad();
        this.#editarEmail.value    = jugador.getEmail();
        this.#editarPassword.value = '';          // Para que la contraseña no se muestre
        this.#editarPlayerId.value = jugador.getId();
    }

    /**
     * Obtiene el texto de búsqueda y filtro activos
     * Renderiza la tabla con los jugadores resultantes
     * 
     * @public
     */
    mostrarJugadores() {
        const textoBusqueda = this.#campoBusqueda ? this.#campoBusqueda.value.trim() : '';
        const tipofiltro    = this.#filtroJugadores.value;
        const jugadores     = this.filtrarJugadores(textoBusqueda, tipofiltro);
        this.#renderizarTablaJugadores(jugadores);
    }

    /**
     * Filtra y ordena jugadores según el texto de búsqueda y tipo de filtro
     * 
     * @param {string} texto - Texto a buscar en los jugadores
     * @param {string} tipofiltro - Tipo de búsqueda: 'nombre' o 'email'
     * @returns {Array<Jugador>} Lista de jugadores filtrados y ordenados
     * @public
     */
    filtrarJugadores(texto, tipofiltro) {
        let jugadores = this.#modeloJugadores.listar();

        // Filtrar por texto si hay búsqueda
        if (texto) {
            jugadores = jugadores.filter(jugador => {
                const valor = tipofiltro === 'nombre'
                    ? jugador.getNombre().toLowerCase()
                    : jugador.getEmail().toLowerCase();
                return valor.includes(texto.toLowerCase());
            });
        }

        // Ordenar alfabéticamente por el campo seleccionado
        return jugadores.sort((a, b) => {
            const valorA = tipofiltro === 'nombre'
                ? a.getNombre().toLowerCase()
                : a.getEmail().toLowerCase();
            const valorB = tipofiltro === 'nombre'
                ? b.getNombre().toLowerCase()
                : b.getEmail().toLowerCase();
            if (valorA < valorB) return -1;
            if (valorA > valorB) return 1;
            return 0;
        });
    }

    /**
     * Renderiza la tabla HTML con la lista de jugadores
     * Agrega botones de editar y eliminar con event listeners
     * 
     * @param {Array<Jugador>} jugadores - Lista de jugadores a mostrar
     * @private
     */
    #renderizarTablaJugadores(jugadores) {
        this.#tablaJugadores.innerHTML = '';

        // Mensaje si no hay resultados
        if (this.#mensajeVacio) {
            this.#mensajeVacio.style.display = jugadores.length === 0 ? 'block' : 'none';
        }

        jugadores.forEach(jugador => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${jugador.getNombre()}</td>
                <td>${jugador.getEmail()}</td>
            `;
            this.#tablaJugadores.appendChild(fila);
        });
    }
}   
