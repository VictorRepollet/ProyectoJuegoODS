export default class Modelo{
    #alumnos

    constructor(){
        this.#alumnos = new Set();
    }

    agregarAlumno(alumno){
        this.#alumnos.add(alumno);
        console.log(this.#alumnos);
    }

    listar(){
        return this.#alumnos
    }
}