import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuXuatKhoComponent } from './phieu-xuat-kho.component';

describe('PhieuXuatKhoComponent', () => {
  let component: PhieuXuatKhoComponent;
  let fixture: ComponentFixture<PhieuXuatKhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhieuXuatKhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhieuXuatKhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
