import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticuloService } from '../articulo.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Articulo } from '../articulo.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-articulo-add',
  templateUrl: './articulo-add.component.html',
  styleUrls: ['./articulo-add.component.css']
})

export class ArticuloAddComponent implements OnInit{

  private mode = "create";
  private id : string;
  public articulo: Articulo;
  public seleccionado = "Ropa";
  public selectControl : FormControl = new FormControl();
  public spinner = true;
  form: FormGroup;
  imagePreview: string;

  constructor (public articuloService: ArticuloService, public router: ActivatedRoute) {}

  ngOnInit(){

    console.log(this.spinner);

    setTimeout(() =>{this.spinner = false;},2500);

    console.log(this.spinner);

    this.form = new FormGroup({
      "nombre": new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]}),
      "precio": new FormControl(null, {
        validators: [Validators.required]}),
      "descripcion": new FormControl(null, {
        validators: [Validators.required]}),
      "categoria": new FormControl(null, {
        validators: [Validators.required]}),
      'image': new FormControl(null,{
        validators: [Validators.required],
      asyncValidators: [mimeType]})
    });

    this.router.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')){
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.articuloService.getArticulo(this.id).subscribe(articuloData => {
          this.articulo = {
            id: articuloData._id,
            nombre: articuloData.nombre,
            precio: articuloData.precio,
            descripcion: articuloData.descripcion,
            cantidad: articuloData.cantidad,
            categoria: articuloData.categoria,
            imagePath: articuloData.imagePath};
            this.form.setValue({
              nombre: this.articulo.nombre,
              precio: this.articulo.precio,
              descripcion: this.articulo.descripcion,
              categoria: this.articulo.categoria,
              image: this.articulo.imagePath
            });
        });

      }else{
        this.mode = 'create';
        this.id = null;
      }
    });
 }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  onFileSelected(event){
    console.log(event);
  }

  test(){
      this.seleccionado = this.selectControl.value;
  }



  onSaveArticulo(form: NgForm){
    if(form.invalid){
      return;
    }
    if(this.mode == "create"){

      console.log(this.seleccionado);

      this.articuloService.addArticulo(
        form.value.nombre,
        form.value.precio,
        form.value.descripcion,
        form.value.cantidad,
        this.seleccionado
        );


    }else{

      console.log('entra en actualizar');

      this.articuloService.updateArticulo(
        this.id,
        form.value.nombre,
        form.value.precio,
        form.value.descripcion,
        form.value.cantidad,
        this.seleccionado
      );
    }
  form.resetForm();
  }
}



