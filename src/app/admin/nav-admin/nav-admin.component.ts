import { Component, OnInit, Input } from '@angular/core';
import { MainService } from './../../service/main.service';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit {
  name: string;
  @Input() isActive;

  constructor(
    private mainService: MainService
  ) { }

  logout() {
    localStorage.removeItem('currentUser');
  }
  ngOnInit() {
    this.name = this.mainService.getUserLoggedIn().name;
  }
 
}
