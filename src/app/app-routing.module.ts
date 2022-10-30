import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoComponent } from './contenido/body/contenido.component';
import { ArticuloAddComponent } from './articulos/articulo-add/articulo-add.component';
import { PostListComponent } from './publicaciones/post-list/post-list.component';

const routes: Routes = [
  {path: '', component: ContenidoComponent},
  {path: 'create', component: ArticuloAddComponent},//A donde queremos llegar localHost/4200.crete
  //{path: 'edit/:postId', component: PostCreateComponent}//obtener el id al editar
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
