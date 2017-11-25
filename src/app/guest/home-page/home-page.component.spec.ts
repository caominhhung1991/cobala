import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router} from '@angular/router'
//service
import { MainService } from './../../service/main.service';
import { GuestService } from './../../service/guest.service';
import { TestService } from './../../service/test.service';

import { HomePageComponent } from './home-page.component';
import { ProductsComponent } from './../products/products.component';
import { NavGuestComponent} from './../nav-guest/nav-guest.component';
import { SliderGuestComponent } from './../slider-guest/slider-guest.component';
import { ShoppingCartComponent} from './../../components/shopping-cart/shopping-cart.component';
import { HoanTatThanhToanComponent} from './../hoan-tat-thanh-toan/hoan-tat-thanh-toan.component';


describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HomePageComponent,
        ProductsComponent,
        NavGuestComponent,
        SliderGuestComponent,
        ShoppingCartComponent
       ],
       providers: [
         {provide: MainService},
         {provide: GuestService},
         {provide: TestService},
         {provide: Router}
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
