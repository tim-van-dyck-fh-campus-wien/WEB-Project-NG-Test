import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowMainpageComponent } from './low-mainpage.component';

describe('LowMainpageComponent', () => {
  let component: LowMainpageComponent;
  let fixture: ComponentFixture<LowMainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LowMainpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LowMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
