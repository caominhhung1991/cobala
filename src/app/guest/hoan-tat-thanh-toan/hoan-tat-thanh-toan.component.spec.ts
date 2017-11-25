import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule} from '@angular/forms';
import { Router} from '@angular/router';
import { Location } from '@angular/common'
//service
import { MainService} from './../../service/main.service';
import { GuestService } from './../../service/guest.service';

import { HoanTatThanhToanComponent } from './hoan-tat-thanh-toan.component';
import { NavGuestComponent} from './../nav-guest/nav-guest.component';
import { ShoppingCartComponent} from './../../components/shopping-cart/shopping-cart.component'

describe('HoanTatThanhToanComponent', () => {
  let component: HoanTatThanhToanComponent;
  let fixture: ComponentFixture<HoanTatThanhToanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ 
        HoanTatThanhToanComponent,
        NavGuestComponent,
        ShoppingCartComponent 
      ],
      providers: [MainService, Router, Location, GuestService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoanTatThanhToanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
