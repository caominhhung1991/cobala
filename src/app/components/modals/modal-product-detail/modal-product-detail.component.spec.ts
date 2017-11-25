import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProductDetailComponent } from './modal-product-detail.component';

describe('ModalProductDetailComponent', () => {
  let component: ModalProductDetailComponent;
  let fixture: ComponentFixture<ModalProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProductDetailComponent ]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ModalProductDetailComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
