import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-mini',
  templateUrl: './product-mini.component.html',
  styleUrls: ['./product-mini.component.css']
})
export class ProductMiniComponent implements OnInit {

  constructor() { }

  photo = 'background.png';
  ngOnInit(): void {

  }

}
