import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
  }

}
