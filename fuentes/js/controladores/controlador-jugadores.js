import Jugador from '../modelos/jugadores.js'; //  nombre de archivo corregido
import ModeloJugadores from '../modelos/modelo-jugadores.js';

export default class ControladorJugadores {
    #modeloJugadores;

    // Referencias formulario registro
    #nombre;
    #age; //en ingles porque sino sale un color raro
    #email;
    #password;

    // Referencias formulario editar
    #editarNombre;
    #editarEdad;
    #editarEmail;
    #editarPassword;
    #editarPlayerId;

    // Botones
    #btnRegistro;
    #btnGuardar;
    #btnEliminar;

    // Formularios
    #formRegistro;
    #formEditar;

    // Vista jugadores
    #filtroJugadores;
    #campoBusqueda;
    #tablaJugadores;
    #mensajeVacio;

    constructor() {
        this.#modeloJugadores = new ModeloJugadores();
        this.#obtenerReferenciasIU();
        this.#configurarEventos();
    }

    // ─────────────────────────────────────────────
    //  REFERENCIAS AL DOM
    // ─────────────────────────────────────────────
    #obtenerReferenciasIU() {
        // Formulario registro
        this.#nombre = document.querySelector('#nombre');
        this.#age   = document.querySelector('#age');
        this.#email  = document.querySelector('#email');
        this.#password = document.querySelector('#password');

        // Formulario editar
        this.#editarNombre   = document.querySelector('#editar-nombre');
        this.#editarEdad     = document.querySelector('#editar-edad');
        this.#editarEmail    = document.querySelector('#editar-email');
        this.#editarPassword = document.querySelector('#editar-password');
        this.#editarPlayerId = document.querySelector('#editar-player-id');

        // Botones
        this.#btnRegistro = document.querySelector('#btn-crear');
        this.#btnGuardar  = document.querySelector('#btn-guardar');
        this.#btnEliminar = document.querySelector('#btn-eliminar');

        // Formularios
        this.#formRegistro = document.querySelector('#form-registro');
        this.#formEditar   = document.querySelector('#form-editar');

        // Tabla y filtros
        this.#filtroJugadores = document.querySelector('#filtro-jugadores');
        this.#campoBusqueda   = document.querySelector('#busqueda-jugadores');
        this.#tablaJugadores  = document.querySelector('#tabla-jugadores tbody');
        this.#mensajeVacio    = document.querySelector('#mensaje-vacio-jugadores');
    }

    // ─────────────────────────────────────────────
    //  EVENTOS
    // ─────────────────────────────────────────────
    #configurarEventos() {
        this.#btnRegistro.addEventListener('click', () => this.registrarJugador());
        this.#btnGuardar.addEventListener('click',  () => this.editarJugador());
        this.#btnEliminar.addEventListener('click', () => this.eliminarJugador());

        // Filtro por tipo (nombre/email) — actualiza tabla al cambiar
        this.#filtroJugadores.addEventListener('change', () => this.mostrarJugadores());

        // Búsqueda en tiempo real
        if (this.#campoBusqueda) {
            this.#campoBusqueda.addEventListener('input', () => this.mostrarJugadores());
        }
    }

    // ─────────────────────────────────────────────
    //  CREATE — Registrar jugador
    // ─────────────────────────────────────────────
    registrarJugador() {
        const nombre   = this.#nombre.value.trim();
        const age     = this.#age.value.trim();
        const email    = this.#email.value.trim();
        const password = this.#password.value.trim();

        // Validación básica
        if (!nombre || !age || !email || !password) {
            alert(' Por favor, rellena todos los campos.');
            return;
        }

        if (isNaN(age) || age < 1 || age > 120) {
            alert(' La edad debe estar entre 1 y 120.');
            return;
        }

        const jugador = new Jugador(nombre, age, email, password);
        this.#modeloJugadores.agregarJugador(jugador);

        alert(` Jugador "${nombre}" registrado con éxito.`);
        this.#formRegistro.reset();
        this.mostrarJugadores();
    }

    // ─────────────────────────────────────────────
    //  UPDATE — Guardar cambios del jugador editado
    // ─────────────────────────────────────────────
    editarJugador() {
        const id       = this.#editarPlayerId.value;
        const nombre   = this.#editarNombre.value.trim();
        const age     = this.#editarEdad.value.trim();
        const email    = this.#editarEmail.value.trim();
        const password = this.#editarPassword.value.trim();

        if (!id) {
            alert(' No hay ningún jugador seleccionado para editar.');
            return;
        }

        if (!nombre || !age || !email) {
            alert(' Nombre, edad y email son obligatorios.');
            return;
        }

        const actualizado = this.#modeloJugadores.actualizar(id, nombre, age, email, password);

        if (actualizado) {
            alert(`Jugador "${nombre}" actualizado con éxito.`);
            this.#formEditar.reset();
            this.mostrarJugadores();
        } else {
            alert('No se encontró el jugador a actualizar.');
        }
    }

    // ─────────────────────────────────────────────
    //  DELETE — Eliminar jugador
    // ─────────────────────────────────────────────
    eliminarJugador() {
        const id = this.#editarPlayerId.value;

        if (!id) {
            alert('No hay ningún jugador seleccionado para eliminar.');
            return;
        }

        const jugador = this.#modeloJugadores.obtenerPorId(id);
        const nombre  = jugador ? jugador.getNombre() : 'este jugador';

        const confirmar = confirm(`¿Estás seguro de que quieres eliminar a "${nombre}"?`);
        if (!confirmar) return;

        this.#modeloJugadores.eliminar(id);
        alert(`Jugador "${nombre}" eliminado correctamente.`);
        this.#formEditar.reset();
        this.mostrarJugadores();
    }

    // ─────────────────────────────────────────────
    //  CARGAR datos en formulario de edición
    // ─────────────────────────────────────────────
    cargarDatosEnFormularioEditar(id) {
        const jugador = this.#modeloJugadores.obtenerPorId(id);
        if (!jugador) {
            alert('Jugador no encontrado.');
            return;
        }

        this.#editarNombre.value   = jugador.getNombre();
        this.#editarEdad.value     = jugador.getEdad();
        this.#editarEmail.value    = jugador.getEmail();
        this.#editarPassword.value = '';          // No precargamos la contraseña
        this.#editarPlayerId.value = jugador.getId();
    }

    // ─────────────────────────────────────────────
    //  READ — Mostrar jugadores (aplica filtro activo)
    // ─────────────────────────────────────────────
    mostrarJugadores() {
        const textoBusqueda = this.#campoBusqueda ? this.#campoBusqueda.value.trim() : '';
        const tipofiltro    = this.#filtroJugadores.value;
        const jugadores     = this.filtrarJugadores(textoBusqueda, tipofiltro);
        this.#renderizarTablaJugadores(jugadores);
    }

    // ─────────────────────────────────────────────
    //  FILTER — Filtrar y ordenar jugadores por texto y tipo
    // ─────────────────────────────────────────────
    filtrarJugadores(texto, tipofiltro) {
        let jugadores = this.#modeloJugadores.listar();

        // Filtrar por texto si hay búsqueda
        if (texto) {
            jugadores = jugadores.filter(jugador => {
                const valor = tipofiltro === 'nombre'
                    ? jugador.getNombre().toLowerCase()
                    : jugador.getEmail().toLowerCase();
                return valor.includes(texto.toLowerCase());
            });
        }

        // Ordenar alfabéticamente por el campo seleccionado
        return jugadores.sort((a, b) => {
            const valorA = tipofiltro === 'nombre'
                ? a.getNombre().toLowerCase()
                : a.getEmail().toLowerCase();
            const valorB = tipofiltro === 'nombre'
                ? b.getNombre().toLowerCase()
                : b.getEmail().toLowerCase();
            if (valorA < valorB) return -1;
            if (valorA > valorB) return 1;
            return 0;
        });
    }

    // ─────────────────────────────────────────────
    //  RENDER — Pintar tabla de jugadores
    // ─────────────────────────────────────────────
    #renderizarTablaJugadores(jugadores) {
        this.#tablaJugadores.innerHTML = '';

        // Mensaje si no hay resultados
        if (this.#mensajeVacio) {
            this.#mensajeVacio.style.display = jugadores.length === 0 ? 'block' : 'none';
        }

        jugadores.forEach(jugador => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${jugador.getNombre()}</td>
                <td>${jugador.getEmail()}</td>
                <td>
                    <button class="btn-tabla editar" data-id="${jugador.getId()}">Editar</button>
                    <button class="btn-tabla eliminar" data-id="${jugador.getId()}">Eliminar</button>
                </td>
            `;

            // Botón editar por fila
            fila.querySelector('.editar').addEventListener('click', () => {
                this.cargarDatosEnFormularioEditar(jugador.getId());
            });

            // Botón eliminar por fila
            fila.querySelector('.eliminar').addEventListener('click', () => {
                const confirmar = confirm(`¿Eliminar a "${jugador.getNombre()}"?`);
                if (confirmar) {
                    this.#modeloJugadores.eliminar(jugador.getId());
                    alert(`Jugador "${jugador.getNombre()}" eliminado.`);
                    this.mostrarJugadores();
                }
            });

            this.#tablaJugadores.appendChild(fila);
        });
    }
}   
