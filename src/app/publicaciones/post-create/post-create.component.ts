import { Component, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";



@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit{

  private mode = 'create';
  private postId: string;
  //post: Post;

    constructor (public route: ActivatedRoute){}


    ngOnInit(): void {

    }

    /*ngOnInit() {
      this.route.paramMap.subscribe((paramMap: ParamMap)=>{
        if(paramMap.has('postId')){
          this.mode='edit';
          this.postId=paramMap.get('postId');
          this.postsService.getPost(this.postId).subscribe(postData =>{
            this.post = {id: postData._id, nombre: postData.nombre, precio: postData.precio, descripcion: postData.descripcion, imagen: postData.imagen, cantidad: postData.cantidad, categoria: postData.categoria}
          });
        }else{
          this.mode='create';
          this.postId=null;
        }
      })
    }
    onSaveArticulo(form: NgForm){
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
}
