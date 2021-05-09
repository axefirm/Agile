import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
// install Swiper modules
SwiperCore.use([Pagination, Navigation]);
@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.scss']
})
export class EditShopComponent implements OnInit {
  @ViewChild('newSwiper') newSwiper: any;

  index = 0;
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.api.getMerchData().subscribe(res => {
      console.log(res);
    });
  }

  onSwiper(swiper) {
    console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
  }

  onIndexChange(index) {
    // this.index = index;
    // console.log(this.index);
  }
  submit() {
    console.log(this.index);
  }
}
