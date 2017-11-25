import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const donhangs = {};

@Injectable()
export class AdminService {
  private result:any;
  private donhang:any;

  constructor(private _http: Http) {
    this.isUserLoggedIn = false;
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  
  private isUserLoggedIn;
  public username = "unknown";

  setUserLoggedIn() {
    this.isUserLoggedIn = true;
    this.username = "admin";
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  getUsers():Promise<any> {
    const url = 'api/user';
    return this._http.get(url, {headers: this.headers})
      .toPromise()
      .then(res => this.result = res.json().data)
      .catch(this.handleError)
  }

  deleteUser(id:string):Promise<any> {
    const url = `api/user/${id}`
    return this._http.delete(url, {headers: this.headers})
      .toPromise()
      .then(res => this.result = res.json())
      .catch(this.handleError)
  }

  // Purchasing - Phiếu nhập xuất
  getDonHangs(): Promise<any> {
    return Promise.resolve(donhangs); 
  }

  // 
  getDonHang(id: number) {
    return this.getDonHangs().then(donhangs => 
      {
        donhangs.find(donhang => donhang.donhang_id === id);
    });
  }

  getPurchaseByProductID(id:string):Promise<any> {
    const url = `/api/purchasing/product/${id}`;
    return this._http.get(url, {headers: this.headers})
      .toPromise()
      .then(res => this.result = res.json().data)
      .catch(this.handleError);
  }

  // Kho - Inventory
  // Lấy list Sản Phẩm từ kho
  getProductsFromInventory():Promise<any> {
    const url = '/api/inventory'
    return this._http.get(url, {headers: this.headers})
      .toPromise()
      .then(res =>  this.result = res.json().data)
      .catch(this.handleError);
  }

  // cập nhật sản phẩm trong kho
  updateProductQuantityToInventory(product) {
    const url = `/api/inventory/product/${product._id}`
    console.log(url);
    return this._http.put(url, JSON.stringify(product), {headers: this.headers})
    .toPromise()
    .then(res =>  this.result = res.json().data)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); //for demo purposes only
    return Promise.reject(error.massage || error);
  }
}