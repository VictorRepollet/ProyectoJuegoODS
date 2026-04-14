export default class modeloPuntuacion{
    #puntuaciones;

    constructor(){
        this.#puntuaciones = new Set()
    }

    agregarPuntuacion(puntuacion){
        this.#puntuaciones.add(puntuacion);
    }

    listar(){
        return this.#puntuaciones;
    }
}