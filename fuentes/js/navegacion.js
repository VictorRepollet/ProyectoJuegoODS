/**
 * navegacion.js — Sistema de navegación entre vistas
 * 
 * Gestiona el cambio dinámico entre las diferentes vistas de la aplicación.
 * Maneja los eventos de los botones y controla la visibilidad de los elementos.
 * 
 * @author Alejandro, Carlos y Victor
 * @version 1.0.0
 */

/**
 * Sistema de navegación para cambiar entre vistas
 * Utiliza clases CSS para mostrar/ocultar elementos
 */
export default class Navegacion {
    /**
     * Crea una nueva instancia del sistema de navegación
     * Inicializa la vista por defecto al cargar
     */
    constructor() {
        this.#inicializar();
    }

    /**
     * Inicializa el sistema de navegación
     * Muestra la vista inicial (bloque-juego) al cargar la aplicación
     * @private
     */
    #inicializar() {
        // Mostrar vista inicial
        this.mostrarVista('bloque-juego');
    }

    /**
     * Cambia a una vista específica
     * Oculta todas las demás vistas y muestra solo la seleccionada
     * 
     * @param {string} idVista - ID del elemento que representa la vista
     * @returns {boolean} true si la vista existe y se mostró, false en caso contrario
     */
    mostrarVista(idVista) {
        
        // Ocultar todas las vistas
        const todasLasVistas = document.querySelectorAll('.vista');
        
        todasLasVistas.forEach(vista => {
            vista.classList.remove('activa');
        });

        // Mostrar la vista seleccionada
        const vistaActiva = document.querySelector(`#${idVista}`);
        if (vistaActiva) {
            vistaActiva.classList.add('activa');
            
            // Controlar visibilidad del manual e inicio
            const page = document.querySelector('.page');
            if (idVista === 'bloque-juego') {
                page.classList.add('mostrar-inicial');
            } else {
                page.classList.remove('mostrar-inicial');
            }
            
            return true;
        } else {
            return false;
        }
    }

    /**
     * Conecta un botón a una vista específica
     * Cuando se hace clic en el botón, se muestra la vista indicada
     * 
     * @param {string} idBoton - ID del botón HTML
     * @param {string} idVista - ID de la vista a mostrar
     * @param {Function} [callback] - Función opcional a ejecutar después de mostrar la vista
     */
    conectarBoton(idBoton, idVista, callback) {
        const boton = document.querySelector(`#${idBoton}`);
        if (boton) {
            boton.addEventListener('click', () => {
                this.mostrarVista(idVista);
                if (callback) callback();
            });
        }
    }
}
