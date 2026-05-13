/**
 * modelo-jugadores.js — Modelo de datos para la colección de jugadores
 * 
 * Gestiona el almacenamiento y recuperación de jugadores en memoria.
 * Implementa las operaciones CRUD a nivel de datos.
 * 
 * @author Alejandro, Carlos y Victor
 * @version 1.0.0
 */

/**
 * Modelo que gestiona una colección de jugadores
 * Utiliza un Set para almacenar jugadores de forma única
 */
export default class ModeloJugadores {
    /** @type {Set<Jugador>} Conjunto que almacena todos los jugadores */
    #jugadores;

    /**
     * Crea una nueva instancia del modelo de jugadores
     * Inicializa el almacenamiento vacío
     */
    constructor() {
        this.#jugadores = new Set();
    }

    /**
     * Añade un nuevo jugador al modelo
     * 
     * @param {Jugador} jugador - Jugador a agregar
     */
    agregarJugador(jugador) {
        this.#jugadores.add(jugador);
    }

    /**
     * Obtiene todos los jugadores como un array
     * 
     * @returns {Array<Jugador>} Lista de todos los jugadores
     */
    listar() {
        return Array.from(this.#jugadores);
    }

    /**
     * Busca un jugador por su ID
     * 
     * @param {string|number} id - ID del jugador a buscar
     * @returns {Jugador|undefined} Jugador encontrado o undefined
     */
    obtenerPorId(id) {
        return this.listar().find(jugador => jugador.getId() == id);
    }

    /**
     * Actualiza los datos de un jugador existente
     * 
     * @param {string|number} id - ID del jugador a actualizar
     * @param {string} nombre - Nuevo nombre
     * @param {number} age - Nueva edad
     * @param {string} email - Nuevo email
     * @param {string} password - Nueva contraseña
     * @returns {boolean} true si se actualizó, false si no existe el jugador
     */
    actualizar(id, nombre, age, email, password) {
        const jugadores = this.listar();
        const index = jugadores.findIndex(jugador => jugador.getId() == id);
        if (index !== -1) {
            jugadores[index].setNombre(nombre);
            jugadores[index].setEdad(age);
            jugadores[index].setEmail(email);
            jugadores[index].setPassword(password);
            this.#jugadores = new Set(jugadores);
            return true;
        }
        return false;
    }

    /**
     * Elimina un jugador del modelo
     * 
     * @param {string|number} id - ID del jugador a eliminar
     * @returns {boolean} true siempre
     */
    eliminar(id) {
        const jugadores = this.listar();
        const jugadoresFiltrados = jugadores.filter(jugador => jugador.getId() != id);
        this.#jugadores = new Set(jugadoresFiltrados);
        return true;
    }
}