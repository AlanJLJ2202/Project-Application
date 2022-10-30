/*import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})

export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){

  }

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(name: string, title: string, content: string) {
    const post: Post = {name: name, title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
*/

import { Articulo } from "./articulo.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ArticuloService{
  private articulos: Articulo[] = []; //primera matriz
  private postUpdate = new Subject<Articulo[]>();

  constructor(private http: HttpClient){

  }

  getPosts(){
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api')//Aque ruta va a llegar la solicitud
    .pipe(map((postData)=>{
      return postData.posts.map(post=>{
        return{
        nombre: post.nombre,
        precio: post.precio,
        descripcion: post.descripcion,
        imagen: post.imagen,
        cantidad: post.cantidad,
        categoria: post.categoria,
        id: post._id
        };
      })
    }))
    .subscribe((transformedPosts)=>{
      this.articulos = transformedPosts;
      this.postUpdate.next([...this.articulos]);
    });
  }

  getPostsUpadateListener(){
    return this.postUpdate.asObservable();
  }

  getPost(id: string){
    return this.http.get<{_id: string, nombre: string, precio: number, descripcion: string, imagen: string, cantidad: number, categoria: string}>(
      "http://localhost:3000/api/" + id);//la ruta del lado del servidor
  }

  addPost(title: string, content: string, precio: number, descripcion: string, imagen: string, cantidad: number, categoria: string){
    const post: Articulo = {id: null, nombre: title, precio: precio, descripcion: descripcion, imagen: imagen, cantidad: cantidad, categoria: categoria};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api',post)
    .subscribe((responseData)=>{
      const id = responseData.postId;
      post.id=id;
      this.articulos.push(post);
      this.postUpdate.next([...this.articulos]);
    });
  }

  updatePost(
    id:string,
    nombre:string,
    precio:number,
    descripcion:string,
    categoria:string,
    imagen:string,
    cantidad:number){
    {
    const articulo: Articulo= {id:id, nombre:nombre, precio: precio, descripcion:descripcion, categoria:categoria, imagen:imagen, cantidad:cantidad};
    this.http.put("http://localhost:3000/api/" + id, articulo)
    .subscribe(response => {
    const updatePost=[...this.articulos];
    const oldPostIndex = updatePost.findIndex(p => p.id === articulo.id);
    updatePost[oldPostIndex]=articulo;
    this.articulos=updatePost;
    this.postUpdate.next([...this.articulos]);
  });}
    }


    deletePost(id: string){
      this.http.delete<{message: string}>('http://localhost:3000/api/' + id)
      .subscribe(()=>{
        const updatePosts = this.articulos.filter(post => post.id !== id);
        this.articulos = updatePosts;
        this.postUpdate.next([...this.articulos])
      });
    }
  }
