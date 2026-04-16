import Jugador from '../modelos/clase-jugador.js';
import ModeloJugadores from '../modelos/modelo-jugadores.js';

export default class ControladorJugadores {
    #modeloJugadores;
    #nombre;
    #edad;
    #email;
    #password;
    #btnRegistro;
    #btnEditar;
    #btnEliminar;
    #formRegistro;
    #formEditar;
    #editarPlayerId;
    #filtroJugadores;
    #tablaJugadores;
    #vistaJugadores;

    constructor() {
        this.#modeloJugadores = new ModeloJugadores();
        this.#obtenerReferenciasIU();
        this.#configurarEventos();
    }

    #obtenerReferenciasIU() {
        this.#nombre = document.querySelector('#nombre');
        this.#edad = document.querySelector('#edad');
        this.#email = document.querySelector('#email');
        this.#password = document.querySelector('#password');
        this.#btnEditar = document.querySelector('#btn-guardar');
        this.#btnRegistro = document.querySelector('#btn-crear');
        this.#btnEliminar = document.querySelector('#btn-eliminar');
        this.#formRegistro = document.querySelector('#form-registro');
        this.#formEditar = document.querySelector('#form-editar');
        this.#filtroJugadores = document.querySelector('#filtro-jugadores');
        this.#tablaJugadores = document.querySelector('#tabla-jugadores tbody');
        this.#vistaJugadores = document.querySelector('#vista-jugadores');
    }

    #configurarEventos() {
        this.#btnRegistro.addEventListener('click', () => this.registrarJugador());
        this.#btnEditar.addEventListener('click', () => this.editarJugador());
        this.#btnEliminar.addEventListener('click', () => this.eliminarJugador());
        this.#filtroJugadores.addEventListener('change', () => this.mostrarJugadores());
        // Si tienes un botón para mostrar la vista de jugadores, añade su evento aquí
    }

    registrarJugador() {
        const nombre = this.#nombre.value;
        const edad = this.#edad.value;
        const email = this.#email.value;
        const password = this.#password.value;

        const jugador = new Jugador(nombre, edad, email, password);
        this.#modeloJugadores.agregarJugador(jugador);

        alert('Jugador registrado con éxito');
        
    }

    editarJugador() {
        const id = document.querySelector('#editar-player-id').value;
        const nombre = document.querySelector('#editar-nombre').value;
        const edad = document.querySelector('#editar-edad').value;
        const email = document.querySelector('#editar-email').value;
        const password = document.querySelector('#editar-password').value;

        this.#modeloJugadores.actualizar(id, nombre, edad, email, password);
        alert('Jugador actualizado con éxito');
        this.mostrarJugadores(); // Actualiza la tabla al editar
    }

    eliminarJugador() {
        const id = document.querySelector('#editar-player-id').value;
        this.#modeloJugadores.eliminar(id);
        alert('Jugador eliminado con éxito');
        this.#formEditar.reset();
        this.mostrarJugadores(); // Actualiza la tabla al eliminar
    }

    cargarDatosEnFormularioEditar(id) {
        const jugador = this.#modeloJugadores.obtenerPorId(id);
        if (jugador) {
            document.querySelector('#editar-nombre').value = jugador.getNombre();
            document.querySelector('#editar-edad').value = jugador.getEdad();
            document.querySelector('#editar-email').value = jugador.getEmail();
            document.querySelector('#editar-player-id').value = jugador.getId();
        }
    }

    // --- NUEVOS MÉTODOS PARA BÚSQUEDA AVANZADA ---
    mostrarJugadores() {
        const jugadores = this.#modeloJugadores.listar();
        const filtro = this.#filtroJugadores.value;
        this.#renderizarTablaJugadores(jugadores, filtro);
    }

    #renderizarTablaJugadores(jugadores, filtro) {
        this.#tablaJugadores.innerHTML = '';
        jugadores.forEach(jugador => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${jugador.getNombre()}</td>
                <td>${jugador.getEmail()}</td>
            `;
            this.#tablaJugadores.appendChild(row);
        });
    }

    // Método para filtrar jugadores por nombre o email (opcional, si quieres usarlo desde otro lado)
    filtrarJugadores(texto) {
        const jugadores = this.#modeloJugadores.listar();
        const filtro = this.#filtroJugadores.value;
        if (!texto) return jugadores;
        return jugadores.filter(jugador => {
            const valor = filtro === 'nombre' ? jugador.getNombre().toLowerCase() : jugador.getEmail().toLowerCase();
            return valor.includes(texto.toLowerCase());
        });
    }
}