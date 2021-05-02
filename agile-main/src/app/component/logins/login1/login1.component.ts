import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css']
})
export class Login1Component implements OnInit {

  user: SocialUser;
  loggedIn: boolean;
  constructor(private authService: SocialAuthService, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('facebook_auth'));
    this.loggedIn = (this.user != null);
    // tslint:disable-next-line: deprecation
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        this.api.signupByFb(this.user).subscribe(res => {
          localStorage.setItem('facebook_auth', JSON.stringify(this.user));
          localStorage.setItem('custId', res.data.id);
          this.router.navigate(['']);
        });
      }
    });
  }

  login() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
