import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherElementComponent } from './weather-element.component';

describe('WeatherElementComponent', () => {
  let component: WeatherElementComponent;
  let fixture: ComponentFixture<WeatherElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
