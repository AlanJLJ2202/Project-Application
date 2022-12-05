import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';


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
    this.search.valueChanges.subscribe;
  }

    search = new FormControl('');


}
