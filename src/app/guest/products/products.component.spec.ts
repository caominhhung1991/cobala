import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//service
import { MainService } from './../../service/main.service';
import { GuestService } from './../../service/guest.service';
import { TestService } from './../../service/test.service';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      providers: [
        {provide: MainService}
      ]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
  //   let mainService = fixture.debugElement.injector.get(MainService);
    
  //   fixture = TestBed.createComponent(ProductsComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});  
