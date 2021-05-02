import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private api: ApiService) { }

  products: any;

  ngOnInit(): void {
    this.api.getProducts().subscribe(res => {
      this.products = res.data.products;
      console.log(this.products);
    })
  }
}
