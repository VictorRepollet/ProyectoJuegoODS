/**
 * vista-puntuaciones.js — Vista de puntuaciones y ranking
 * 
 * Gestiona la visualización del ranking de puntuaciones.
 * Permite guardar nuevas puntuaciones y mostrarlas ordenadas de mayor a menor.
 * 
 * @author Alejandro, Carlos y Victor
 * @version 1.0.0
 */

import ModeloPuntuaciones from '../modelos/modelo-puntuaciones.js';

/**
 * Vista que gestiona la presentación del ranking de puntuaciones
 * Integra con el modelo de puntuaciones para almacenar y recuperar datos
 */
export default class VistaPuntuaciones {
    /** @type {ModeloPuntuaciones} Instancia del modelo de puntuaciones */
    #modeloPuntuaciones;

    // ────────────────────────── Referencias formulario de puntuaciones
    /** @type {HTMLInputElement} Campo para ingresar nombre en el ranking */
    #nombrePunt;
    
    /** @type {HTMLInputElement} Campo para ingresar puntuación */
    #puntuacion;
    
    /** @type {HTMLButtonElement} Botón para enviar nueva puntuación */
    #btnPuntuacion;
    
    /** @type {HTMLButtonElement} Botón para mostrar el ranking */
    #btnMostrarPuntuacion;
    
    /** @type {HTMLFormElement} Formulario para ingresar puntuaciones */
    #formPuntuaciones;
    
    /** @type {HTMLElement} Contenedor donde se renderiza la tabla de ranking */
    #cuerpoRanking;

    /**
     * Crea una nueva instancia de la vista de puntuaciones
     * Inicializa el modelo, obtiene referencias del DOM y configura eventos
     */
    constructor() {
        this.#modeloPuntuaciones = new ModeloPuntuaciones();
        this.#obtenerReferenciasIU();
        this.#configurarEventos();
    }

    /**
     * Obtiene referencias a todos los elementos del formulario y ranking
     * @private
     */
    #obtenerReferenciasIU() {
        this.#nombrePunt = document.querySelector('#nombre-punt');
        this.#puntuacion = document.querySelector('#puntuacion');
        this.#btnPuntuacion = document.querySelector('#btn-puntuacion');
        this.#btnMostrarPuntuacion = document.querySelector('#btn-mostrar-puntuacion');
        this.#formPuntuaciones = document.querySelector('#form-puntuaciones');
        this.#cuerpoRanking = document.querySelector('#cuerpo-ranking');
    }

    /**
     * Configura los event listeners de los botones
     * @private
     */
    #configurarEventos() {
        this.#btnPuntuacion.addEventListener('click', () => this.enviarPuntuacion());
        this.#btnMostrarPuntuacion.addEventListener('click', () => this.mostrarPuntuaciones());
    }

    /**
     * Valida y guarda una puntuación ingresada manualmente
     * @public
     */
    enviarPuntuacion() {
        const nombre = this.#nombrePunt.value.trim();
        const puntos = parseInt(this.#puntuacion.value);

        // Validación básica
        if (!nombre || isNaN(puntos) || puntos < 0) {
            alert('Por favor, ingresa un nombre válido y una puntuación positiva.');
            return;
        }

        const nuevaPuntuacion = {
            nombre,
            puntuacion: puntos
        };

        this.#modeloPuntuaciones.agregarPuntuacion(nuevaPuntuacion);
        alert(`Puntuación de "${nombre}" enviada: ${puntos} puntos.`);

        // Resetear formulario
        this.#formPuntuaciones.reset();
    }

    /**
     * Guarda una puntuación automáticamente al finalizar una partida
     * Se ejecuta desde el controlador del juego
     * 
     * @param {string} nombre - Nombre del jugador que obtuvo la puntuación
     * @param {number} puntuacion - Puntuación obtenida
     * @public
     */
    guardarPuntuacionDirecta(nombre, puntuacion) {
        const nuevaPuntuacion = {
            nombre,
            puntuacion
        };

        this.#modeloPuntuaciones.agregarPuntuacion(nuevaPuntuacion);
    }

    /**
     * Obtiene todas las puntuaciones y las muestra en una tabla ordenada
     * La tabla está ordenada de mayor a menor puntuación
     * Muestra mensaje si no hay puntuaciones registradas
     * @public
     */
    mostrarPuntuaciones() {
        const puntuaciones = this.#modeloPuntuaciones.listarOrdenadasDesc();

        this.#cuerpoRanking.innerHTML = '';

        if (puntuaciones.length === 0) {
            this.#cuerpoRanking.innerHTML = '<p>No hay puntuaciones registradas.</p>';
            return;
        }

        const tabla = document.createElement('table');
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th>Posición</th>
                    <th>Nombre</th>
                    <th>Puntuación</th>
                </tr>
            </thead>
            <tbody>
                ${puntuaciones.map((p, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${p.nombre}</td>
                        <td>${p.puntuacion}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;

        this.#cuerpoRanking.appendChild(tabla);
    }
}