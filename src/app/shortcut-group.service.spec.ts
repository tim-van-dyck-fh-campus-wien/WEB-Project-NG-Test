import { TestBed } from '@angular/core/testing';

import { ShortcutGroupService } from './shortcut-group.service';

describe('ShortcutGroupService', () => {
  let service: ShortcutGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortcutGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
