import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// service
import { GuestService } from './../../service/guest.service';
// component
import { NavGuestComponent } from './../../guest/nav-guest/nav-guest.component';
 // declare variable jquery and $ to use jquery plugin
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [NavGuestComponent]
}) 

export class ShoppingCartComponent implements OnInit {
  _product:any ;
  testNum:number = 0;
  numberProduct:number;
  cart_products:any = new Array();
  totalPrice:number;
  checkCart:number;

  @Input() set productOP(product) {
    console.log(product);
    if(product !== undefined) {
      let list = JSON.parse(localStorage.getItem('cart'))
      if(list) {
        this.cart_products = Object.values(list);
      }
      this._product = product;
  
      let check = 1;
      for(let i=0; i<this.cart_products.length; i++) {
        if(this.cart_products[i]._id == product._id) {
            check = 0;
            this.cart_products[i].quantity += this._product.quantity;
            this.cart_products[i].total_price = this.cart_products[i].quantity * this.cart_products[i].price;;
            this.TinhTongTienCart();
        }
      }
      if(check == 1) {
        this._product.total_price = this._product.quantity * this._product.price;
        console.log( this._product.total_price)
        console.log("1222")
        this.cart_products.push(this._product);
        this.TinhTongTienCart();
      }
    }
    
  }
  get productOP() {return this._product;}
 
  constructor(
    private navGuest: NavGuestComponent,
    private guestService: GuestService
  ) { }

  tinhTotalPrice(quantity, price, i) {
    this.totalPrice = quantity*price;
    this.cart_products[i].total_price = this.totalPrice;
    this.cart_products[i].quantity = parseInt(quantity);
  }

  TinhTongTienCart() {
    console.log("\nTính tổng tiền cart")
    this.cart_products.tong_tien = 0;
    this.numberProduct = 0;
    for(let item of this.cart_products) {
      this.cart_products.tong_tien += item.total_price;
      this.numberProduct+= parseInt(item.quantity);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart_products));
    this.testNum = this.numberProduct;
  }

  layTongTien() {
    return this.cart_products.tong_tien;
  }

  selectProductDetail(product) {
    // $("#shopping-cart").modal("hide");
    this.guestService.selectProductDetail(product._id);
  }

  DeleteProduct(index:number) {
    this.cart_products.splice(index, 1);
    this.TinhTongTienCart();
  }


  hoanTatThanhToan() {
    // $("#shopping-cart").modal("hide");
    this.guestService.hoanTatThanhToan();
  }
 
  ngOnInit() {
    let list = JSON.parse(localStorage.getItem('cart'))
    if(list) {
      this.cart_products = Object.values(list);
      this.TinhTongTienCart();
    }
  }


  initCart() {
    this.cart_products.tong_tien = 0;
  }

}
 