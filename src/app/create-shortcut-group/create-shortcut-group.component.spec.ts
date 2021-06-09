import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShortcutGroupComponent } from './create-shortcut-group.component';

describe('CreateShortcutGroupComponent', () => {
  let component: CreateShortcutGroupComponent;
  let fixture: ComponentFixture<CreateShortcutGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateShortcutGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShortcutGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
