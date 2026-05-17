/**
 * app.js — Punto de entrada principal de la aplicación
 * 
 * Inicializa todos los controladores, vistas y el sistema de navegación.
 * Orquesta la comunicación entre los módulos MVC (Modelos, Vistas, Controladores).
 * 
 * @author Alejandro, Carlos y Victor
 * @version 1.0.0
 */

import ControladorJugadores from "./js/controladores/controlador-jugadores.js";
import VistaContacto from "./js/vistas/vista-contacto.js";
import VistaPuntuaciones from "./js/vistas/vista-puntuaciones.js";
import Navegacion from "./js/navegacion.js";
import ControladorJuegoDragDrop from "./js/controladores/controlador-juego.js";
 
/**
 * Clase principal de la aplicación
 * Gestiona la inicialización de todos los componentes y coordina la navegación
 */
class App {
    /** @type {ControladorJugadores} Controlador para gestión de jugadores */
    #controladorJugadores;
    
    /** @type {VistaContacto} Vista del formulario de contacto */
    #vistaContacto;
    
    /** @type {VistaPuntuaciones} Vista para mostrar y guardar puntuaciones */
    #vistaPuntuaciones;
    
    /** @type {Navegacion} Sistema de navegación entre vistas */
    #navegacion;
    
    /** @type {ControladorJuegoDragDrop} Controlador del juego Drag & Drop */
    #controladorJuego;

    /**
     * Crea una nueva instancia de la aplicación
     * Inicializa todos los componentes en el orden correcto
     */
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
                }, 3000);
            }
        });
    }

    /**
     * Configura todos los botones de navegación entre vistas
     * Conecta los botones con sus respectivas vistas y callbacks
     * @private
     */
    #configurarNavegacion() {
        // Botones de navegación principal
        this.#navegacion.conectarBoton('btn-inicio', 'bloque-juego');
        this.#navegacion.conectarBoton('btn-registro', 'registro');
        this.#navegacion.conectarBoton('btn-contacto-nav', 'contacto');
        this.#navegacion.conectarBoton('btn-editar-perfil', 'editar');
        
        // Botón de jugadores con actualización de tabla
        this.#navegacion.conectarBoton('btn-mostrar-jugadores', 'jugadores', () => {
            this.#controladorJugadores.mostrarJugadores();
        });

        // Botones para iniciar juego
        this.#navegacion.conectarBoton('btn-jugar', 'juego', () => {
            this.#controladorJuego.iniciar();
        });
        
        // Botones para ver ranking
        this.#navegacion.conectarBoton('btn-ranking', 'ranking', () => {
            this.#vistaPuntuaciones.mostrarPuntuaciones();
        });

        // Botones dentro del panel de Game Over
        this.#navegacion.conectarBoton('btn-reiniciar-juego', 'juego', () => {
            this.#controladorJuego.iniciar();
        });
        this.#navegacion.conectarBoton('btn-ir-ranking-go', 'ranking', () => {
            this.#vistaPuntuaciones.mostrarPuntuaciones();
        });

        // Botones de gestión de puntuaciones
        this.#navegacion.conectarBoton('btn-mostrar-puntuacion', 'ranking', () => {
            this.#vistaPuntuaciones.mostrarPuntuaciones();
        });
    }
}

/**
 * Inicializa la aplicación cuando el DOM está completamente cargado
 * Crea una única instancia de App que gestiona toda la aplicación
 */
document.addEventListener("DOMContentLoaded", () => {
    new App();
});