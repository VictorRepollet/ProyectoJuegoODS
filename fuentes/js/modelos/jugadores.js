export default class Jugador {
    static ultimoId = 0;

    #id;
    #nombre;
    #edad;
    #email;
    #password;

    constructor(nombre, edad, email, password) {
        this.#id = ++Jugador.ultimoId;
        this.#nombre = nombre;
        this.#edad = edad;
        this.#email = email;
        this.#password = password;
    }

    getId() {
        return this.#id;
    }

    getNombre() {
        return this.#nombre;
    }

    getEdad() {
        return this.#edad;
    }

    getEmail() {
        return this.#email;
    }

    getPassword() {
        return this.#password;
    }

    setNombre(nombre) {
        this.#nombre = nombre;
    }

    setEdad(edad) {
        this.#edad = edad;
    }

    setEmail(email) {
        this.#email = email;
    }

    setPassword(password) {
        this.#password = password;
    }
}