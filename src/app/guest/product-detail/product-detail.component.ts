import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
// service
import { GuestService } from './../../service/guest.service';
import { MainService } from './../../service/main.service';
import { TestService} from './../../service/test.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product:any;
  testProducts:any;
  selectedProduct:any;
  selectedProductID:string;

  constructor(
    private mainService: MainService,
    private guestService: GuestService,
    private testService: TestService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  onSelect(product:any) {
    this.selectedProduct = {
      _id: product._id,
      product_id: product.product_id,
      product_name: product.product_name,
      product_image: product.product_image,
      price: product.price,
      quantity: product.quantity
    }
    console.log(this.selectedProduct);
  }

  onSelectID() {
    this.selectedProductID = this.product._id;
  }

  getProduct():void {
    
  };

  increase() {
    this.product.quantity += 1;
  }

  decrease() {
    if(this.product.quantity > 1 ) {
      this.product.quantity -= 1;
    }
  }

  goBack() {
    this.location.back();
  }
  
  id:string;
  ngOnInit() {
    let _id: string = "";
    this.route.paramMap.switchMap((params: ParamMap) => {
      return params.get('id').toString();
    }).subscribe(res => {
      _id += res;
    })

    if(JSON.parse(sessionStorage.getItem(_id)) == null) {
      this.route.paramMap.switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this.guestService.getProductDetail(this.id);
      })
      .subscribe(res => {
          this.product = res;
          this.product.quantity = 1;
          if(sessionStorage.getItem("products") !== null) {
            let prods = JSON.parse(sessionStorage.getItem("products"));
            for(let i of prods) {
              if(i.sub_prod[0]._id ===  this.id) {
                this.product.price = i.sub_prod[0].price;
                break;
              }
            }
            sessionStorage.setItem(res._id, JSON.stringify(this.product));
            console.log(`add product ${this.product.product_id} detail to session`);
          } else {
            this.guestService.getProductfromInventory(this.product._id).subscribe( res => {
              this.product.price = res.price;
              sessionStorage.setItem(res._id, JSON.stringify(this.product));
            }) 
          }
          
      });
    } else {
      this.product = JSON.parse(sessionStorage.getItem(_id));
    }
    
  }
}
