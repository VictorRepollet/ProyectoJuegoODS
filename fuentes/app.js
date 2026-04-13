//US1- Carlos Soriano
// Esperar a que cargue todo
document.addEventListener("DOMContentLoaded", () => {
    // ===== BOTONES =====
    const btnRegistro = document.querySelector(".registro");
    const btnContacto = document.querySelector(".contacto");
    const btnJugar = document.querySelector(".jugar");
    const btnRanking = document.querySelector(".rank");
    // ===== VISTAS =====
    const vistaRegistro = document.querySelector("#vista-registro");
    const vistaContacto = document.querySelector("#vista-contacto");
    const vistaManual = document.querySelector(".bloque-manual");
    // ===== FUNCIÓN: OCULTAR TODAS =====
    function ocultarVistas() {
        document.querySelectorAll(".vista").forEach(v => {
            v.classList.remove("activa");
        });
    }
    // ===== EVENTOS =====
    // REGISTRO
    btnRegistro.addEventListener("click", () => {
        ocultarVistas();
        vistaRegistro.classList.add("activa");
    });
    // CONTACTO
    btnContacto.addEventListener("click", () => {
        ocultarVistas();
        vistaContacto.classList.add("activa");
    });
    // JUGAR
    btnJugar.addEventListener("click", () => {
        ocultarVistas();
        alert("Aquí irá el juego ");
    });
    // RANKING
    btnRanking.addEventListener("click", () => {
        ocultarVistas();
        alert("Aquí irá el ranking ");
    });
    //Fin HU1
});