/**
 * controlador-juego-dragdrop.js — Controlador para la mecánica Drag & Drop
 * Conecta VistaJuegoDragDrop con los modelos de jugadores y puntuaciones
 */

import VistaJuegoDragDrop from '../vistas/vista-juego.js';

export default class ControladorJuegoDragDrop {

    #vista;
    #onGameOver;  // callback → App guarda puntuación y navega

    // Catálogo de alimentos y personas (datos del juego)
    static ALIMENTOS = [
        { id: 'al-1', tipo: '🍞', nombre: 'Pan'     },
        { id: 'al-2', tipo: '🥦', nombre: 'Brócoli' },
        { id: 'al-3', tipo: '🍎', nombre: 'Manzana' },
        { id: 'al-4', tipo: '🥕', nombre: 'Zanahoria'},
        { id: 'al-5', tipo: '🍌', nombre: 'Plátano' },
    ];

    static PERSONAS = [
        { id: 'per-1', nombre: 'Admed',    pedido: '🍞' },
        { id: 'per-2', nombre: 'Dilan', pedido: '🥦' },
        { id: 'per-3', nombre: 'Sadio Mané',   pedido: '🍎' },
    ];

    constructor() {
        this.#vista = new VistaJuegoDragDrop();
        this.#onGameOver = null;

        // Cuando termina el tiempo → notificar a App
        this.#vista.onTiempoAgotado((datos) => {
            if (this.#onGameOver) {
                this.#onGameOver(datos);
            }
        });

        // Cuando se hace una entrega → el controlador puede hacer lógica extra
        this.#vista.onEntrega((idAlimento, idPersona, correcto) => {
            // Lógica de entregas aquí si es necesaria
        });
    }

    // ─────────────────────────────────────────────
    //  INICIAR partida
    // ─────────────────────────────────────────────
    iniciar() {
        // Barajar alimentos para que no siempre salgan en el mismo orden
        const alimentosAleatorios = this.#barajar([...ControladorJuegoDragDrop.ALIMENTOS]);
        const personasAleatorias  = this.#barajar([...ControladorJuegoDragDrop.PERSONAS]);

        this.#vista.iniciar(alimentosAleatorios, personasAleatorias, 60);
    }

    // ─────────────────────────────────────────────
    //  BARAJAR array (Fisher-Yates)
    // ─────────────────────────────────────────────
    #barajar(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // ─────────────────────────────────────────────
    //  API pública
    // ─────────────────────────────────────────────
    onGameOver(callback) { this.#onGameOver = callback; }
    detener()            { this.#vista.detener(); }
    getPuntuacion()      { return this.#vista.getPuntuacion(); }
}