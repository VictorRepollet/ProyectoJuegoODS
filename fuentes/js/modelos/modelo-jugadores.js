export default class ModeloJugadores {
    #jugadores;

    constructor() {
        this.#jugadores = new Set();
    }

    agregarJugador(jugador) {
        console.log(jugador);
        this.#jugadores.add(jugador);
    }

    listar() {
        return this.#jugadores;
    }

    obtenerPorId(id) {
        return this.listar().find(jugador => jugador.getId() == id);
    }

    actualizar(id, nombre, edad, email, password) {
        const jugadores = this.listar();
        const index = jugadores.findIndex(jugador => jugador.getId() == id);
        if (index !== -1) {
            jugadores[index].setNombre(nombre);
            jugadores[index].setEdad(edad);
            jugadores[index].setEmail(email);
            jugadores[index].setPassword(password);
            this.#jugadores = new Set(jugadores);
            return true;
        }
        return false;
    }

    eliminar(id) {
        const jugadores = this.listar();
        const jugadoresFiltrados = jugadores.filter(jugador => jugador.getId() != id);
        this.#jugadores = new Set(jugadoresFiltrados);
        return true;
    }
}