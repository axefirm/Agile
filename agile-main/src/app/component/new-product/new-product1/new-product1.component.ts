import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-product1',
  templateUrl: './new-product1.component.html',
  styleUrls: ['./new-product1.component.scss']
})
export class NewProduct1Component implements OnInit {
  @Input() products; 
  constructor() { }

  ngOnInit(): void {
  }

}
