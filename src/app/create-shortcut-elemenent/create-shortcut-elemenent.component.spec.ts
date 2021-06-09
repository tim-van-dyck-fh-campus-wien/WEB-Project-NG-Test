import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShortcutElemenentComponent } from './create-shortcut-elemenent.component';

describe('CreateShortcutElemenentComponent', () => {
  let component: CreateShortcutElemenentComponent;
  let fixture: ComponentFixture<CreateShortcutElemenentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateShortcutElemenentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShortcutElemenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
