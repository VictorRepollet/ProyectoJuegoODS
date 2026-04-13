export default class Alumno {
    #nombre
    #fechaNacimiento

    constructor(nombre, fechaNacimiento) {
        this.#nombre = nombre
        this.#fechaNacimiento = new Date(fechaNacimiento)
    }

    getNombre() {
        return this.#nombre
    }

    getFechaNacimiento() {
        let fechaESP = this.#fechaNacimiento.getDate()
        fechaESP += '/' + (this.#fechaNacimiento.getMonth() + 1)
        fechaESP += '/' + this.#fechaNacimiento.getFullYear()
        return fechaESP
    }
}