export default class Jugador {
    static ultimoId = 0;

    #id;
    #nombre;
    #age;
    #email;
    #password;

    constructor(nombre, age, email, password) {
        this.#id = ++Jugador.ultimoId;
        this.#nombre = nombre;
        this.#age = age;
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
        return this.#age;
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

    setEdad(age) {
        this.#age= age;
    }

    setEmail(email) {
        this.#email = email;
    }

    setPassword(password) {
        this.#password = password;
    }
}