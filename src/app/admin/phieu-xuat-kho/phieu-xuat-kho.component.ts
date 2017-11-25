import { Component, OnInit, Input } from '@angular/core';
// service
import { MainService } from './../../service/main.service';
import { AdminService } from './../../service/admin.service';

// component


// declare variable jquery and $ to use jquery plugin
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-phieu-xuat-kho',
  templateUrl: './phieu-xuat-kho.component.html',
  styleUrls: ['./phieu-xuat-kho.component.css']
})
export class PhieuXuatKhoComponent implements OnInit {
  @Input() donhang:any;

  phieuXuatKho: any = {};
  constructor(
    private mainService: MainService,
    private adminService: AdminService
  ) { }

  addPhieuXuatKho(donhang) {
    this.phieuXuatKho.phieu_id = $('#ma_phieu').val();
    this.phieuXuatKho.kind = "Xuất kho";
    this.phieuXuatKho.nowDate = new Date;
    this.phieuXuatKho.tong_tien = donhang.tong_tien;
    this.phieuXuatKho.products_detail = donhang.order_detail;
    this.phieuXuatKho.nguoi_lap_phieu = $("#nguoi_lap_phieu").html();
    console.log(this.phieuXuatKho);
    // this.adminService.getProductsFromInventory().then(res => {
    //   console.log(res);
    // })
    if(donhang.order_detail.length != 0) {
      this.mainService.addPhieuNhapXuatKho(this.phieuXuatKho)
        .then(res =>{
          console.log("Thêm phiếu xuất hàng thành công.");
          /*Sau khi thêm phiếu thành công thì giảm sp trong kho
            thì cập nhật số lượng*/
          this.updateProductsToInventory(this.phieuXuatKho.products_detail);
        }, res => console.log(res));
    }
  }

  updateProductsToInventory(sanPham) {
    console.log(sanPham);
    for(let item of sanPham) {
        console.log(item);
        // Cộng thêm sản phẩm vào kho
        this.adminService.updateProductQuantityToInventory(item).then(res => {
          console.log(res);
        }, res => console.log(res));
    }
  }

  ngOnInit() {
    this.initPhieuXuatKho();
  }

  // updateOneProductToIncentory(item: any): any {
  //   console.log("Update new product");
  //   this.oneProduct = {
  //     _id: item._id,
  //     product_id: item.product_id,
  //     price: item.price,
  //     quantity: item.quantity,
  //     modifiedDate: new Date()
  //   };
  //   this.mainService.updateProductToInventory(this.oneProduct).then(res => {
  //     console.log(res);
  //   }, res => console.log(res));
  // }

  initPhieuXuatKho() {
    this.phieuXuatKho = {
      nowDate: new Date(),
      tong_tien: 0,
      kind: "Xuất kho"
    };
    $("#ma_phieu").val("PXK" + this.mainService.convertTime());
  }

}
