import ControladorJugadores from "./js/controladores/controlador-jugadores.js";
import VistaContacto from "./js/vistas/vista-contacto.js";
import VistaPuntuaciones from "./js/vistas/vista-puntuaciones.js";

class App {
    #controladorJugadores;
    #vistaContacto;
    #vistaPuntuaciones;

    constructor() {
        // Inicializar controlador
        this.#controladorJugadores = new ControladorJugadores();

        // Inicializar vistas
        this.#vistaContacto = new VistaContacto();
        this.#vistaPuntuaciones = new VistaPuntuaciones();

        // Mostrar todas las vistas
        this.mostrarTodasLasVistas();
    }

    mostrarTodasLasVistas() {
        // Añadir clase activa a todas las vistas
        const todasLasVistas = document.querySelectorAll('.vista');
        todasLasVistas.forEach(vista => vista.classList.add('activa'));

        // Llamar a métodos para mostrar contenido
        this.#controladorJugadores.mostrarJugadores();
        this.#vistaPuntuaciones.mostrarPuntuaciones();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new App();
});