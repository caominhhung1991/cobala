import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
// service
import { MainService} from './../../../service/main.service';
// Object
import { Product } from './../../../objects/product';

// declare variable jquery and $ to use jquery plugin
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-modal-add-product-to-repository',
  templateUrl: './modal-add-product-to-repository.component.html',
  styleUrls: ['./modal-add-product-to-repository.component.css']
})
export class ModalAddProductToRepositoryComponent implements OnInit {

  @Output() oneProduct = new EventEmitter();

  // product2: any;
  selectedProduct: any;
  products: Product[];

  constructor(
    private mainService: MainService
  ) { }

  getProducts() {
    this.mainService.getListProducts().subscribe(res => {
      this.products = res;
      this.selectedProduct = this.products[0];
      this.initSelectedProduct();
    });
  }

  tinhThanhTien() {
    this.selectedProduct.total_price = this.selectedProduct.quantity*this.selectedProduct.price;
    
  }
  
  onSelect(name: any): void {
    // Match the selected ID with the ID's in array
    this.selectedProduct = this.products.filter(value => value.product_name === name)[0];
    this.initSelectedProduct();
  }

  initSelectedProduct() {
    this.selectedProduct.quantity = 1;
    this.selectedProduct.price = 1000;
    this.selectedProduct.total_price = this.selectedProduct.quantity * this.selectedProduct.price;
    this.selectedProduct.don_vi_tinh = "Hộp";
  }

  pushOneProduct() {
    this.oneProduct.emit(this.selectedProduct);
    $('#add-product-to-repository').modal('toggle');
  }

  ngOnInit() {
    this.getProducts();
    
    // this.product2.quantity = 1;
  }

}
