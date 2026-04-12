import Vista from './vistas/vista.js';
import Alumno from './modelos/alumno.js';
import Modelo from './modelos/modelo.js';

class Controlador{
    #vista
    #modelo

    constructor(){
        console.log('Controlador creado');
        this.#vista = new Vista(this);
        this.#modelo = new Modelo();
    }
    insertar(datos){
        console.log('Controlador .insertar');
        //Aqui iran las validaciones de negocio
        const alumno = new Alumno(datos.nombre, datos.fechaNacimiento);
        this.#modelo.agregarAlumno(alumno);
        //Ahora cambiaria de vista e informaria al ususario del resultado 
        this.#listar()
        }
        #listar(){
            const datos = this.#modelo.listar();
            this.#vista.listar(datos);
            
        }
}

//Lanzador
document.addEventListener('DOMContentLoaded', () => {
        new Controlador()
})
