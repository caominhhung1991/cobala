import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaThongTinComponent } from './sua-thong-tin.component';

describe('SuaThongTinComponent', () => {
  let component: SuaThongTinComponent;
  let fixture: ComponentFixture<SuaThongTinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuaThongTinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuaThongTinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
