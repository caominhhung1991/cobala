import { Component, OnInit } from '@angular/core';
//service
import { GuestService } from './../../service/guest.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  messageError: { name: boolean; email: boolean; content: boolean; };
  name_:any;
  email_: any;
  content_: any;
  constructor(
    private guestService: GuestService
  ) { }

  addContact() {
    if(this.name_ == "" || this.name_ == undefined) {
      this.messageError.name = true;
    } else if( this.email_ == "" || this.email_ == undefined ) {
      this.messageError.email = true;
    } else if( this.content_ == "" || this.content_ == undefined) {
      this.messageError.content = true;
    } else {
      let contact  = {
        name: this.name_,
        email: this.email_,
        content: this.content_,
        date: new Date()
      }
      this.guestService.addContact(contact).then(res => {
        console.log(res);
        alert(res.message);
        this.content_ = "";
      }, res => console.log(res));
    }
    
  }

  ngOnInit() {
    this.initMessageError();
    if(localStorage.getItem("currentUser") !== null) {
      let user = JSON.parse(localStorage.getItem("currentUser"));
      this.name_ = user.name;
      this.email_ = user.email;
    } else {
    }
  }

  initMessageError() {
    this.messageError = {
      name: false,
      email: false,
      content: false
    }
  }


}
