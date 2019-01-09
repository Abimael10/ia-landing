//CONTRUCTOR
const escritor = function(txtElement, pregunta, espera = 6000) {
    this.txtElement = txtElement;
    this.pregunta = pregunta;
    this.txt = '';
    this.wordIndex = 0;
    this.espera = parseInt(espera, 10);
    this.type();
    this.isDeleting = false;
}

//TYPE METHOD
escritor.prototype.type = function() {
    const textoCompleto = this.pregunta;

    //Revisar si está borrando
    if(this.isDeleting) {
        //Remover letra
        this.txt = textoCompleto.substring(0, this.txt.length - 1);
    } else {
        //Agregar letra
        this.txt = textoCompleto.substring(0, this.txt.length + 1);
    }

    //Insertar text dentro del elemento
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    //Velocidad de escritura inicial
    let velocidad = 200;

    if(this.isDeleting){
        velocidad /= 2;
    }

    //Si la palabra está completa
    if(!this.isDeleting && this.txt === textoCompleto) {
        //Hacer pausa al final
        velocidad = this.espera;

        //Hacer que delete sea boolean true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;

        //Hacer pausa antes de escribir de nuevo
        velocidad = 500;
    }

    setTimeout(() => this.type(), velocidad);
}

//Init on DOM load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init() {
    const txtElement = document.querySelector('.escritor');
    const pregunta = txtElement.getAttribute('data-pregunta');
    const espera = txtElement.getAttribute('data-espera');

    //Init Escritor
    new escritor(txtElement, pregunta, espera);
}