import ControladorJugadores from './controladores/controlador-jugadores.js';

class App {
    #controladorJugadores;
    #btnMostrarJugadores;

    constructor() {
        // Inicializar controladores
        this.#controladorJugadores = new ControladorJugadores();

        // Obtener referencia al boton de mostrar jugadores
        this.#btnMostrarJugadores = document.querySelector('#btn-mostrar-jugadores');

        //  Configurar evento para mostrar jugadores
        this.#btnMostrarJugadores.addEventListener('click', () => {
            this.#controladorJugadores.mostrarJugadores();
        });
    }

}

document.addEventListener("DOMContentLoaded", () => {
    new App();
});