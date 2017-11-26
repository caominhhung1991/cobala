import { Component, OnInit } from '@angular/core';
// declare variable jquery and $ to use jquery plugin
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).scroll(() => {
      let y = $(document).scrollTop();
      // console.log(y);
      if(y > 800) {
        $('.up').fadeIn();
      } else {
        $('.up').fadeOut();
      }
    })

    $(document).ready(() => {
      console.log('123');
    })
  }

  gotoTop(number: number) {
    $('html').animate({ scrollTop: 0}, 'slow')
    // window.scrollTo(0, 0);
  }
}
