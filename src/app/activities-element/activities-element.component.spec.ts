import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesElementComponent } from './activities-element.component';

describe('ActivitiesElementComponent', () => {
  let component: ActivitiesElementComponent;
  let fixture: ComponentFixture<ActivitiesElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
