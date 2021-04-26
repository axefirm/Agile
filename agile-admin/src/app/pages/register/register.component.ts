import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
    this.main = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      password: new FormControl('', [Validators.required]),
      isMerch: new FormControl(true),
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

  signup() {
    if (this.main.valid) {
      this.api.signup(this.main.value).subscribe(res => {
        if (res.success) {
          sessionStorage.setItem('custId', res.data.id);
          this.router.navigate(['create']);
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
