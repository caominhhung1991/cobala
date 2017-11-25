import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-product-detail',
  templateUrl: './modal-product-detail.component.html',
  styleUrls: ['./modal-product-detail.component.css']
})
export class ModalProductDetailComponent implements OnInit {
  product:any;
  @Input() set productInput(input) {
    this.product = input;
    this.product.quantity = 1;
  };
  constructor() { }

  increase() {
    this.product.quantity += 1;
  }

  decrease() {
    if(this.product.quantity > 1 ) {
      this.product.quantity -= 1;
    }
  }

  ngOnInit() {
  }

}
