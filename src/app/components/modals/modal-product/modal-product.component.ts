import { Component, OnInit, Input } from '@angular/core';
// Object
import { Product } from './../../../objects/product';
// Service 
import { MainService } from './../../../service/main.service';
// Component 
import { AllProductComponent } from './../../../admin/quan-ly-san-pham/all-product/all-product.component';

// declare variable jquery and $ to use jquery plugin
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {
  @Input() product:Product;
  // productToUpdate:Product;

  constructor(
    private mainService: MainService,
    private allProductComponent: AllProductComponent
  ) { }

  updateProduct() {
    console.log("\nUpdate Product in modal-product template");
    console.log(this.product);
    this.mainService.updateProduct(this.product).then((res) => {
      console.log(res);
      $("#modalProduct").modal("hide");
      this.allProductComponent.getProducts();
    });


    // alert("Update Thành Công!");
    
  }

  deleteProduct() {
    console.log("Delete Product in modal-product template");
    this.mainService.deleteProduct(this.product).then((res) => {
      $("#modalProduct").modal("hide");
      this.allProductComponent.getProducts();
      console.log("delete success!");
    }, res => {
      console.log(res);
    })
  }

  ngOnInit() {
  }

}
