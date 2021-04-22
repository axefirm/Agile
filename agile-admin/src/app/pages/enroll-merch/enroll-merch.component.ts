import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-enroll-merch',
  templateUrl: './enroll-merch.component.html',
  styleUrls: ['./enroll-merch.component.scss']
})
export class EnrollMerchComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private router: Router, private api: ApiService, private auth: AuthService) { }

  //#region [Carousel related variables]
  indicator = 0;
  maxIndex = 3;
  carouselInterval;
  //#endregion

  //#region [Formgroup]

  main: FormGroup;

  //#endregion
  ngOnInit(): void {
    this.intervalRequest();
    var custId = sessionStorage.getItem('custId');
    this.main = this.formBuilder.group({
      custId: new FormControl(custId),
      shopName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      address: new FormControl('', [Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(40)]),
      telephone: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      detail: new FormControl('', [Validators.maxLength(100)]),
      domain: new FormControl('', [Validators.required]),
    });
  }

  next(input: number) {
    this.intervalRequest();
    if (input < this.maxIndex) {
      this.indicator = input;
    } else {
      this.indicator = 0;
    }
  }

  intervalRequest() {
    clearInterval(this.carouselInterval);
    this.carouselInterval = setInterval(() => {
      this.next(this.indicator + 1);
    }, 6000);
  }

  createShop() {
    if (this.main.valid) {
      console.log(this.main.value);
      this.api.createShop(this.main.value).subscribe(res => {
        console.log(res);
        if (res.success) {
          alert(res.data.message);
          this.router.navigate(['']);
        } else {
          console.log(res);
          alert(res.data.message);
        }
      }, err => {
        alert(err);
      }
      );
    }
  }
}
