import { Component, EventEmitter, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{

ngOnInit(){
  this.search.valueChanges.subscribe
}
  search = new FormControl('');

  //@Output('search') SearchEmitter = new EventEmitter<string>();
}
