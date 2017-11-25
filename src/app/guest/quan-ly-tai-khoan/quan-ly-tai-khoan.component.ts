import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quan-ly-tai-khoan',
  templateUrl: './quan-ly-tai-khoan.component.html',
  styleUrls: ['./quan-ly-tai-khoan.component.css']
})
export class QuanLyTaiKhoanComponent implements OnInit {
  currentUser: any;
  selectedUser: any = {};
  constructor() { }

  getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  onSelect() {
    this.selectedUser = this.currentUser;
  }

  ngOnInit() {
    this.getCurrentUser();
  }



}
