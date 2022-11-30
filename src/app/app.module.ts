import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//import { MatCarouselModule } from '@ngmodule/material-carousel';

import { ArticuloListComponent } from './articulos/articulo-list/articulo-list.component';
import { ArticuloService } from './articulos/articulo.service';
import { PostService } from './publicaciones/post.service';
import { HeaderComponent } from './contenido/header/header.component';
import { PostCreateComponent } from './publicaciones/post-create/post-create.component';
import { PostListComponent } from './publicaciones/post-list/post-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ArticuloAddComponent } from './articulos/articulo-add/articulo-add.component';
import { ContenidoComponent } from './contenido/body/contenido.component';
import { FooterComponent } from './contenido/footer/footer.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DndDirective } from './dnd.directive';
import { CarritoComponent } from './carrito/carrito.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticuloAddComponent,
    ArticuloListComponent,
    PostCreateComponent,
    PostListComponent,
    ContenidoComponent,
    FooterComponent,
    CarritoComponent,
    DndDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    ScrollingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ArticuloService,
    PostService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
