import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoComponent } from './contenido/body/contenido.component';
import { ArticuloAddComponent } from './articulos/articulo-add/articulo-add.component';
import { ArticuloListComponent } from './articulos/articulo-list/articulo-list.component';
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [
  {path: '', component: ContenidoComponent},
  {path: 'create', component: ArticuloAddComponent},//A donde queremos llegar localHost/4200.crete
  {path: 'edit/:id', component: ArticuloAddComponent}, //obtener el id al editar
  {path: 'carrito', component: CarritoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
