import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFragmentComponent } from './form-fragment.component';

describe('FormFragmentComponent', () => {
  let component: FormFragmentComponent;
  let fixture: ComponentFixture<FormFragmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFragmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
