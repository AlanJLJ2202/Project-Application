import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';


@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})


export class ContenidoComponent{

  public spinner = true;

  constructor() { }

  ngOnInit(){
    setTimeout(() =>{this.spinner = false;},2500);
  }


}
