import { Component, OnInit, Input } from '@angular/core';
import { MainService } from './../../service/main.service';
import { Router} from '@angular/router';
import { LoginComponent} from './../../components/login/login.component'
// declare variable jquery and $ to use jquery plugin
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-nav-guest',
  templateUrl: './nav-guest.component.html',
  styleUrls: ['./nav-guest.component.css']
})
export class NavGuestComponent implements OnInit {

  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  p:number = 1;
  selectedUser:any;
  currentUser: any = {};

  @Input() set numOfProduct(num) {
    this.numProduct = num;
    console.log("num");
    console.log(this.numProduct);
  };

  @Input() isActive:any;

  numProduct:number;
  constructor(
    private mainService: MainService,
    private router: Router
  ) { }
 
  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    $("#user-info").collapse('toggle');
    // location.reload();
  }

  quanLyTaiKhoan() {
    this.router.navigate([this.currentUser.role]);
  }
 
  getUser(event) {
    this.currentUser = event;
  }
  donHangCuaToi() {
    this.router.navigate(['/hoan-tat-thanh-toan'])
  }
  
  seeProductDetail(p) {
    this.router.navigate(['product/'+p._id]);
    this.removeTextSearch();
  }

  productFilter:any = {
    product_name: ''
  }

  products_search:any = {};
  ngOnInit() {
    this.numProduct = 0;
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(this.currentUser);
    if(sessionStorage.getItem("products") != null) {
      this.products_search = JSON.parse(sessionStorage.getItem("products"));
    } else {
      $(document).ready(() => {
        this.products_search = JSON.parse(sessionStorage.getItem("products"));
      })
    }
  }

  removeTextSearch() {
    $("#search").val("");
    this.productFilter.product_name = "";
  }

  gotoNH() {
    window.scrollTo(400, 400);
  }
}
 