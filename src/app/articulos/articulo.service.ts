import { Articulo } from "./articulo.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import {map} from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})

export class ArticuloService{
  private articulos: Articulo[] = []; //primera matriz
  private articuloUpdate = new Subject<Articulo[]>();

  constructor(private http: HttpClient, private router: Router){

  }

  getArticulos(){
    this.http.get<{message: string, articulos: any}>('http://localhost:3000/api')//Aque ruta va a llegar la solicitud
    .pipe(map((articuloData)=>{
      return articuloData.articulos.map(articulo => {
        return{
        nombre: articulo.nombre,
        precio: articulo.precio,
        descripcion: articulo.descripcion,
        cantidad: articulo.cantidad,
        categoria: articulo.categoria,
        id: articulo._id
        };
      })
    }))
    .subscribe((transformedArticulos)=>{
      this.articulos = transformedArticulos;
      this.articuloUpdate.next([...this.articulos]);
    });
  }

  getArticulosUpadateListener(){
    return this.articuloUpdate.asObservable();
  }

  getArticulo(id: string){
    return this.http.get<{
      _id: string,
      nombre: string,
      precio: number,
      descripcion: string,
      cantidad: number,
      categoria: string,
      imagePath: string}>(
      "http://localhost:3000/api/" + id); //la ruta del lado del servidor
  }

  addArticulo(nombre: string, precio: number, descripcion: string, cantidad: number, categoria: string){

    const articulo: Articulo =
    { id: null,
      nombre: nombre,
      precio: precio,
      descripcion: descripcion,
      cantidad: cantidad,
      categoria: categoria,
      imagePath: responseData.post.imagePath};


    this.http.post<{message: string, articuloId: string}>('http://localhost:3000/api', articulo)
    .subscribe((responseData)=>{
      const id = responseData.articuloId;
      articulo.id=id;
      this.articulos.push(articulo);
      this.articuloUpdate.next([...this.articulos]);
      this.router.navigate(["/"]);
    });
  }

  updateArticulo(
    id:string,
    nombre:string,
    precio:number,
    descripcion:string,
    cantidad:number,
    categoria:string){
    {

    const articulo: Articulo =
    {id:id, nombre:nombre, precio: precio, descripcion:descripcion, categoria:categoria, cantidad:cantidad};

    this.http.put("http://localhost:3000/api/" + id, articulo)
    .subscribe(response => {

    console.log(response);

    const updateArticulo=[...this.articulos];
    const oldPostIndex = updateArticulo.findIndex(p => p.id === articulo.id);
    updateArticulo[oldPostIndex]=articulo;
    this.articulos=updateArticulo;
    this.articuloUpdate.next([...this.articulos]);
    this.router.navigate(["/"]);
      });}
    }


    deleteArticulo(id: string){
      this.http.delete<{message: string}>('http://localhost:3000/api/' + id)
      .subscribe(()=>{
        const updatePosts = this.articulos.filter(post => post.id !== id);
        this.articulos = updatePosts;
        this.articuloUpdate.next([...this.articulos])
      });
    }
  }
