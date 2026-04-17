import VistaContacto from './vista-contacto.js';
import VistaPuntuaciones from './vista-puntuaciones.js';

export default class Navegacion {
    #controladorJugadores;
    #vistaContacto;
    #vistaPuntuaciones;
    #mapeoBotonesVistas;

    constructor(controladorJugadores) {
        this.#controladorJugadores = controladorJugadores;

        // Inicializar vistas
        this.#vistaContacto = new VistaContacto();
        this.#vistaPuntuaciones = new VistaPuntuaciones();

        this.#mapeoBotonesVistas = {
            'btn-registro': 'registro',
            'btn-contacto-nav': 'contacto',
            'btn-editar-perfil': 'editar',
            'btn-mostrar-jugadores': 'jugadores',
            'btn-ranking': 'ranking',
            'btn-jugar': 'juego'
        };

        this.#configurarEventos();

        // Añadir clase activa al ranking vía JS si se quiere iniciar el ranking visible
        // this.mostrarVista('ranking');
    }

    #configurarEventos() {
        Object.keys(this.#mapeoBotonesVistas).forEach(btnId => {
            const boton = document.querySelector(`#${btnId}`);
            if (boton) {
                boton.addEventListener('click', () => this.mostrarVista(this.#mapeoBotonesVistas[btnId]));
            }
        });
    }

    mostrarVista(vistaId) {
        // Ocultar todas las vistas
        const todasLasVistas = document.querySelectorAll('.vista');
        todasLasVistas.forEach(vista => vista.classList.remove('activa'));

        // Mostrar la vista seleccionada
        const vistaSeleccionada = document.querySelector(`#${vistaId}`);
        if (vistaSeleccionada) {
            vistaSeleccionada.classList.add('activa');
        }

        // Llamar a métodos específicos si es necesario
        if (vistaId === 'jugadores') {
            this.#controladorJugadores.mostrarJugadores();
        } else if (vistaId === 'ranking') {
            this.#vistaPuntuaciones.mostrarPuntuaciones();
        }
    }    
}