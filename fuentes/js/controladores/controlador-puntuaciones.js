import Puntuacion from '../modelos/puntuaciones';
import modeloPuntuacion from '../modelos/modelo-puntuaciones';

class controladorPuntuaciones{
    #puntuacion
    #tbody
    #nombre
    #bton_puntuacion
    #btn_listar
    constructor(app){}
}

// 1. Obtener botón e inputs de formulario de Puntuaciones.
const BTN_PUNTUACION = document.querySelector('#btn-puntuacion');
const INPUT_NOMBRE = document.querySelector('#nombre-punt');
const INPUT_PUNTUACION = document.querySelector('#puntuacion');

// 2. Eventos

// 3. Funciones
function capturar(evento){
    evento.preventDefault();
    let nombre = INPUT_NOMBRE.value;
    let punt = parseInt(INPUT_PUNTUACION.value);
    let puntuacion = new Puntuacion(nombre, punt)
}

function listar(){

}