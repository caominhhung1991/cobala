import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanPhamTuongTuComponent } from './san-pham-tuong-tu.component';

describe('SanPhamTuongTuComponent', () => {
  let component: SanPhamTuongTuComponent;
  let fixture: ComponentFixture<SanPhamTuongTuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanPhamTuongTuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanPhamTuongTuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
