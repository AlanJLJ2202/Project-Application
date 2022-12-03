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
        id: articulo._id,
        imagePath: articulo.imagePath
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

  addArticulo(nombre: string, precio: number, descripcion: string, cantidad: number, categoria: string, image: File){
    const postData = new FormData();
    let precioAsString: string = String (precio);
    let cantidadAsString: string = String (cantidad);
    postData.append("nombre", nombre);
    postData.append("precio", precioAsString);
    postData.append("descripcion", descripcion);
    postData.append("cantidad", cantidadAsString);
    postData.append("categoria", categoria);
    postData.append("image", image, nombre);
    /*const articulo: Articulo =
    { id: null,
      nombre: nombre,
      precio: precio,
      descripcion: descripcion,
      cantidad: cantidad,
      categoria: categoria,
      imagePath: responseData.post.imagePath};*/


    this.http.post<{message: string, articulo: Articulo}>('http://localhost:3000/api', postData)
    .subscribe((responseData)=>{
      const articulo: Articulo ={
        id: responseData.articulo.id,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        cantidad: cantidad,
        categoria: categoria,
        imagePath: responseData.articulo.imagePath}
      /*const id = responseData.articuloId;
      articulo.id=id;*/
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
    categoria:string,
    image: File | string){

    let postData: Articulo | FormData;
    let precioAsString: string = String (precio);
    let cantidadAsString: string = String (cantidad);
    if(typeof image === "object"){
      postData = new FormData();
      postData.append("id", id);
      postData.append("nombre", nombre);
      postData.append("precio", precioAsString);
      postData.append("descripcion", descripcion);
      postData.append("cantidad", cantidadAsString);
      postData.append("categoria", categoria);
      postData.append("image", image, nombre);
    }else{
      postData ={
        id: id,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        cantidad: cantidad,
        categoria: categoria,
        imagePath: image
      };
    }

    /*const articulo: Articulo =
    {id:id, nombre:nombre, precio: precio, descripcion:descripcion, categoria:categoria, cantidad:cantidad};*/

    this.http.put("http://localhost:3000/api/" + id, postData)
    .subscribe(response => {
    const updateArticulo=[...this.articulos];
    const oldPostIndex = updateArticulo.findIndex(p => p.id === id);
    const articulo: Articulo ={
        id: id,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        cantidad: cantidad,
        categoria: categoria,
        imagePath: ""
    }
    updateArticulo[oldPostIndex]=articulo;
    this.articulos=updateArticulo;
    this.articuloUpdate.next([...this.articulos]);
    this.router.navigate(["/"]);
      });
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
