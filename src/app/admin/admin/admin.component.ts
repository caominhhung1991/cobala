import { Component, OnInit } from '@angular/core';
// service
import { MainService } from './../../service/main.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  name: string;
  constructor(
    private mainService: MainService
  ) { }

  ngOnInit() {

  }

}
 