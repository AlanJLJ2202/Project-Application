import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-articulo-add',
  templateUrl: './articulo-add.component.html',
  styleUrls: ['./articulo-add.component.css']
})

export class ArticuloAddComponent{
  onAddArticulo(form: NgForm){
    if (form.invalid) {
      return;
    }else{
      console.log("Articulo agregado");
    }
  }
}


/*onSavePost(form: NgForm){
  if(form.invalid){
    return;
  }
  if(this.mode == "create"){
    this.postsService.addPost(form.value.title, form.value.content);
  }else{
    this.postsService.updatePost(
      this.postId,
      form.value.title,
      form.value.content
    );
  }
form.resetForm();
}*/
