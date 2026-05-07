export default class Juego {
    #areaJuego;
    #vistaPuntuaciones;
    #jugador;
    #alimentos;
    #obstaculos;
    #teclas;
    #intervalo;
    #scoreElemento;
    score;

    constructor(vistaPuntuaciones) {
        this.#vistaPuntuaciones = vistaPuntuaciones;
        this.#areaJuego = document.getElementById('game-area');
        this.#scoreElemento = document.getElementById('game-score');

        if (!this.#areaJuego || !this.#scoreElemento) {
            throw new Error('No se encontraron los elementos del juego.');
        }

        this.#teclas = { ArrowUp: false, ArrowDown: false };
        this.#alimentos = [];
        this.#obstaculos = [];

        this.#activarEventos();
        this.#reiniciarEstado();
    }

    start() {
        this.#reiniciarEstado();
        this.#limpiarArea();
        this.#crearJugador();
        this.#intervalo = setInterval(this.#animar.bind(this), 16);
    }

    #reiniciarEstado() {
        this.score = 0;
        this.#alimentos = [];
        this.#obstaculos = [];
        this.#ultimoAlimento = 0;
        this.#ultimoObstaculo = 0;
        this.#actualizarScore();
        this.#jugador = null;
        if (this.#intervalo) {
            clearInterval(this.#intervalo);
        }
    }

    #activarEventos() {
        window.addEventListener('keydown', (evento) => {
            if (evento.key === 'ArrowUp' || evento.key === 'ArrowDown') {
                this.#teclas[evento.key] = true;
                evento.preventDefault();
            }
        });

        window.addEventListener('keyup', (evento) => {
            if (evento.key === 'ArrowUp' || evento.key === 'ArrowDown') {
                this.#teclas[evento.key] = false;
            }
        });
    }

    #crearJugador() {
        const player = document.createElement('div');
        player.classList.add('player');
        const areaAlto = this.#areaJuego.clientHeight;
        player.style.top = `${areaAlto / 2 - 16}px`;
        player.style.left = '20px';
        this.#areaJuego.appendChild(player);
        this.#jugador = player;
    }

    #limpiarArea() {
        this.#areaJuego.innerHTML = '';
    }

    #animar() {
        if (!this.#jugador) return;

        this.#moverJugador();
        this.#generarObjetos();
        this.#moverObjetos();
        this.#detectarColisiones();
        this.#eliminarFueraDePantalla();
    }

    #moverJugador() {
        const estilo = window.getComputedStyle(this.#jugador);
        let top = parseInt(estilo.top);
        const altoArea = this.#areaJuego.clientHeight;

        if (this.#teclas.ArrowUp) {
            top -= 4;
        }
        if (this.#teclas.ArrowDown) {
            top += 4;
        }

        if (top < 0) top = 0;
        if (top > altoArea - parseInt(estilo.height)) {
            top = altoArea - parseInt(estilo.height);
        }

        this.#jugador.style.top = `${top}px`;
    }

    #generarObjetos() {
        const tiempo = Date.now();
        if (!this.#ultimoAlimento || tiempo - this.#ultimoAlimento > 900) {
            this.#crearAlimento();
            this.#ultimoAlimento = tiempo;
        }
        if (!this.#ultimoObstaculo || tiempo - this.#ultimoObstaculo > 1400) {
            this.#crearObstaculo();
            this.#ultimoObstaculo = tiempo;
        }
    }

    #crearAlimento() {
        const alimento = document.createElement('div');
        alimento.classList.add('food');
        alimento.dataset.vel = '3';
        const alto = this.#areaJuego.clientHeight;
        alimento.style.top = `${20 + Math.random() * (alto - 60)}px`;
        alimento.style.left = `${this.#areaJuego.clientWidth}px`;
        this.#areaJuego.appendChild(alimento);
        this.#alimentos.push(alimento);
    }

    #crearObstaculo() {
        const obstaculo = document.createElement('div');
        obstaculo.classList.add('obstacle');
        obstaculo.dataset.vel = '4';
        const alto = this.#areaJuego.clientHeight;
        const altura = 24 + Math.random() * 48;
        obstaculo.style.height = `${altura}px`;
        obstaculo.style.top = `${20 + Math.random() * (alto - altura - 40)}px`;
        obstaculo.style.left = `${this.#areaJuego.clientWidth}px`;
        this.#areaJuego.appendChild(obstaculo);
        this.#obstaculos.push(obstaculo);
    }

    #moverObjetos() {
        this.#alimentos.forEach((alimento) => {
            const left = parseInt(alimento.style.left) - parseInt(alimento.dataset.vel);
            alimento.style.left = `${left}px`;
        });
        this.#obstaculos.forEach((obstaculo) => {
            const left = parseInt(obstaculo.style.left) - parseInt(obstaculo.dataset.vel);
            obstaculo.style.left = `${left}px`;
        });
    }

    #detectarColisiones() {
        const rectJugador = this.#jugador.getBoundingClientRect();

        this.#alimentos.forEach((alimento) => {
            if (this.#colisionRect(rectJugador, alimento.getBoundingClientRect())) {
                this.score += 10;
                this.#actualizarScore();
                alimento.remove();
                alimento.dataset.colision = 'si';
            }
        });

        this.#alimentos = this.#alimentos.filter((alimento) => !alimento.dataset.colision);

        if (this.#obstaculos.some((obstaculo) => this.#colisionRect(rectJugador, obstaculo.getBoundingClientRect()))) {
            this.#gameOver();
        }
    }

    #eliminarFueraDePantalla() {
        this.#alimentos = this.#alimentos.filter((alimento) => {
            const fuera = parseInt(alimento.style.left) + parseInt(alimento.style.width) < 0;
            if (fuera) alimento.remove();
            return !fuera;
        });
        this.#obstaculos = this.#obstaculos.filter((obstaculo) => {
            const fuera = parseInt(obstaculo.style.left) + parseInt(obstaculo.style.width) < 0;
            if (fuera) obstaculo.remove();
            return !fuera;
        });
    }

    #colisionRect(a, b) {
        return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    }

    #actualizarScore() {
        this.#scoreElemento.textContent = this.score.toString();
    }

    #gameOver() {
        clearInterval(this.#intervalo);
        this.#intervalo = null;

        let nombre = window.prompt('Juego terminado. Ingresa tu nombre para guardar la puntuación:', 'Jugador');
        if (!nombre) nombre = 'Jugador';

        if (this.#vistaPuntuaciones?.agregarPuntuacion) {
            this.#vistaPuntuaciones.agregarPuntuacion(nombre, this.score);
        }
    }
}
