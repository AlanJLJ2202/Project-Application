import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { render } from 'creditcardpayments/creditCardPayments';
import { ICreateOrderRequest } from "ngx-paypal";
import { ArticuloService } from "../articulos/articulo.service";
import { Articulo } from "../articulos/articulo.model";
import { Subscription } from "rxjs";


@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.component.html',
    styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit{
  public payPalConfig: any;
  public showPaypalButtons: boolean;


  articulos: Articulo[] = [];
  private articuloSub: Subscription;
  public sumatoria:any = 0;

  constructor(public articulosService: ArticuloService){

  }

  ngOnInit() {
      this.articulosService.getArticulos();
      this.articuloSub = this.articulosService.getArticulosUpadateListener()
      .subscribe((articulos: Articulo[]) =>{
        articulos.forEach(articulo => {
          console.log('test', articulo.carrito);
          if(articulo.carrito == "true"){
            console.log('entra a la condicion');
            this.articulos.push(articulo);
            this.sumatoria = this.sumatoria + articulo.precio;
          }
        });
      });


    this.payPalConfig = {
      currency: "EUR",
      clientId: "Aeu1z2WebkCoboZdntNnr79SGMZPIEVSjB1Skd_MLfETDQprND2-fYKndl9R4n1S4_SwG3nr3ezDVXdh",
      createOrder: data =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: "9.99",
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: "9.99"
                  }
                }
              },
              items: [
                {
                  name: "Enterprise Subscription",
                  quantity: "1",
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: "EUR",
                    value: "9.99"
                  }
                }
              ]
            }
          ]
        },
      advanced: {
        commit: "true"
      },
      style: {
        label: "paypal",
        layout: "vertical"
      },
      onApprove: (data, actions) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then(details => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },
      onClientAuthorization: data => {
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
      },
      onError: err => {
        console.log("OnError", err);
      },
      onClick: (data, actions) => {
        console.log("onClick", data, actions);
      }
    };
  }

  pay() {
    this.showPaypalButtons = true;
  }

  back(){
    this.showPaypalButtons = false;
  }

  onSaveCarrito(id: string, nombre: string, precio: number, descripcion: string, cantidad: number, categoria: string, carrito:string,imagePath: string){
    this.articulosService.updateCarrito(id, nombre, precio, descripcion, cantidad, categoria, carrito, imagePath);
  }


}

