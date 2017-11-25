import { Component, OnInit } from '@angular/core';
// service
import { MainService } from './../../service/main.service';
import { TestService } from './../../service/test.service';
// component 
import { AllProductComponent }  from './all-product/all-product.component';

@Component({
  selector: 'app-quan-ly-san-pham',
  templateUrl: './quan-ly-san-pham.component.html',
  styleUrls: ['./quan-ly-san-pham.component.css']
})
export class QuanLySanPhamComponent implements OnInit {
  testProduct:any = {
    id: 1,
    name: "gmail"
  }
  products:any;
  constructor(
    private mainService: MainService,
    private test: TestService
  ) {
   
  }

  getProducts() {
    // this.allProductComponent.getProducts();
  }

  ngOnInit() {
  }

  addProduct() {
    this.test.addToCarts(this.testProduct);
    this.products = this.test.getCarts();
  }
}
