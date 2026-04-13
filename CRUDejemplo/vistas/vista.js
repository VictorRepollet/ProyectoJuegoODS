export default class Vista {
    #controlador
    #inputNombre
    #inputFechaNacimiento
    #boton
    #tbody

    constructor(controlador) {
        console.log('Vista creada')
        this.#controlador = controlador
        this.#obtenerReferenciasIU()
        this.#boton.addEventListener('click', () => this.#insertar())
    }

    #obtenerReferenciasIU() {
        this.#boton = document.querySelector('button')
        this.#inputNombre = document.querySelector('input[type="text"]')   // FIX: era 'input' (ambiguo)
        this.#inputFechaNacimiento = document.querySelector('input[type="date"]')
        this.#tbody = document.querySelector('tbody')                      // FIX: era querySelectorAll('tbody')[1], índice fuera de rango
    }

    #insertar() {
        const nombre = this.#inputNombre.value
        const fechaNacimiento = this.#inputFechaNacimiento.value
        const datos = { nombre, fechaNacimiento }
        this.#controlador.insertar(datos)
    }

    listar(alumnos) {
        this.#tbody.innerHTML = ''
        alumnos.forEach(alumno => {
            const tr = document.createElement('tr')
            this.#tbody.appendChild(tr)

            const tdNombre = document.createElement('td')
            tr.appendChild(tdNombre)
            tdNombre.textContent = alumno.getNombre()

            const tdFechaNacimiento = document.createElement('td')
            tr.appendChild(tdFechaNacimiento)
            tdFechaNacimiento.textContent = alumno.getFechaNacimiento()
        })
    }

    limpiar() {
        this.#inputNombre.value = ''
        this.#inputFechaNacimiento.value = ''
    }
}