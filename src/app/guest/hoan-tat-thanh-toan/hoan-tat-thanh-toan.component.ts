import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
// service
import { MainService } from './../../service/main.service';
import { GuestService } from './../../service/guest.service';
// component
import { ShoppingCartComponent } from './../../components/shopping-cart/shopping-cart.component';
@Component({
  selector: 'app-hoan-tat-thanh-toan',
  templateUrl: './hoan-tat-thanh-toan.component.html',
  styleUrls: ['./hoan-tat-thanh-toan.component.css'], 
  // providers: [ShoppingCartComponent]
})
export class HoanTatThanhToanComponent implements OnInit {
  user:any = {};
  products:any;
  messageError:any = {};
  ttdh:any = {};
  
  constructor(
    // private shoppingCartComponent: ShoppingCartComponent
    private mainService: MainService,
    private guestService: GuestService,
    private location: Location,
    private router: Router
  ) { }

  TinhTongTienCart() {
    console.log("\nTính tổng tiền cart") 
    if(this.products != null) {
      this.products.tong_tien = 0;
      for(let item of this.products) {
        this.products.tong_tien += item.total_price;
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.checkFormInput(this.ttdh);
    // for(let item of JSON.parse(this.ttdh.order_detail)) {
    //   console.log(item);
    // }
    // console.log(this.ttdh);
  }

  checkFormInput(form) {
    if(form.name == "" || form.name == undefined) {
      this.messageError.name = true;
    } else if(form.phone == "" || form.phone == undefined) {
      this.messageError.phone = true;
    } else if(form.city == "" || form.city == undefined) {
      this.messageError.city = true;
    }  else if(form.address == "" || form.address == undefined) {
      this.messageError.address = true;
    } else if(this.products == null) {
      let check = confirm("Bạn chưa chọn sản phẩm nào. Chọn Ok để khám phá các sản phẩm khác!.");
      if(check == true) {
        this.router.navigate(["/home-page"]);
      }
    } else {
      this.ttdh.order_detail = this.products;
      this.ttdh.id = "DH" + this.mainService.convertTime();
      this.ttdh.timeModified = new Date();
      this.ttdh.status = "Chưa xử lý";
      this.ttdh.tong_tien = this.products.tong_tien;
      this.guestService.addOrderFromGuest(this.ttdh).then(res => {
        console.log(res);
        localStorage.removeItem('cart');
        let check = confirm("Chúc mừng bạn đã đặt hàng thành công. Chọn Ok để khám phá các sản phẩm khác!.");
        if(check == true) {
          this.router.navigate(["/home-page"]);
        }
        // this.location.back();
      }, res => console.log(res));
    }
  }

  ngOnInit() {
    this.user = (JSON.parse(localStorage.getItem("currentUser")) || {});
    if(this.user != {}) {
      console.log("Có user - Hàm khởi tạo");
      this.ganUserVaoTTDH(this.user);
    }
    this.initMessageError();
    this.products = JSON.parse(localStorage.getItem("cart")) ;
    this.TinhTongTienCart();
  }

  initMessageError() {
    this.messageError = {
      name: false,
      phone: false,
      city: false,
      address: false,
      detail: false
    }
  }

  reload() {
    location.reload();
  }  

  ganUserVaoTTDH(user) {
    this.ttdh.name = user.name;
    this.ttdh.phone = user.phone;
    this.ttdh.email = user.email;
    this.ttdh.city = user.city;
    this.ttdh.address = user.address;
    this.ttdh.guest_id = user._id;
  }
}
