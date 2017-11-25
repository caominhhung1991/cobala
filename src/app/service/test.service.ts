import { Injectable } from '@angular/core';

@Injectable()
export class TestService {
  carts:any = new Array();
  constructor() { }

  addToCarts(product:any) {
    this.carts.push(product);
  }

  getCarts() {
    return this.carts;
  }
}
