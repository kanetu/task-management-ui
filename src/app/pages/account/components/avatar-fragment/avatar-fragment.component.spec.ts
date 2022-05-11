import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarFragmentComponent } from './avatar-fragment.component';

describe('AvatarFragmentComponent', () => {
  let component: AvatarFragmentComponent;
  let fixture: ComponentFixture<AvatarFragmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarFragmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
