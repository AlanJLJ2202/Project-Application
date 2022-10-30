import { Component, OnInit, OnDestroy} from '@angular/core';
import { Articulo } from '../articulo.model';
import { ArticuloService } from '../articulo.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-articulo-list',
  templateUrl: './articulo-list.component.html',
  styleUrls: ['./articulo-list.component.css']
})

export class ArticuloListComponent implements OnInit, OnDestroy {
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
  ngOnInit(){
    this.articulosService.getPosts();
    this.articuloSub = this.articulosService.getPostsUpadateListener()
    .subscribe((articulos: Articulo[]) =>{
      this.articulos = articulos;
    });

  }
  ngOnDestroy(){
    this.articuloSub.unsubscribe();
  }

  onDelete(postId: string){
    this.articulosService.deletePost(postId);
  }
}
