/**
 * controlador-juego.js — Controlador del juego Drag & Drop
 * 
 * Coordina la lógica del juego, maneja alimentos y personas con sus pedidos.
 * Conecta la vista de juego (VistaJuegoDragDrop) con los datos del juego.
 * Implementa la mecánica de Drag & Drop para entregas correctas e incorrectas.
 * 
 * @author Alejandro, Carlos y Victor
 * @version 1.0.0
 */

import VistaJuegoDragDrop from '../vistas/vista-juego.js';

/**
 * Controlador principal del juego Drag & Drop
 * Gestiona el flujo de juego, puntuaciones y datos de alimentos/personas
 */
export default class ControladorJuegoDragDrop {

    /** @type {VistaJuegoDragDrop} Instancia de la vista del juego */
    #vista;
    
    /** @type {Function} Callback que se ejecuta cuando termina el juego */
    #onGameOver;  // callback → App guarda puntuación y navega

    /**
     * Catálogo estático de alimentos disponibles en el juego
     * Cada alimento tiene: id, tipo (emoji), nombre
     * @type {Array<{id: string, tipo: string, nombre: string}>}
     */
    static ALIMENTOS = [
        { id: 'al-1', tipo: '🍞', nombre: 'Pan'     },
        { id: 'al-2', tipo: '🥦', nombre: 'Brócoli' },
        { id: 'al-3', tipo: '🍎', nombre: 'Manzana' },
        { id: 'al-4', tipo: '🥕', nombre: 'Zanahoria'},
        { id: 'al-5', tipo: '🍌', nombre: 'Plátano' },
    ];

    /**
     * Catálogo estático de personas que piden alimentos
     * Cada persona tiene: id, nombre, pedido (emoji del alimento que quiere)
     * @type {Array<{id: string, nombre: string, pedido: string}>}
     */
    static PERSONAS = [
        { id: 'per-1', nombre: 'Admed',    pedido: '🍞' },
        { id: 'per-2', nombre: 'Dilan', pedido: '🥦' },
        { id: 'per-3', nombre: 'Sadio Mané',   pedido: '🍎' },
    ];

    /**
     * Crea una nueva instancia del controlador de juego
     * Inicializa la vista y configura los callbacks de eventos
     */
    constructor() {
        this.#vista = new VistaJuegoDragDrop();
        this.#onGameOver = null;

        // Registra callback cuando el tiempo se agota
        this.#vista.onTiempoAgotado((datos) => {
            if (this.#onGameOver) {
                this.#onGameOver(datos);
            }
        });

        // Registra callback cuando se realiza una entrega (correcta o incorrecta)
        this.#vista.onEntrega((idAlimento, idPersona, correcto) => {
            // Lógica de entregas adicional si es necesaria
        });
    }

    /**
     * Inicia una nueva partida del juego
     * Baraja los alimentos y personas, y arranca la vista
     * @public
     */
    iniciar() {
        // Barajar alimentos para que no siempre salgan en el mismo orden
        const alimentosAleatorios = this.#barajar([...ControladorJuegoDragDrop.ALIMENTOS]);
        const personasAleatorias  = this.#barajar([...ControladorJuegoDragDrop.PERSONAS]);

        this.#vista.iniciar(alimentosAleatorios, personasAleatorias, 60);
    }

    /**
     * Baraja un array usando el algoritmo Fisher-Yates
     * Modifica el array en lugar y devuelve el mismo
     * 
     * @param {Array} array - Array a barajar
     * @returns {Array} El mismo array barajado
     * @private
     */
    #barajar(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Registra un callback que se ejecutará cuando termine el juego
     * 
     * @param {Function} callback - Función que recibe objeto con {puntuacion, nombre, entregados}
     * @public
     */
    onGameOver(callback) { this.#onGameOver = callback; }
    
    /**
     * Detiene el temporizador y termina la partida
     * @public
     */
    detener()            { this.#vista.detener(); }
    
    /**
     * Obtiene la puntuación actual
     * 
     * @returns {number} Puntuación acumulada en la partida
     * @public
     */
    getPuntuacion()      { return this.#vista.getPuntuacion(); }
}