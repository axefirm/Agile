import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  product: any;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.api.getProductDetail(id).subscribe(res => {
      if(res.success){
        this.product = res.data.product;
      }
    })
  }


}
