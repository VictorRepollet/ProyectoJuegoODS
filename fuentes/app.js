import ControladorJugadores from "./js/controladores/controlador-jugadores.js";
import VistaContacto from "./js/vistas/vista-contacto.js";
import VistaPuntuaciones from "./js/vistas/vista-puntuaciones.js";
import { Navegacion } from "./js/navegacion.js";
import Juego from "./js/juego.js";
import ModeloPuntuaciones from "./js/modelos/modelo-puntuaciones.js";

class App {
    #controladorJugadores;
    #vistaContacto;
    #vistaPuntuaciones;
    #navegacion;
    #juego;
    #modeloPuntuaciones;

    constructor() {
        
        // Inicializar sistema de navegación
        this.#navegacion = new Navegacion();

        // Inicializar controlador y vistas
        this.#controladorJugadores = new ControladorJugadores();
        this.#vistaContacto = new VistaContacto();
        this.#modeloPuntuaciones = new ModeloPuntuaciones();
        this.#vistaPuntuaciones = new VistaPuntuaciones(this.#modeloPuntuaciones);
        this.#juego = new Juego(this.#vistaPuntuaciones);

        // Configurar navegación
        this.#configurarNavegacion();

        
    }

    // ─────────────────────────────────────────────
    //  CONFIGURAR NAVEGACIÓN
    // ─────────────────────────────────────────────
    #configurarNavegacion() {
        // Botones superiores
        this.#navegacion.conectarBoton('btn-inicio', 'bloque-juego');
        this.#navegacion.conectarBoton('btn-registro', 'registro');
        this.#navegacion.conectarBoton('btn-contacto-nav', 'contacto');
        this.#navegacion.conectarBoton('btn-editar-perfil', 'editar');
        this.#navegacion.conectarBoton('btn-mostrar-jugadores', 'jugadores', () => {
            this.#controladorJugadores.mostrarJugadores();
        });

        // Botones del juego
        this.#navegacion.conectarBoton('btn-jugar', 'juego', () => {
            this.#juego.start();
        });
        this.#navegacion.conectarBoton('btn-ranking', 'ranking', () => {
            this.#vistaPuntuaciones.mostrarPuntuaciones();
        });

        // Botones de puntuaciones
        this.#navegacion.conectarBoton('btn-mostrar-puntuacion', 'ranking', () => {
            this.#vistaPuntuaciones.mostrarPuntuaciones();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new App();
});