import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      password: new FormControl('', [Validators.required]),
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


  login() {
    if (this.main.valid) {
      this.api.login(this.main.value).subscribe(res => {
        if (res.success) {
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('custId', res.data._id);
          
          this.router.navigate(['dashboard']);
        }
      }, err => {
        console.log(err);
        alert(err);
      }
      );
    }
  }

  signup() {
    this.router.navigate(['register']);
  }
}
