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
  games = [
    {
      "id":"1",
      "name": "DOTA 2",
      "genre": "Strategy"
    },
    {
      "id":"2",
      "name": "AOE 3",
      "genre": "Strategy"
    },
    {
      "id":"3",
      "name": "GTA 5",
      "genre": "RPG"
    },
    {
      "id":"4",
      "name": "Far Cry 3",
      "genre": "Action"
    },
    {
      "id":"5",
      "name": "GTA San Andreas",
      "genre": "RPG"
    },
    {
      "id":"6",
      "name": "Hitman",
      "genre": "Action"
    },
    {
      "id":"7",
      "name": "NFS MW",
      "genre": "Sport"
    },{
      "id":"8",
      "name": "Fifa 16",
      "genre": "Sport"
    },{
      "id":"9",
      "name": "NFS Sen 2",
      "genre": "Sport"
    },{
      "id":"10",
      "name": "Witcher Assasins on King",
      "genre": "Adventure"
    }
  ]

  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  p:number = 1;

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
}
 