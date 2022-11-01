import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ArticuloService } from '../articulo.service';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from '../articulo.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-articulo-add',
  templateUrl: './articulo-add.component.html',
  styleUrls: ['./articulo-add.component.css']
})



export class ArticuloAddComponent {

  mode = "create";
  private id : string;
  public articulo: Articulo;
  public seleccionado = "Ropa";
  public selectControl : FormControl = new FormControl();

  constructor (public articuloService: ArticuloService, public router: ActivatedRoute) {

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

      /*this.articuloService.addArticulo(
        form.value.nombre,
        form.value.precio,
        form.value.descripcion,
        null,
        form.value.cantidad,
        form.value.categoria
        );*/


    }else{
      this.articuloService.updateArticulo(
        this.id,
        form.value.nombre,
        form.value.precio,
        form.value.descripcion,
        null,
        form.value.cantidad,
        form.value.categoria
      );
    }
  form.resetForm();
  }
}



