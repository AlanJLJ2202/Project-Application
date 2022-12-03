import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { render } from 'creditcardpayments/creditCardPayments';


@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.component.html',
    styleUrls: ['./carrito.component.css']
})

export class CarritoComponent{

  constructor(){
    render(
      {
        id: "#myPaypalButtons",
        currency: "USD",
        value: "100.00",
        onApprove: (details) => {
          alert("Transaction Successfull");
        }
      }
    );
  }
}
