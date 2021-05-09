import { Component } from '@angular/core';
import { ApiService } from './core/service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agile-main';
  init = true;
  constructor(private api: ApiService) {
    if (this.init) {
      this.api.getMerchData().subscribe(res => {
        if (res.success) {
          localStorage.setItem('shopDesign', JSON.stringify(res.shopDesign));
          this.init = false;
        }
      })
    }
  }
}
