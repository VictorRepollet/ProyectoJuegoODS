export default class VistaContacto {

    #form;
    #nombreInput;
    #emailInput;
    #fechaInput;
    #descripcionInput;
    #generoInput;
    #terminosInput;
    #btnEnviar;

    constructor() {
        this.#obtenerReferenciasIU();
        this.#configurarEventos();
    }

    // ─────────────────────────────────────────────
    //  REFERENCIAS AL DOM
    // ─────────────────────────────────────────────
    #obtenerReferenciasIU() {
        this.#form             = document.querySelector('#form-contacto');
        this.#nombreInput      = document.querySelector('#nombre-contacto');
        this.#emailInput       = document.querySelector('#email-contacto');
        this.#fechaInput       = document.querySelector('#fecha-contacto');
        this.#descripcionInput = document.querySelector('#descripcion');
        this.#generoInput      = document.querySelector('#genero');
        this.#terminosInput    = document.querySelector('#terminos');
        this.#btnEnviar        = document.querySelector('#btn-contacto');
    }

    // ─────────────────────────────────────────────
    //  EVENTOS
    // ─────────────────────────────────────────────
    #configurarEventos() {
        this.#btnEnviar.addEventListener('click', () => this.enviarContacto());
    }

    // ─────────────────────────────────────────────
    //  ENVIAR CONTACTO
    // ─────────────────────────────────────────────
    enviarContacto() {
        const nombre      = this.#nombreInput.value.trim();
        const email       = this.#emailInput.value.trim();
        const descripcion = this.#descripcionInput.value.trim();
        const genero      = this.#generoInput.value;
        const terminos    = this.#terminosInput.checked;
        const tipo        = document.querySelector('input[name="tipo"]:checked');

        // Validaciones
        if (!nombre) {
            alert(' El nombre es obligatorio.');
            return;
        }

        if (!email) {
            alert(' El email es obligatorio.');
            return;
        }

        if (!descripcion) {
            alert(' La descripción es obligatoria.');
            return;
        }

        if (!genero) {
            alert(' Por favor selecciona un género.');
            return;
        }

        if (!tipo) {
            alert(' Por favor selecciona un tipo de mensaje (Info o Bug).');
            return;
        }

        if (!terminos) {
            alert(' Debes aceptar los términos para continuar.');
            return;
        }

        // Simulación de envío (aquí iría la llamada a una API o modelo)
        alert(` Mensaje enviado correctamente.\n\nGracias, ${nombre}. Nos pondremos en contacto contigo en ${email}.`);
        this.#form.reset();
    }

    // ─────────────────────────────────────────────
    //  MOSTRAR VISTA
    // ─────────────────────────────────────────────
    mostrarVista() {
        const vista = document.querySelector('#vista-contacto');
        if (vista) vista.classList.add('activa');
    }

    // ─────────────────────────────────────────────
    //  OCULTAR VISTA
    // ─────────────────────────────────────────────
    ocultarVista() {
        const vista = document.querySelector('#vista-contacto');
        if (vista) vista.classList.remove('activa');
    }
}