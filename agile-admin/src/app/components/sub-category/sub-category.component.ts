import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  @Input() data;
  @Input() function;
  @Input() multiple = false;
  
  constructor() { }


  ngOnInit(): void {
  }

}
