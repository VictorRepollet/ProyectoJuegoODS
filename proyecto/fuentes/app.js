import ControladorJugadores from "./js/controladores/controlador-jugadores.js";
import Navegacion from "./js/vistas/navegacion.js";

class App {
    #controladorJugadores;
    #navegacion;

    constructor() {
        // Inicializar controlador
        this.#controladorJugadores = new ControladorJugadores();

        // Inicializar navegación con el controlador
        this.#navegacion = new Navegacion(this.#controladorJugadores);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new App();
});