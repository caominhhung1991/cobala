import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { MainService } from './../../service/main.service';
import { NavGuestComponent} from './../../guest/nav-guest/nav-guest.component';
// declare variable jquery and $ to use jquery plugin
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [ NavGuestComponent ]
})
export class SignUpComponent implements OnInit {
  @Input() set inputUser(_user:any) {
    this.updateUser = true;
    this.user = (_user || {});
    // this.getCurrentUser();
    console.log(this.user);
  } 
  get inputUser():any { return this.user };

  // @Input() inputUser: any = {};

  @Output() currentUser = new EventEmitter();
  updateUser:boolean = false;
  user: any;
  re_password: any;
  messageError:any = {};
  constructor(
    private mainService: MainService,
    private navGuest: NavGuestComponent
  ) { }

  addNewUser() {
    this.checkFormInput(this.user);
  }

  checkFormInput(form) {
    let check = /\S+@\S+\.\S+/;
    if(form.name == "" || form.name == undefined) {
      this.messageError.name = true;
    } else if(form.email == "" || form.email == undefined || check.test(form.email)==false) {
      this.messageError.email.required = true;
    } else if((form.password == "" || form.password == undefined) || form.password.length < 6 ) {
      this.messageError.password = true;
    } else if(this.re_password == "" || this.re_password == undefined) {
      this.messageError.re_password.required.check = true;
    }  else if(this.re_password !== form.password ) {
      this.checkConfirmPassword();
    } else if(form.phone == "" || form.phone == undefined) {
      this.messageError.phone = true;
    } else if(form.city == "" || form.city == undefined) {
      this.messageError.city = true;
    } else if(form.address == "" || form.address == undefined) {
      this.messageError.address = true;
    } else {
      this.mainService.getUserByEmail(form.email).then(res_check => {
        console.log(res_check);
        this.messageError.email.existed.check = false;
        if(res_check.data == null) {
          console.log("User chưa tồn tại");
          this.mainService.addUserByAdmin(form).then(res_add => {
            console.log(res_add.message);
            console.log(res_add.data);
            let check = confirm(res_add.message + ". Để đăng nhập tự động chọn ok!");
            if(check == true) {
              localStorage.setItem("currentUser", JSON.stringify(form));
              $("#dang-ky").modal("hide");
              $("#user-login").collapse("toggle");
              this.currentUser.emit(form);
            }
            this.initUser();
          }, res_add => console.log(res_add));
        } else {
          alert('Email đã được sử dụng!');
          this.messageError.email.existed.check = true;
        }
      }, res => console.log(res));
    }
  }

  checkConfirmPassword() {
    if(this.re_password !== this.user.password) {
      this.messageError.re_password.confirm.check = true;
    } else {
      this.messageError.re_password.confirm.check = false;
    }
    // console.log(JSON.stringify(this.messageError.re_password));
  }

  getCurrentUser() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
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
      city: "",
      address: "",
      role: "guest"
    }
  }

  initMessageError() {
    this.messageError = {
      name: false,
      email: {
        required: false,
        existed: {
          check: false,
          message: "Email đã được sử dụng!"
        }
      },
      city: false,
      password: false,
      re_password: {
        confirm: { 
          check: false, 
          message: "Mật khẩu xác nhận không trùng nhau"
        },
        required : {
          check: false,
          message: "Mật khẩu xác nhận không được trống"
        }
      },
      phone: false,
      address: false
    }
  }

}
