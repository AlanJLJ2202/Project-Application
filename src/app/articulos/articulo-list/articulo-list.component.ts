import { Component, OnInit, OnDestroy} from '@angular/core';
import { Articulo } from '../articulo.model';
import { ArticuloService } from '../articulo.service';
import { Subscription } from 'rxjs';
import { FormControl, NgForm } from '@angular/forms';



@Component({
  selector: 'app-articulo-list',
  templateUrl: './articulo-list.component.html',
  styleUrls: ['./articulo-list.component.css']
})

export class ArticuloListComponent implements OnInit, OnDestroy {
  mode = "create";
 /* posts = [
    {title: "Primer post", content: "Este es el contenido del primer post"},
    {title: "Segundo post", content: "Este es el contenido del segundo post"},
    {title: "Tercero post", content: "Este es el contenido del tercer post"}
  ]*/

  articulos: Articulo[] = [];
  private articuloSub: Subscription;

  //private postSub: Subscription;

  constructor(public articulosService: ArticuloService){

  }

  search = new FormControl('');
  dataSource:any;

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  ngOnInit(){
    this.articulosService.getArticulos();
    this.articuloSub = this.articulosService.getArticulosUpadateListener()
    .subscribe((articulos: Articulo[]) =>{
      this.articulos = articulos;
      this.dataSource = articulos;
    });
    this.search.valueChanges.subscribe;
  }
  ngOnDestroy(){
    this.articuloSub.unsubscribe();
  }

  onDelete(id: string){
    this.articulosService.deleteArticulo(id);
  }


  onSaveCarrito(id: string, nombre: string, precio: number, descripcion: string, cantidad: number, categoria: string, carrito:string,imagePath: string){
      this.articulosService.updateCarrito(id, nombre, precio, descripcion, cantidad, categoria, carrito, imagePath);
  }

}
