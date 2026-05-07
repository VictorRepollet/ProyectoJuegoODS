import ControladorJugadores from "./js/controladores/controlador-jugadores.js";
import VistaContacto from "./js/vistas/vista-contacto.js";
import VistaPuntuaciones from "./js/vistas/vista-puntuaciones.js";
import Navegacion from "./js/navegacion.js";
import ControladorJuegoDragDrop from "./js/controladores/controlador-juego.js";
 

class App {
    #controladorJugadores;
    #vistaContacto;
    #vistaPuntuaciones;
    #navegacion;
    #controladorJuego;

    constructor() {
        
        // Inicializar sistema de navegación
        this.#navegacion = new Navegacion();

        // Inicializar controlador y vistas
        this.#controladorJugadores = new ControladorJugadores();
        this.#vistaContacto = new VistaContacto();
        this.#vistaPuntuaciones = new VistaPuntuaciones();

        // Configurar navegación
        this.#configurarNavegacion();

        // Inicializar controlador del juego
        this.#controladorJuego = new ControladorJuegoDragDrop();

        // Guardar puntuación automáticamente al terminar la partida
        this.#controladorJuego.onGameOver(({ puntuacion, nombre, entregados }) => {
            if (nombre) {
                // Guardar puntuación en el modelo
                this.#vistaPuntuaciones.guardarPuntuacionDirecta(nombre, puntuacion);
                // Navegar al ranking automáticamente
                setTimeout(() => {
                    this.#navegacion.mostrarVista('ranking');
                    this.#vistaPuntuaciones.mostrarPuntuaciones();
                }, 500);
            }
        });
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
            this.#controladorJuego.iniciar();
        });
        this.#navegacion.conectarBoton('btn-ranking', 'ranking', () => {
            this.#vistaPuntuaciones.mostrarPuntuaciones();
        });

        // Botones dentro del juego (al terminar)
        this.#navegacion.conectarBoton('btn-reiniciar-juego', 'juego', () => {
            this.#controladorJuego.iniciar();
        });
        this.#navegacion.conectarBoton('btn-ir-ranking-go', 'ranking', () => {
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