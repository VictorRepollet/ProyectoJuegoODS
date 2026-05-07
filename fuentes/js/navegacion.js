/**
 * navegacion.js — Sistema de navegación entre vistas
 * Maneja el cambio de vistas y los eventos de los botones
 */

export default class Navegacion {
    constructor() {
        this.#inicializar();
    }

    // ─────────────────────────────────────────────
    //  INICIALIZAR NAVEGACIÓN
    // ─────────────────────────────────────────────
    #inicializar() {
        
        // Mostrar vista inicial
        this.mostrarVista('bloque-juego');
    }

    // ─────────────────────────────────────────────
    //  MOSTRAR VISTA
    // ─────────────────────────────────────────────
    mostrarVista(idVista) {
        
        // Ocultar todas las vistas
        const todasLasVistas = document.querySelectorAll('.vista');
        
        todasLasVistas.forEach(vista => {
            vista.classList.remove('activa');
        });

        // Mostrar la vista seleccionada
        const vistaActiva = document.getElementById(idVista);
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

    // ─────────────────────────────────────────────
    //  CONECTAR BOTONES
    // ─────────────────────────────────────────────
    conectarBoton(idBoton, idVista, callback) {
        const boton = document.getElementById(idBoton);
        if (boton) {
            boton.addEventListener('click', () => {
                this.mostrarVista(idVista);
                if (callback) callback();
            });
        }
    }
}
