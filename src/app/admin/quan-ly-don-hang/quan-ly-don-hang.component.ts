import { Component, OnInit } from '@angular/core';
// service
import { AdminService } from './../../service/admin.service';
import { GuestService } from './../../service/guest.service';

@Component({
  selector: 'app-quan-ly-don-hang',
  templateUrl: './quan-ly-don-hang.component.html',
  styleUrls: ['./quan-ly-don-hang.component.css']
})
export class QuanLyDonHangComponent implements OnInit {
  private donhangsChuaXuLy: any;
  private selectedDonhang: any;

  constructor(
    private adminService: AdminService,
    private guestService: GuestService
  ) { }

  chuaXuLy:any = new Array();
  numCXL:number;
  dangChoGiao:any = new Array();
  numDCG:number;
  daHoanThanh:any = new Array();
  numDHT:number;
  allOrder:any = new Array();
  numAD:number;
  ngOnInit() {
    this.guestService.getOrderByAdmin().then(res => {
      for(let item of res) {
        if(item.status == "Chưa xử lý") {
          this.chuaXuLy.push(item);
        } else if(item.status == "Đang chờ giao") {
          this.dangChoGiao.push(item);
        } else if(item.status == "Đã hoàn thành") {
          this.daHoanThanh.push(item);
        } else {
          this.allOrder.push(item);
        }
      }
      
      this.selectedDonhang = this.chuaXuLy[0];
      this.numCXL = this.chuaXuLy.length;
      this.numDCG = this.dangChoGiao.length;
      this.numDHT = this.daHoanThanh.length;
      this.numAD = this.allOrder.length;
    });
    

    console.log(this.chuaXuLy);

    this.adminService.getDonHangs().then(res => {
      this.donhangsChuaXuLy = res;
      this.selectedDonhang = this.donhangsChuaXuLy[0];
    })
  }

  onSelect(donhang) {
    this.selectedDonhang = donhang;
  }

}
