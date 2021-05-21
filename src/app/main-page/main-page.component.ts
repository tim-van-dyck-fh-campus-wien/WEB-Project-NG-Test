import { ShortcutGroupService } from './../shortcut-group.service';
import { ShortcutGroup } from './../models/ShortcutGroup.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private shortcutServ:ShortcutGroupService) { }
  shortcutArr:ShortcutGroup[];
  ngOnInit(): void {
    this.shortcutArr=this.shortcutServ.getShortcutGroupArray();
  }

}
