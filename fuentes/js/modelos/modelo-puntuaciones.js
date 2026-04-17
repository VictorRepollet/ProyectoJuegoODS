export default class ModeloPuntuaciones {
    #puntuaciones;

    constructor() {
        this.#puntuaciones = [];
    }

    agregarPuntuacion(puntuacion) {
        this.#puntuaciones.push(puntuacion);
    }

    listar() {
        return [...this.#puntuaciones];
    }

    listarOrdenadasDesc() {
        return this.listar().sort((a, b) => b.puntuacion - a.puntuacion);
    }
}