import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-product-detail1',
  templateUrl: './product-detail1.component.html',
  styleUrls: ['./product-detail1.component.css']
})
export class ProductDetail1Component implements OnInit, OnChanges {
  @Input() product;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private auth: AuthService) { }

  photos = [];
  photo;

  main: FormGroup;

  ngOnInit(): void {
    console.log(this.product);
    this.init();
    this.main = this.formBuilder.group({
      quantity: new FormControl('', [Validators.required]),
    });
  }

  setPhoto(i) {
    this.photo = i;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.product = changes.product.currentValue;
    console.log(this.product);
    this.init();
  }

  init() {
    this.photos = [this.product?.photo];
    this.photo = this.photos[0];
  }
  plus() {
    this.main.value.quantity++;
    this.main.controls['quantity'].setValue(this.main.value.quantity);
  }
  minus() {
    if (this.main.value.quantity > 1) {
      this.main.value.quantity--;
    }
    this.main.controls['quantity'].setValue(this.main.value.quantity);
  }
  order() {
    if (this.main.valid) {
      let req = this.main.value;
      req.prodId = this.product._id;
      if (this.auth.isAuthenticated()) {
        this.api.order(req).subscribe(res => {
          console.log(res);
          if (res.success) {
            alert(res.data.message);
          }
        })
      } else {
        alert("Нэврэх хэсгээр нэвтэрсний дараа бараа захиалах боломжтой.");
      }
    } else {
      alert("Талбар дутуу байна.");
    }
  }
}
