import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// service 
import { MainService } from './../../service/main.service';
import { GuestService } from './../../service/guest.service';
import { TestService } from './../../service/test.service';
// declare variable jquery and $ to use jquery plugin
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  numToNav: number;
  selectedProduct: any;
  testProducts: any;
  product2: any;
  products: any = new Array();
  products2: any;
  listArray: any = new Array();
  lamdep: any = new Array();
  chamsocmat: any = new Array();
  toanthan: any = new Array();
  khac: any = new Array();

  constructor(
    private mainService: MainService,
    private guestService: GuestService,
    private test: TestService,
    private router: Router
  ) { }

  addProduct() {
    this.test.addToCarts(this.selectedProduct);
    this.testProducts = this.test.getCarts();
  }

  getProducts() {
    if (JSON.parse(sessionStorage.getItem('products')) != null) {
      this.products = JSON.parse(sessionStorage.getItem('products'));
      for (let item of this.products) {
        if (item.product_kind === "Làm đẹp") {
          this.lamdep.push(item);
        } else if (item.product_kind == "Chăm sóc mặt") {
          this.chamsocmat.push(item);
        } else if (item.product_kind == "Toàn thân") {
          this.toanthan.push(item);
        } else {
          console.log(item);
          this.khac.push(item);
        }
      }
    } else {
      this.guestService.GetListProductsByJoin().subscribe(res => {
        for (let item of res) {
          if (item.sub_prod[0]) {
            this.products.push(item);

            if (item.product_kind === "Làm đẹp") {
              this.lamdep.push(item);
            } else if (item.product_kind == "Chăm sóc mặt") {
              this.chamsocmat.push(item);
            } else if (item.product_kind == "Toàn thân") {
              this.toanthan.push(item);
            } else {
              console.log(item);
              this.khac.push(item);
            }
          }
        }
        console.log(this.products);
        sessionStorage.setItem('products', JSON.stringify(this.products));
        sessionStorage.setItem('lamdep', JSON.stringify(this.lamdep));
        sessionStorage.setItem('chamsocmat', JSON.stringify(this.chamsocmat));
        sessionStorage.setItem('toanthan', JSON.stringify(this.toanthan));
        sessionStorage.setItem('khac', JSON.stringify(this.khac));
        // localStorage.setItem('products', JSON.stringify(this.products));
      }, res => console.log(res));
    }
    return this.products;
  }

  onSelect(product: any) {
    this.selectedProduct = {
      _id: product._id,
      don_vi_tinh: product.sub_prod[0].don_vi_tinh,
      product_id: product.product_id,
      product_name: product.product_name,
      product_image: product.product_image,
      price: product.sub_prod[0].price,
      quantity: 1
    }
  }

  pushProducts(products) {
    this.products2 = products;
    console.log(this.products2)
  }

  putToNav(event) {
    this.numToNav = event;
  }

  selectProductDetail(product) {
    this.guestService.selectProductDetail(product._id);
  };

  // dùng để search
  productFilter: any = {
    product_name: '',
    product_kind: ''
  }

  key:string = 'all';
  search(key) {
    if(key === 'Làm đẹp') {
      this.products = JSON.parse(sessionStorage.getItem("lamdep"));
    } else if(key === 'Chăm sóc mặt') {
      this.products = JSON.parse(sessionStorage.getItem("chamsocmat"))
    } else if(key == 'Toàn thân') {
      this.products = JSON.parse(sessionStorage.getItem('toanthan'))
    } else if(key === 'all'){
      this.products = JSON.parse(sessionStorage.getItem("products"))
    }
  }

  ngOnInit() {
    // localStorage.removeItem('products')
    this.getProducts();
    this.testProducts = this.test.getCarts();
    // $("#hoan-tat-don-hang").modal("show");
  }
}
