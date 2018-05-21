import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  mensaje: string;
  n_propuesta: number;
  jugador: any;
  evaluacion: string;
  juego = {'modo':'', 'enEjecusion':'', 'fin':''};

  constructor() {}

  ngOnInit() {
    this.mensaje = "Bienvenido. Jugaremos con números entre 0 y 100";
    this.evaluacion = "";
    this.juego = {'modo':'', 'enEjecusion':'', 'fin':''};
  }

  iniciarJuegoPc(){
    let juegoPC: JuegoPc = new JuegoPc();
    this.jugador = juegoPC;
    this.juego = {'modo': "PC", 'enEjecusion': "true", 'fin' : null};
  }

  iniciarJuegoHumano(){
    let juegoHumano: JuegoHumano = new JuegoHumano();
    this.jugador = juegoHumano;
    this.juego = {'modo': "Humano", 'enEjecusion': "true", 'fin' : null};
  }

  jugar(e){
      this.juego.fin = this.jugador.evaluar(e);
  }

}

export abstract class Juego {

    n_incognito: number;
    n_propuesta: number;
    n_mayor: number;
    n_menor: number;
    evaluacion: string;
    fin: boolean;

    constructor() {
        this.n_menor = 0;
        this.n_mayor = 100;
        this.evaluacion = "";
        this.fin = null;
    }

    abstract evaluar(e): boolean;

}

export class JuegoPc extends Juego{

  constructor(){
    super();
    this.n_incognito = Math.floor(Math.random() * (101 - 0)) + 0;
  }

  evaluar(): boolean{
    if(this.n_incognito == this.n_propuesta)
      return true;
    else {
      if(this.n_incognito > this.n_propuesta)
        this.evaluacion = "mayor";
      else
        this.evaluacion = "menor";
      return false;
    }
  }

}

export class JuegoHumano extends Juego{

  constructor(){
    super();
    this.n_propuesta= 50;
  }

  evaluar(e):boolean{
    this.evaluacion = e;

    if(this.evaluacion == "igual"){
      this.n_incognito = this.n_propuesta;
      return true;
    }
    else if((((this.n_propuesta - this.n_menor) == 2) && (this.n_mayor != 100 && this.n_menor != 0) ) || this.n_propuesta + 1 == 100 || this.n_propuesta - 1 == 0){
      if(this.evaluacion == "mayor")
        this.n_incognito = this.n_propuesta + 1;
      if(this.evaluacion == "menor")
        this.n_incognito = this.n_propuesta - 1;
      return true;
    }
    else{
      if(this.evaluacion == "mayor"){
          this.n_menor = this.n_propuesta;
          if((this.n_mayor - this.n_menor) > 10)
              this.n_propuesta += Math.round((this.n_mayor - this.n_menor)/4);
          else
              this.n_propuesta += Math.round((this.n_mayor - this.n_menor)/2);
      }
      else if(this.evaluacion == "menor"){
          this.n_mayor = this.n_propuesta;
          this.n_propuesta -= Math.round((this.n_mayor - this.n_menor)/4);
      }
      console.log(this.n_propuesta + " " + this.n_incognito + " " + this.n_mayor + " " + this.n_menor);
      return false;
    }
  }

}