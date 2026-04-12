
export default class Vista {
    #controlador
    //Referencias del interfaz de usuario
    #inputNombre
    #inputFechaNacimiento
    #boton
    #tbody

    constructor(controlador){
        console.log('Vista creada');
        this.#controlador = controlador;
        this.#obtenerReferenciasIU;
        this.#boton.addEventListener('click', this.#insertar.bind(this))
        
    }

    #obtenerReferenciasIU(){
         this.#boton = document.querySelector('button');
        this.#inputNombre = document.querySelector('input');
        this.#inputFechaNacimiento = document.querySelector('input[type="date"]');
        this.#tbody = document.querySelectorAll('tbody')[1];
        console.log(this.#tbody);
    }

    #insertar(){
        console.log('Pulsado insertar');
        const nombre = this.#inputNombre.value;
        const fechaNacimiento = this.#inputFechaNacimiento.value
        //Aqui falta la validacion de datos 
        const datos = {
            'nombre': nombre,
            'fechaNacimiento' : fechaNacimiento
        }
        this.#controlador.insertar(datos);
    }
    listar(alumnos){
        this.#tbody.innerHTML = '';//Esto borra su html interno
        alumnos.forEach( alumno => {
                    <tr>
                        <td>Alejandro</td>
                        <td>30/12/1999</td>
                    </tr>
                const tr = document.createElement('tr');
                const tdNombre = document.createElement('td');
                tr.appendChild(tdNombre);
                tdNombre.textContent(alumno.getNombre());

                const tdFechaNacimiento = document.createElement('td');
                tr.appendChild(tdFechaNacimiento);
                tdFechaNacimiento.textContent(alumno.getFechaNacimiento());
        })
    }
}