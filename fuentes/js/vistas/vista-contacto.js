/**
 * vista-contacto.js — Vista del formulario de contacto
 * 
 * Gestiona la presentación y validación del formulario de contacto.
 * Permite a los usuarios enviar mensajes de información o reporte de bugs.
 * 
 * @author Alejandro, Carlos y Victor
 * @version 1.0.0
 */

/**
 * Vista que gestiona el formulario de contacto
 * Incluye validación de campos y feedback al usuario
 */
export default class VistaContacto {

    /** @type {HTMLFormElement} Formulario principal de contacto */
    #form;
    
    /** @type {HTMLInputElement} Campo de entrada para el nombre */
    #nombreInput;
    
    /** @type {HTMLInputElement} Campo de entrada para el email */
    #emailInput;
    
    /** @type {HTMLInputElement} Campo de fecha */
    #fechaInput;
    
    /** @type {HTMLTextAreaElement} Campo de descripción del mensaje */
    #descripcionInput;
    
    /** @type {HTMLSelectElement} Selector de género */
    #generoInput;
    
    /** @type {HTMLInputElement} Checkbox para aceptar términos */
    #terminosInput;
    
    /** @type {HTMLButtonElement} Botón para enviar el formulario */
    #btnEnviar;

    /**
     * Crea una nueva instancia de la vista de contacto
     * Obtiene referencias al DOM y configura eventos
     */
    constructor() {
        this.#obtenerReferenciasIU();
        this.#configurarEventos();
    }

    /**
     * Obtiene referencias a todos los elementos del formulario de contacto
     * @private
     */
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

    /**
     * Configura los event listeners del formulario
     * @private
     */
    #configurarEventos() {
        this.#btnEnviar.addEventListener('click', () => this.enviarContacto());
    }

    /**
     * Valida y envía el formulario de contacto
     * Incluye validaciones para todos los campos requeridos
     * @public
     */
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

    /**
     * Muestra la vista de contacto agregando la clase 'activa'
     * @public
     */
    mostrarVista() {
        const vista = document.querySelector('#vista-contacto');
        if (vista) vista.classList.add('activa');
    }

    /**
     * Oculta la vista de contacto removiendo la clase 'activa'
     * @public
     */
    ocultarVista() {
        const vista = document.querySelector('#vista-contacto');
        if (vista) vista.classList.remove('activa');
    }
}