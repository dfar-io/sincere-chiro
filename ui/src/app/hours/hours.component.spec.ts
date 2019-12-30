import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursComponent } from './hours.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HoursComponent', () => {
  let component: HoursComponent;
  let fixture: ComponentFixture<HoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HoursComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
