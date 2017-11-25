import { Component, OnInit } from '@angular/core';
// service
import { AdminService } from './../../service/admin.service';
import { GuestService } from './../../service/guest.service';
@Component({
  selector: 'app-kho',
  templateUrl: './kho.component.html',
  styleUrls: ['./kho.component.css']
})
export class KhoComponent implements OnInit {
  products:any = new Array();
  product_detail:any = {};
  phieuNhapXuat:any = new Array();
  PNX_product:any = {};
  selectedProduct: any;
  constructor(
    private adminService: AdminService,
    private guestService: GuestService
  ) { }

  getProductsFromInventory() {
    this.adminService.getProductsFromInventory().then(res => {
      console.log(res);
      this.products = res;
    }, res => console.log(res));[]
  }

  // Chọn sản phẩm và lấy sản phẩm ra
  onSelect(product) {
    this.product_detail = {};
    this.selectedProduct = product;
    this.getProductByProductID(product._id);
    this.getPurchaseByProductID(product._id);
  }
  // Lấy sản phẩm để hiện chi tiết
  getProductByProductID(id) {
    this.guestService.getProductDetail(id).subscribe(res => {
      this.product_detail = res;
      console.log(res);
    }, res => console.log(res));
  }
  // Lấy list phiếu nhập xuất và lọc lấy số lượng, tổng tiền
  getPurchaseByProductID(id) {
    this.adminService.getPurchaseByProductID(id).then(res => {
      this.phieuNhapXuat = res;
      console.log(res);
    }, res => console.log(res))
  }

  ngOnInit() {
    this.getProductsFromInventory();
  }

}
