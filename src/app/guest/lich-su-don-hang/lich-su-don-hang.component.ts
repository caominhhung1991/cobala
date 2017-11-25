import { Component, OnInit, Input } from '@angular/core';
import { GuestService } from './../../service/guest.service';

@Component({
  selector: 'app-lich-su-don-hang',
  templateUrl: './lich-su-don-hang.component.html',
  styleUrls: ['./lich-su-don-hang.component.css']
})
export class LichSuDonHangComponent implements OnInit {
  @Input() set user(_user:any) {
    // Từ admin: quản lý user, xem order trong danh sách
      this.guestService.getOrdersByGuestID(_user._id).then(res => {
        this.donhangs = res;
        console.log(this.donhangs)
      }, res => console.log(res))
  }

  donhangs: any = new Array();
  id: any;
  constructor(
    private guestService: GuestService
  ) { }

  huyDonHang(donhangID) {
    let check = confirm("Bạn có muốn huỷ?");
    if(check == true) {
      this.guestService.deleteOrderByGuest(donhangID).then(res => {
        console.log(res);
        if(res.data.n != 0) {
          alert(res.message);
        } else {
          alert("Đã có lỗi khi huỷ đơn hàng!")
        }
        location.reload();
      }, res => console.log(res));
    }
  }

  ngOnInit() {
    this.id = (JSON.parse(localStorage.getItem("currentUser")))._id;
    console.log(this.id);
    this.guestService.getOrdersByGuestID(this.id).then(res => {
      this.donhangs = res;
      console.log(this.donhangs)
    }, res => console.log(res))
  }

}
