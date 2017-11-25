import { Component, OnInit } from '@angular/core';
import { Ng2FileInputService, Ng2FileInputAction } from 'ng2-file-input';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
// service
import { MainService } from './../../../service/main.service';
// Object
import { Product } from './../../../objects/product';
// Component 
import { AllProductComponent } from './../all-product/all-product.component';

// declare variable jquery and $ to use jquery plugin
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-them-san-pham',
  templateUrl: './them-san-pham.component.html',
  styleUrls: ['./them-san-pham.component.css']
})

export class ThemSanPhamComponent implements OnInit {
  messageError:any = {};
  product = new Product(
     "", "", "", "", "", "", "", "", "", ""
  );

constructor(
  private mainService: MainService,
  private router: Router,
  private location: Location
) { 
}

onSubmit() {
  this.checkFormInput(this.product);
}

// onSubmit(event) {
//   event.preventDefault();
//   this.checkFormInput(this.ttdh);
//   // for(let item of JSON.parse(this.ttdh.order_detail)) {
//   //   console.log(item);
//   // }
//   // console.log(this.ttdh);
// }

ngOnInit() {
  this.initMessageError();
  // console.log(this.product);
}

checkFormInput(form) {
  if(form.product_id == "" || form.product_id == undefined) {
    this.messageError.productID = true;
  } else if(form.product_name == "" || form.product_name == undefined) {
    this.messageError.name = true;
  } else if(form.product_size == "" || form.product_size == undefined) {
    this.messageError.size = true;
  } else if(form.product_kind == "" || form.product_kind == undefined) {
    this.messageError.kind = true;
  } else if(form.product_label == "" || form.product_label == undefined) {
    this.messageError.label = true;
  } else if(form.product_image == "" || form.product_image == undefined) {
    this.messageError.image = true;
  } else {
    console.log(this.product);
    this.mainService.addProduct(this.product).subscribe(res => {
      console.log("Thêm sản phẩm thành công!");
      let check = confirm("Thêm sản phẩm thành công! Nhấn Yes để xoá thông tin cũ, No để giữ lại thông tin");
      if(check == true) {
        this.product = new Product(
          "", "", "", "", "", "", "", "", "", ""
        );
        $("#product_id").focus();
      } else {
        this.product.product_id = "";
        $("#product_id").focus();
      }
    })
    // this.ttdh.order_detail = this.products;
    // this.guestService.addOrderFromGuest(this.ttdh).then(res => {
    //   console.log(res);
    //   localStorage.removeItem('cart');
    //   let check = confirm("Chúc mừng bạn đã đặt hàng thành công. Chọn Ok để khám phá các sản phẩm khác!.");
    //   if(check == true) {
    //     this.router.navigate(["/home-page"]);
    //   }
    //   // this.location.back();
    // }, res => console.log(res));
  }
}

initMessageError() {
  this.messageError = {
    productID: false,
    name: false,
    size: false,
    kind: false,
    label: false,
    image: false
  }
}

}
