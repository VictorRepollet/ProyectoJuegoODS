/**
 * modelo-puntuaciones.js — Modelo de datos para puntuaciones
 * 
 * Almacena y gestiona las puntuaciones obtenidas por los jugadores.
 * Proporciona métodos para guardar y recuperar puntuaciones ordenadas.
 * 
 * @author Alejandro, Carlos y Victor
 * @version 1.0.0
 */

/**
 * Modelo que gestiona la colección de puntuaciones
 * Permite agregar nuevas puntuaciones y listarlas ordenadas
 */
export default class ModeloPuntuaciones {
    /** @type {Array<{nombre: string, puntuacion: number}>} Array de puntuaciones */
    #puntuaciones;

    /**
     * Crea una nueva instancia del modelo de puntuaciones
     * Inicializa el almacenamiento vacío
     */
    constructor() {
        this.#puntuaciones = [];
    }

    /**
     * Agrega una nueva puntuación al modelo
     * 
     * @param {{nombre: string, puntuacion: number}} puntuacion - Objeto con nombre y puntuación
     */
    agregarPuntuacion(puntuacion) {
        this.#puntuaciones.push(puntuacion);
    }

    /**
     * Obtiene todas las puntuaciones
     * 
     * @returns {Array<{nombre: string, puntuacion: number}>} Lista de puntuaciones
     */
    listar() {
        return [...this.#puntuaciones];
    }

    /**
     * Obtiene todas las puntuaciones ordenadas de mayor a menor
     * 
     * @returns {Array<{nombre: string, puntuacion: number}>} Puntuaciones ordenadas descentemente
     */
    listarOrdenadasDesc() {
        return this.listar().sort((a, b) => b.puntuacion - a.puntuacion);
    }
}