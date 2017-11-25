import { Component, OnInit, Input } from '@angular/core';
// service
import { GuestService } from './../../service/guest.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  productID:any;
  nameUser:string = "";
  productComment: any = "";
  comment:any = {};
  comments:any = new Array();
  check:boolean = false;
  focusComment:boolean = false;

  @Input() set ProductID(id) {
    console.log("get comments");
    this.productID = id;
    this.getCommentProduct(id);
    console.log(this.comment);
  }

  constructor(
    private guestService: GuestService
  ) { 
    if((JSON.parse(localStorage.getItem("currentUser"))) !== null) {
      this.nameUser = (JSON.parse(localStorage.getItem("currentUser"))).name;
    }
  }

  getCommentProduct(id) {
    this.guestService.getCommentByProductID(id).then(res => {
      console.log(res);
      this.comment = res.data;
      if(this.comment !== null) {
        this.check = true;
        this.comments = this.comment.comments;
      } else {
        this.comment = {
          time: new Date()
        }
      }
      
    },res => console.log(res))
  }

  addComment() {
    if(this.nameUser === "" || this.nameUser === undefined) {
      console.log("nameUser");
    } else if(this.productComment === "" || this.productComment === undefined) {
      console.log("productName");
    } else {
      console.log(this.productID)
      this.comment._id = this.productID;
      this.comments.push({nameUser: this.nameUser, productComment: this.productComment, time: new Date()})
      this.comment.comments = this.comments;
      this.check = true;
      this.guestService.addCommentByProductID(this.comment).then(res => {
        this.productComment = "";        
      }, res => console.log(res));
    }
  }

  showBtnGui(a:boolean) {
    this.focusComment = a;
  }

  ngOnInit() {
    
  }

}
