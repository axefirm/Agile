import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  public isAuthenticated(): boolean {
    const facebook_auth = localStorage.getItem('facebook_auth');

    return facebook_auth != null;
    // TODO: fix that after login section is complete.
    // return !this.jwtHelper.isTokenExpired(token);
  }
}
