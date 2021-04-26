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

  getMerchData() {
    return this.http.retrieve(Operation.getMerchData);
  }
  addCategory(data) {
    return this.http.post(Operation.addCategory, data);
  }
  getCategories() {
    return this.http.retrieve(Operation.getCategories);
  }

  getProducts() {
    return this.http.retrieve(Operation.getProducts);
  }

  getOrders() {
    return this.http.retrieve(Operation.getOrders);
  }

  getProductDetail(id) {
    return this.http.retrieve(Operation.getProductDetail + "?productId=" + id);
  }

  updateNameOfCategory(data) {
    return this.http.post(Operation.updateNameOfCategory, data);
  }

  updateProductDetail(data) {
    return this.http.post(Operation.updateProductDetail, data);
  }

  deleteCategory(data) {
    return this.http.post(Operation.deleteCategory, data);
  }

  deleteProduct(data) {
    return this.http.post(Operation.deleteProduct, data);
  }
  upload(data) {
    return this.http.uploadFile(data);
  }

  test() {
    return this.http.retrieve(Operation.test);
  }

}
