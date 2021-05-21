import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutGroupComponent } from './shortcut-group.component';

describe('ShortcutGroupComponent', () => {
  let component: ShortcutGroupComponent;
  let fixture: ComponentFixture<ShortcutGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortcutGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortcutGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
