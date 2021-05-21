import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutElementComponent } from './shortcut-element.component';

describe('ShortcutElementComponent', () => {
  let component: ShortcutElementComponent;
  let fixture: ComponentFixture<ShortcutElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortcutElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortcutElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
