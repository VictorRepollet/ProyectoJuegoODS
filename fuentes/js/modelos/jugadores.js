/**
 * jugadores.js — Modelo de datos para un jugador individual
 * 
 * Representa a un jugador con su información personal.
 * Cada jugador tiene un ID único generado automáticamente.
 * 
 * @author Alejandro, Carlos y Victor
 * @version 1.0.0
 */

/**
 * Clase que representa un jugador del juego
 * Contiene información personal y proporciona getters/setters para acceso
 */
export default class Jugador {
    /** @type {number} Contador estático para generar IDs únicos */
    static ultimoId = 0;

    /** @type {number} ID único del jugador */
    #id;
    
    /** @type {string} Nombre del jugador */
    #nombre;
    
    /** @type {number} Edad del jugador */
    #age;
    
    /** @type {string} Email del jugador */
    #email;
    
    /** @type {string} Contraseña del jugador (encriptada en producción) */
    #password;

    /**
     * Crea una nueva instancia de jugador
     * Asigna automáticamente un ID único
     * 
     * @param {string} nombre - Nombre del jugador
     * @param {number} age - Edad del jugador
     * @param {string} email - Email del jugador
     * @param {string} password - Contraseña del jugador
     */
    constructor(nombre, age, email, password) {
        this.#id = ++Jugador.ultimoId;
        this.#nombre = nombre;
        this.#age = age;
        this.#email = email;
        this.#password = password;
    }

    /**
     * Obtiene el ID único del jugador
     * @returns {number} ID del jugador
     */
    getId() {
        return this.#id;
    }

    /**
     * Obtiene el nombre del jugador
     * @returns {string} Nombre del jugador
     */
    getNombre() {
        return this.#nombre;
    }

    /**
     * Obtiene la edad del jugador
     * @returns {number} Edad del jugador
     */
    getEdad() {
        return this.#age;
    }

    /**
     * Obtiene el email del jugador
     * @returns {string} Email del jugador
     */
    getEmail() {
        return this.#email;
    }

    /**
     * Obtiene la contraseña del jugador
     * @returns {string} Contraseña del jugador
     */
    getPassword() {
        return this.#password;
    }

    /**
     * Establece un nuevo nombre para el jugador
     * @param {string} nombre - Nuevo nombre
     */
    setNombre(nombre) {
        this.#nombre = nombre;
    }

    /**
     * Establece una nueva edad para el jugador
     * @param {number} age - Nueva edad
     */
    setEdad(age) {
        this.#age= age;
    }

    /**
     * Establece un nuevo email para el jugador
     * @param {string} email - Nuevo email
     */
    setEmail(email) {
        this.#email = email;
    }

    /**
     * Establece una nueva contraseña para el jugador
     * @param {string} password - Nueva contraseña
     */
    setPassword(password) {
        this.#password = password;
    }
}