import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService) { }
  products: any;
  shopDesign: any;
  ngOnInit(): void {
    this.api.getMerchData().subscribe(res => {
      this.shopDesign = res.data.merchData.shopDesign;
      localStorage.setItem('merchData', JSON.stringify(res.data.merchData));
    });
    this.api.getProducts().subscribe(res => {
      this.products = res.data.products;
      console.log(this.products);
    });
  }

}
