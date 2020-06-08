import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  public page_title: string;
  constructor() { 
    this.page_title = 'Error - NotFound';
  }

  /* usamos jquery para nuestro propio beneficio y personalizar aun más el ERROR 404 */
  ngOnInit(): void {
    $("#footer").removeAttr('id').addClass("footerBlack");
    $('hr').hide();
  }


  
}
