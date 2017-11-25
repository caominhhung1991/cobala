import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoiPasswordComponent } from './doi-password.component';

describe('DoiPasswordComponent', () => {
  let component: DoiPasswordComponent;
  let fixture: ComponentFixture<DoiPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoiPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoiPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
