import { Component, OnInit } from '@angular/core';
import {tween} from "../../../services/globals";

@Component({
  selector: 'app-ord-deling',
  templateUrl: './ord-deling.page.html',
  styleUrls: ['./ord-deling.page.scss'],
})
export class OrdDelingPage implements OnInit {
  public container: HTMLElement;
  
  constructor() { }

  ngOnInit() {
    this.container = document.getElementById("main-container");
    
    tween(this.container, "slideInRight", "fast", null, () => {
      
    });
  }
  
  

}
