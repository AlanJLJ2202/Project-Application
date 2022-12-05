import { Component, OnInit } from "@angular/core";
import { ArticuloService } from "../articulos/articulo.service";
import { Articulo } from "../articulos/articulo.model";
import { Subscription } from "rxjs";




@Component({
    selector: 'app-mejores-precios',
    templateUrl: './precios.component.html',
    styleUrls: ['./precios.component.css']
})

export class MejorespreciosComponent {

  articulos: Articulo[] = [];
  private articuloSub: Subscription;

  constructor(public articulosService: ArticuloService){

  }

  ngOnInit() {
    this.articulosService.getArticulos();
      this.articuloSub = this.articulosService.getArticulosUpadateListener()
      .subscribe((articulos: Articulo[]) =>{
        articulos.forEach(articulo => {
          console.log('test', articulo.carrito);
          if(articulo.precio < 100){
            console.log('entra a la condicion');
            this.articulos.push(articulo);
          }
        });
      });
  }

}
