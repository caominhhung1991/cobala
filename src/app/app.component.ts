import { Component, OnInit } from '@angular/core';
//service
import { MainService } from './service/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  users: Array<any>;
  constructor (
    private _mainService: MainService
  ) {}

  getUsers() {
    this._mainService.getUsers()
    .subscribe( res => {
      this.users = res;
      console.log(this.users);
    });
  }

  ngOnInit() {
    console.log("Chạy hàm lấy danh sách Users!");
    // this.getUsers();
  }
}
