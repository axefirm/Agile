import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Operation } from '../enum/operation';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpService) { }

  getUser(data) {
    return this.http.retrieve(data);
  }

  login(data) {
    return this.http.post(Operation.login, data);
  }

  signup(data) {
    return this.http.post(Operation.signup, data);
  }

  createShop(data) {
    return this.http.post(Operation.createShop, data);
  }

  addProduct(data) {
    return this.http.post(Operation.addProduct, data);
  }
  
  getCustData(data) {
    return this.http.post(Operation.getCustData, data);
  }

  getMerchData(data) {
    return this.http.post(Operation.getMerchData, data);
  }

  test() {
    return this.http.retrieve(Operation.test);
  }

}
