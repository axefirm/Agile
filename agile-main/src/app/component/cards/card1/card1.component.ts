import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card1',
  templateUrl: './card1.component.html',
  styleUrls: ['./card1.component.css']
})
export class Card1Component implements OnInit {
  @Input() product;
  constructor() { }

  ngOnInit(): void {
    console.log(this.product);
  }

}
