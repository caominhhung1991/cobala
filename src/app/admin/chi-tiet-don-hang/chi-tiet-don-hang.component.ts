import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Http } from '@angular/http';
import 'rxjs/add/operator/switchMap';
// service
import { AdminService } from './../../service/admin.service';
import { MainService } from './../../service/main.service';
import { GuestService } from './../../service/guest.service';
// component
import { ProductsComponent } from './../../guest/products/products.component';
import { PhieuXuatKhoComponent } from './../phieu-xuat-kho/phieu-xuat-kho.component';

@Component({
  selector: 'app-chi-tiet-don-hang',
  templateUrl: './chi-tiet-don-hang.component.html',
  styleUrls: ['./chi-tiet-don-hang.component.css'],
  providers: [ProductsComponent, PhieuXuatKhoComponent]
})
export class ChiTietDonHangComponent implements OnInit {
  @Input() donhang: any = {};
  products: any = new Array();
  productInventory: any = {};
  // private donhang: any;
  constructor(
    private mainService: MainService,
    private guestService: GuestService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private location: Location,
    private productsComponent: ProductsComponent,
    private phieuXuatKhoComponent: PhieuXuatKhoComponent
  ) { }

  // order - access, update, delete order 
  // Xác nhận đơn hàng chưa giao, chưa xử lý
  accessOrderByAdmin(status: string) {
    if (status === 'Chưa xử lý') {
      for (let item of this.donhang.order_detail) {
        console.log(item.quantity, this.productInventory[item._id]);
        if (item.quantity > this.productInventory[item._id]) {
          alert("Sản phẩm đặt vượt quá số lượng trong kho! Hãy chọn số lượng phù hợp. :))");
          return 0;
        }
      }

      this.phieuXuatKhoComponent.addPhieuXuatKho(this.donhang);

      let check = confirm("Bạn có muốn chấp nhận đơn hàng này? Nếu bạn xác nhận thì đơn hàng sẽ tạo một phiếu xuất kho.");

      if (check) {
        this.donhang.status = "Đang chờ giao";
        this.donhang.access_person = (JSON.parse(localStorage.getItem("currentUser"))).name;
        this.guestService.updateOrderByAdmin(this.donhang).then(res => {
          console.log(res);
          alert("success!")
          location.reload();
        }, res => console.log(res));
      }
    } else if (status === 'Đang chờ giao') {
      let check = confirm("Bạn có muốn xác nhận đơn hàng này đã giao?");
      if (check) {
        this.donhang.status = "Đã hoàn thành";
        this.donhang.access_person = (JSON.parse(localStorage.getItem("currentUser"))).name;
        this.guestService.updateOrderByAdmin(this.donhang).then(res => {
          console.log(res);
          alert("success!")
          location.reload();
        }, res => console.log(res));
      }
    }
  }

  updateOrderByAdmin() {
    let check = confirm("Bạn có muốn cập nhật lại đơn hàng?");
    if (check) {
      this.guestService.updateOrderByAdmin(this.donhang).then(res => {
        console.log(res);
        alert("success!")
        // location.reload();
      }, res => console.log(res));
    }
  }

  deleteOrderByAdmin() {
    let check = confirm("Bạn có muốn huỷ bỏ đơn hàng?");
    if (check) {
      this.donhang.status = "Huỷ";
      this.guestService.updateOrderByAdmin(this.donhang).then(res => {
        console.log(res);
        alert("success!")
        location.reload();
      }, res => console.log(res));
    }
  }

  // edit product 
  onAddProduct(product) {
    product.price = product.sub_prod[0].price;
    product.quantity = 1;
    product.total_price = product.price * product.quantity;
    this.donhang.order_detail.push(product);
  }

  removeProduct(index) {
    this.donhang.order_detail.splice(index, 1);
  }

  tinhTien(product) {
    product.total_price = product.quantity * product.price;
    this.tinhTongTien();
  }

  tinhTongTien() {
    this.donhang.tong_tien = 0;
    for (let item of this.donhang.order_detail) {
      this.donhang.tong_tien += item.total_price;
    }
  }

  refresh() {
    location.reload();
  }

  ngOnInit() {
    if (sessionStorage.getItem("products") !== null) {
      this.products = JSON.parse(sessionStorage.getItem("products"));
    } else {
      this.products = this.productsComponent.getProducts();
    }
    // Lấy sản phẩm từ kho để lấy số lượng sp trong kho
    this.getProductsFromInventory();
    console.log(this.products);
    // this.route.paramMap
    //   .switchMap((params: ParamMap) => this.adminService.getDonHang(+params.get('id')))
    //   .subscribe(donhang => this.donhang = donhang);
  }

  getProductsFromInventory() {
    this.adminService.getProductsFromInventory().then(res => {
      for (let item of res) {
        this.productInventory[item._id] = item.quantity;
      }
      console.log(this.productInventory)
    })
  }
}
