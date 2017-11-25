import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { MainService } from './../../service/main.service';
// declare variable jquery and $ to use jquery plugin
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-sua-thong-tin',
  templateUrl: './sua-thong-tin.component.html',
  styleUrls: ['./sua-thong-tin.component.css']
})
export class SuaThongTinComponent implements OnInit {

  @Input() set inputUser(_user:any) {
    this.user = (_user || {});
  } 
  get inputUser():any { return this.user };

  // @Input() inputUser: any = {};

  @Output() currentUser = new EventEmitter();
  user: any;
  re_password: any;
  messageError:any = {};
  constructor(
    private mainService: MainService,
  ) { }

  updateUser() {
    this.checkFormInput(this.user);
  }

  checkFormInput(form) {
    if(form.name == "" || form.name == undefined) {
      this.messageError.name = true;
    } else if(form.phone == "" || form.phone == undefined) {
      this.messageError.phone = true;
    } else if(form.city == "" || form.city == undefined) {
      this.messageError.city = true;
    } else if(form.address == "" || form.address == undefined) {
      this.messageError.address = true;
    } else {
      this.mainService.updateUserByGuest(form).then(res => {
        console.log(res);
        alert(res.message);
        localStorage.setItem("currentUser", JSON.stringify(form));
        location.reload();
        // $("#sua-thong-tin").modal("hide");
      }, res => console.log(res));
    }
  }

  ngOnInit() {
    this.initUser();
    this.initMessageError();
  }

  initUser() {
    this.user = {
      name: "",
      phone: "",
      birthday: new Date(),
      address: "",
      city: "",
      role: "guest"
    }
  }

  initMessageError() {
    this.messageError = {
      name: false,
      word: false,
      phone: false,
      city: false,
      address: false
    }
  }
}
