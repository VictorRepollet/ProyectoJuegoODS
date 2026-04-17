import ModeloPuntuaciones from '../modelos/modelo-puntuaciones.js';

export default class VistaPuntuaciones {
    #modeloPuntuaciones;

    // Referencias formulario puntuaciones
    #nombrePunt;
    #puntuacion;
    #btnPuntuacion;
    #btnMostrarPuntuacion;
    #formPuntuaciones;
    #cuerpoRanking;

    constructor() {
        this.#modeloPuntuaciones = new ModeloPuntuaciones();
        this.#obtenerReferenciasIU();
        this.#configurarEventos();
    }

    // ─────────────────────────────────────────────
    //  REFERENCIAS AL DOM
    // ─────────────────────────────────────────────
    #obtenerReferenciasIU() {
        this.#nombrePunt = document.querySelector('#nombre-punt');
        this.#puntuacion = document.querySelector('#puntuacion');
        this.#btnPuntuacion = document.querySelector('#btn-puntuacion');
        this.#btnMostrarPuntuacion = document.querySelector('#btn-mostrar-puntuacion');
        this.#formPuntuaciones = document.querySelector('#form-puntuaciones');
        this.#cuerpoRanking = document.querySelector('#cuerpo-ranking');
    }

    // ─────────────────────────────────────────────
    //  EVENTOS
    // ─────────────────────────────────────────────
    #configurarEventos() {
        this.#btnPuntuacion.addEventListener('click', () => this.enviarPuntuacion());
        this.#btnMostrarPuntuacion.addEventListener('click', () => this.mostrarPuntuaciones());
    }

    // ─────────────────────────────────────────────
    //  ENVIAR PUNTUACIÓN
    // ─────────────────────────────────────────────
    enviarPuntuacion() {
        const nombre = this.#nombrePunt.value.trim();
        const puntos = parseInt(this.#puntuacion.value);

        // Validación básica
        if (!nombre || isNaN(puntos) || puntos < 0) {
            alert('Por favor, ingresa un nombre válido y una puntuación positiva.');
            return;
        }

        const nuevaPuntuacion = {
            nombre,
            puntuacion: puntos
        };

        this.#modeloPuntuaciones.agregarPuntuacion(nuevaPuntuacion);
        alert(`Puntuación de "${nombre}" enviada: ${puntos} puntos.`);

        // Resetear formulario
        this.#formPuntuaciones.reset();
    }

    // ─────────────────────────────────────────────
    //  MOSTRAR PUNTUACIONES
    // ─────────────────────────────────────────────
    mostrarPuntuaciones() {
        const puntuaciones = this.#modeloPuntuaciones.listarOrdenadasDesc();

        this.#cuerpoRanking.innerHTML = '';

        if (puntuaciones.length === 0) {
            this.#cuerpoRanking.innerHTML = '<p>No hay puntuaciones registradas.</p>';
            return;
        }

        const tabla = document.createElement('table');
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th>Posición</th>
                    <th>Nombre</th>
                    <th>Puntuación</th>
                </tr>
            </thead>
            <tbody>
                ${puntuaciones.map((p, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${p.nombre}</td>
                        <td>${p.puntuacion}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;

        this.#cuerpoRanking.appendChild(tabla);
    }
}