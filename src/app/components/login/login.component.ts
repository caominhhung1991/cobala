import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// service
import { MainService } from './../../service/main.service';
// declare variable jquery and $ to use jquery plugin
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any = {};
  constructor( 
    private router: Router,
    private mainService: MainService
  ) { 
  }

  loginUser(e) {
    e.preventDefault();
    
    let username = e.target.elements[0].value;
    let password = e.target.elements[1].value;
    this.mainService.getUserByEmail(username).then(res => {
      this.user = res.data;
      console.log(this.user);
      if(this.user != null) {
        if(password == this.user.password) {
          // this.mainService.setUserLoggedIn(username);
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          if(this.user.role == "guest") {
            // $("#dang-nhap").modal("hide");
            location.reload();
            // this.router.navigate(['/guest']);
          } else if(this.user.role == 'admin') {
            $("#dang-nhap").modal("hide");
            this.router.navigate(['/admin']);
          }
          
        } else {
          console.log("Sai password!");
        }
      } else {
        console.log("Tài khoản chưa tồn tại!");
      }
    });


    // if(username == 'admin' && password == 'admin') {
    //     this.mainService.setUserLoggedIn(username);
    //     this.router.navigate([username]);
    // }

    
  }

  goBack() {
    window.history.back();
  }

  ngOnInit() {
  }
}
