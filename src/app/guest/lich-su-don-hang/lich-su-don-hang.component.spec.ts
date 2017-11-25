import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichSuDonHangComponent } from './lich-su-don-hang.component';

describe('LichSuDonHangComponent', () => {
  let component: LichSuDonHangComponent;
  let fixture: ComponentFixture<LichSuDonHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichSuDonHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichSuDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
