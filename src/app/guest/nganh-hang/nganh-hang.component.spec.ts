import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NganhHangComponent } from './nganh-hang.component';

describe('NganhHangComponent', () => {
  let component: NganhHangComponent;
  let fixture: ComponentFixture<NganhHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NganhHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NganhHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
