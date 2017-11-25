import { Component, OnInit } from '@angular/core';
// service
import { MainService } from './../../../service/main.service';
// Object
import { Product } from './../../../objects/product';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  product: Product;
  selectedProduct: Product;
  products: Product[];

  constructor(
    private mainService: MainService
  ) { }

  getProducts():void {
     this.mainService.getListProducts().subscribe((res) => {
       this.products = res
      //  console.log(this.products);
     });
  }

  onSelect(product) {
    this.selectedProduct = product;
    // console.log(this.selectedProduct);
  }

  ngOnInit() {
    this.getProducts();
  }

}
