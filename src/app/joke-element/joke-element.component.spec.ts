import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeElementComponent } from './joke-element.component';

describe('JokeElementComponent', () => {
  let component: JokeElementComponent;
  let fixture: ComponentFixture<JokeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
