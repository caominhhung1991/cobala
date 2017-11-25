import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainService } from './../../service/main.service';
// declare variable jquery and $ to use jquery plugin
declare var jquery:any;
declare var $:any;


@Component({
  selector: 'app-doi-password',
  templateUrl: './doi-password.component.html',
  styleUrls: ['./doi-password.component.css']
})

export class DoiPasswordComponent implements OnInit {
  
  @Input() set inputUserUpdate(_user:any) {
    this.user = (_user || {});
    // this.getCurrentUser();
  } 
  get inputUserUpdate():any { return this.user };
  
  user: any;
  old_password:any;
  new_password:any;
  re_password: any;
  messageError:any = {};
  constructor(
    private mainService: MainService,
  ) { }
  updatePassword() {
    console.log("update password!");
    this.checkFormInput();
  }

  checkFormInput() {
    if(this.old_password == "" || this.old_password == undefined) {
      // Nếu pass cũ rỗng hoặc undefined
      this.messageError.old_password = true;
    } else if((this.new_password == "" || this.new_password == undefined) || this.new_password.length < 6 ) {
      // Nếu pass mới rỗng hoặc undefined
      this.messageError.new_password = true;
    } else if(this.re_password == "" || this.re_password == undefined) {
      this.messageError.re_password.required.check = true;
    } else if(this.re_password !== this.new_password ) {
      this.checkConfirmPassword();
    } else if(this.old_password !== this.user.password ) {
      alert("Mật khẩu sai!");
    } else {
      this.user.password = this.new_password;
      this.mainService.updateUserByGuest(this.user).then(res => {
        console.log(this.user);
        console.log(res);
        localStorage.setItem("currentUser", JSON.stringify(this.user));
        alert(res.message);
        location.reload();
      }, res => console.log(res));
    }
  }

  checkConfirmPassword() {
    if(this.re_password !== this.new_password) {
      this.messageError.re_password.confirm.check = true;
    } else {
      this.messageError.re_password.confirm.check = false;
    }
  }

  ngOnInit() {
    this.initUser();
    this.initMessageError();
  }

  initUser() {
    this.user = {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: new Date(),
      address: "",
      role: "guest"
    }
  }

  initMessageError() {
    this.messageError = {
      old_password: false,
      new_password: false,
      re_password: {
        confirm: { 
          check: false, 
          message: "Mật khẩu xác nhận không trùng nhau"
        },
        required : {
          check: false,
          message: "Mật khẩu xác nhận không được trống"
        }
      }
    }
  }

}
