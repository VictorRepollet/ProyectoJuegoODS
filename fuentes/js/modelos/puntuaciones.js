export default class Puntuacion {
    #nombre;
    #puntuacion;

    constructor(nombre, puntuacion) {
        this.#nombre = nombre;
        this.#puntuacion = puntuacion;
    }

    getNombre(){
        return this.#nombre;
    }

    getPuntuacion(){
        return this.#puntuacion;
    }
}