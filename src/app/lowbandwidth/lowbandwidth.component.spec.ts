import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowbandwidthComponent } from './lowbandwidth.component';

describe('LowbandwidthComponent', () => {
  let component: LowbandwidthComponent;
  let fixture: ComponentFixture<LowbandwidthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LowbandwidthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LowbandwidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
