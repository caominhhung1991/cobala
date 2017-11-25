import { Component, OnInit } from '@angular/core';
// service
import { MainService } from './../../../service/main.service';
// Object
import { Product } from './../../../objects/product';

// declare variable jquery and $ to use jquery plugin
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-phieu-nhap-kho',
  templateUrl: './phieu-nhap-kho.component.html',
  styleUrls: ['./phieu-nhap-kho.component.css']
})
export class PhieuNhapKhoComponent implements OnInit {
  
  products: any = new Array();
  testProduct: any = {};
  phieuNhapKho: any = {};
  oneProduct: any = {};
  
  constructor(
    private mainService: MainService
  ) { }

  pushOneProduct(product) {
    this.testProduct = {};
    this.testProduct._id = product._id;
    this.testProduct.product_name = product.product_name;
    this.testProduct.product_id = product.product_id;
    this.testProduct.don_vi_tinh = product.don_vi_tinh;
    this.testProduct.quantity = product.quantity;
    this.testProduct.price = product.price;
    this.testProduct.total_price = product.total_price;
    let check = this.products.indexOf()
    this.products.push(this.testProduct);
    this.phieuNhapKho.tong_tien = 0;
    for(let item of this.products) {
      this.phieuNhapKho.tong_tien += item.total_price;
    }
    // this.updateProducts()
  }

  deleteOneProcut(index:number) {
    this.products.splice(index, 1);
  }
 
  addPhieuNhapKho() {
    this.phieuNhapKho.phieu_id = $('#ma_phieu').val();
    this.phieuNhapKho.products_detail = this.products;
    this.phieuNhapKho.nguoi_lap_phieu = $("#nguoi_lap_phieu").html();
    if(this.products.length != 0) {
      console.log(this.products);
      this.mainService.addPhieuNhapXuatKho(this.phieuNhapKho)
        .then(res =>{
          console.log("Add Purchasing Success!");
          alert("Thêm phiếu nhập hàng thành công.");
          this.initPhieuNhapKho();
          /*Sau khi thêm phiếu thành công thì thêm sp vào kho
              - Nếu sản phẩm chưa có trong kho từ phiếu nhập hàng thì thêm mới
              - Nếu sản phẩm đã có trong kho thì update*/
          this.addProductsToInventory(res);
        }, res => console.log(res));
    }
    
  }
  // Inventory
  // inventory
  addProductsToInventory(phieuNhapKho) {
    console.log(phieuNhapKho);
    for(let item of phieuNhapKho.products_detail) {
      this.mainService.getProductFromInventory(item._id).then(res => {
        if(res === null) {
          this.addOneProductToInventory(item);
        } else {
          // Cộng thêm sản phẩm vào kho
          item.quantity += res.quantity;
          this.updateOneProductToIncentory(item);
        }
      }, res=> console.log());

      
    }
  }

  addOneProductToInventory(item: any) {
    console.log("Add new product");
    this.oneProduct = {
      _id: item._id,
      product_id: item.product_id,
      don_vi_tinh: item.don_vi_tinh,
      price: item.price,
      quantity: item.quantity,
      modifiedDate: new Date()
    };
    this.mainService.addProductToInventory(this.oneProduct).then(res => {
      console.log(res);
    }, res => console.log(res));
  }

  updateOneProductToIncentory(item: any): any {
    console.log("Update new product");
    this.oneProduct = {
      _id: item._id,
      product_id: item.product_id,
      price: item.price,
      quantity: item.quantity,
      modifiedDate: new Date()
    };
    this.mainService.updateProductToInventory(this.oneProduct).then(res => {
      console.log(res);
    }, res => console.log(res));
  }

  ngOnInit() {
    this.initPhieuNhapKho();
  }
// "59e63617c7cd085478653d98"
  initPhieuNhapKho() {
    this.products = new Array();
    this.phieuNhapKho = {
      nowDate: new Date(),
      tong_tien: 0,
      kind: "Nhập kho"
    };
    $("#ma_phieu").val("PNK" + this.mainService.convertTime());
  }
}
