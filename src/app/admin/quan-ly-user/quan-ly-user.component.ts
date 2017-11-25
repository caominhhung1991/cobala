import { Component, OnInit } from '@angular/core';
//service
import { AdminService } from './../../service/admin.service';
import { GuestService } from './../../service/guest.service';

@Component({
  selector: 'app-quan-ly-user',
  templateUrl: './quan-ly-user.component.html',
  styleUrls: ['./quan-ly-user.component.css']
})
export class QuanLyUserComponent implements OnInit {
  users:any = new Array();
  selectedUser:any;
  donhangs:any = new Array();
  constructor(
    private adminService: AdminService,
    private guestService: GuestService
  ) { }

  getUsers() {
    this.adminService.getUsers().then(res => {
      this.users = res;
    }, res => console.log(res));
  }

  deleteUser(id:string) {
    let check = confirm("Bạn có chắc xoá user?");
    if(check == true) {
      this.adminService.deleteUser(id).then(res => {
        console.log(res.message);
        alert(res.message);
        this.getUsers();
      }, res => console.log(res));
    }
    
  }

  getOrderByGuestId(id:string) {
    this.guestService.getOrdersByGuestID(id).then(res => {
      this.donhangs = res;
    });
  }
  onSelect(user) {
    this.selectedUser = user;
  }
  ngOnInit() {
    this.getUsers();
  }

}
