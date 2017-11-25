import { Injectable } from '@angular/core';
//Object
import { Product } from '../objects/product';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// declare variable jquery and $ to use jquery plugin
declare var jquery:any;
declare var $:any;

@Injectable()
export class MainService {
  result:any;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private _http: Http) {
    // localStorage.setItem('currentUser', JSON.stringify({name: 'unknown', user: false}))
  }
  
  setUserLoggedIn(username) {
    localStorage.setItem('currentUser', JSON.stringify({name: username, user: true}))
  }
 
  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
    
  // get api
  getUsers() {
    return this._http.get("/api/users")
      .map(result => this.result = result.json().data);
  }

  // -------- product api -----------
  // get list of product
  getListProducts(){
    return this._http.get("/api/products")
      .map(res => this.result = res.json().data )
  }

  // post
  addProduct(product) {
    return this._http.post("/api/product", product)
      .map(res => res.json());
  }
  // update 
  updateProduct(product):Promise<Product> {
    const url = `/api/product/${product._id}`;
    console.log(url);
    return this
      ._http.put(url, JSON.stringify(product), {headers: this.headers})
      .toPromise()
      .then(() => product)
      .catch(this.handleError);
  }
  // delete 
  deleteProduct(product): Promise<void> {
    const url = `/api/product/${product._id}`;
    console.log(url);
    return this._http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);

  }

  // --- Phiếu Nhập Kho api --- //
  addPhieuNhapXuatKho(phieu: any):Promise<void> {
    const url = "/api/purchasing";
    return this._http.post(url, phieu, {headers: this.headers})
      .toPromise()
      .then((res) => phieu)
      .catch(this.handleError);
  }

  // --- Kho - Inventory--- //
  // Lấy 1 sản phẩm từ kho, params: _id
  getProductFromInventory(_id: string): Promise<any> {
    const url = `/api/inventory/${_id}`;
    return this._http.get(url, {headers: this.headers})
      .toPromise()
      .then(res => this.result = res.json())
      .catch(this.handleError);
  }
  // Thêm 1 sản phẩm vào kho, params: product
  addProductToInventory(product: any): Promise<any> {
    const url = "/api/inventory";
    return this._http.post(url, JSON.stringify(product), {headers: this.headers})
    .toPromise()
    .then(res => product)
    .catch(this.handleError);
  }
  // Cập nhật 1 sản phẩm đã có vào kho, params: product
  updateProductToInventory(product: any): Promise<any> {
    const url = `/api/inventory/${product._id}`;
    return this
      ._http.put(url, JSON.stringify(product), {headers: this.headers})
      .toPromise()
      .then((res) => product)
      .catch(this.handleError);
  }
 
  deleteSessionCart() {
    localStorage.removeItem('shopping-cart');
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); //for demo purposes only
    return Promise.reject(error.massage || error);
  }

  convertTime():string {
    let time = new Date();
    let convertTime = time.getFullYear()+""+ (time.getMonth()+1)+""+ time.getDate()+"" + time.getHours()+"" + time.getMinutes()+"" + time.getSeconds();
    return convertTime;
  }

  // User API
  getUserByEmail(email:any):Promise<any> {
    const url = `/api/user/${email}`;
    return this._http.get(url, {headers: this.headers} )
      .toPromise()
      .then(res => this.result = res.json())
      .catch(this.handleError)
  }
  // Login user by email and password
  getUserByEmailPassword(email, pass) {
    const url = `/api/user/${email}/${pass}`;
    return this._http.get(url, {headers: this.headers})
      .toPromise()
      .then(res => this.result = res.json())
      .catch(this.handleError)
  }
  
  addUserByAdmin(user:any):Promise<any> {
    const url = `/api/user`;
    return this._http.post(url, JSON.stringify(user), {headers: this.headers} )
      .toPromise()
      .then(res => this.result = res.json())
      .catch(this.handleError)
  }
  // Update User
  updateUserByGuest(user:any):Promise<any> {
    const url = `/api/user/${user._id}`;
    console.log(url);
    return this._http.put(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(res => this.result = res.json())
      .catch(this.handleError);
  }
} 

// name: false,
// email: false,
// password: false,
// phone: false,
// birthday: false,
// address: false