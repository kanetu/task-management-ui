import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAccorditionComponent } from './schedule-accordition.component';

describe('ScheduleAccorditionComponent', () => {
  let component: ScheduleAccorditionComponent;
  let fixture: ComponentFixture<ScheduleAccorditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleAccorditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleAccorditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
