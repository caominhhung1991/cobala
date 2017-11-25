import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderGuestComponent } from './slider-guest.component';

describe('SliderGuestComponent', () => {
  let component: SliderGuestComponent;
  let fixture: ComponentFixture<SliderGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
