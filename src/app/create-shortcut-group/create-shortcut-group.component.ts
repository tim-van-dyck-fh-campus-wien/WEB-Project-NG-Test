import { ShortcutGroup } from './../models/ShortcutGroup.interface';
import { ShortcutElement } from './../models/ShortcutElement.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'create-shortcut-group',
  templateUrl: './create-shortcut-group.component.html',
  styleUrls: ['./create-shortcut-group.component.css']
})
export class CreateShortcutGroupComponent implements OnInit {

  constructor() { }
  shortcutGroup:ShortcutGroup = {_id:"",name:"",elements:[]};

  ngOnInit(): void {
  }
  onShortcutCreated(shortcutEl:ShortcutElement){
    this.shortcutGroup.elements.push(shortcutEl);
    console.dir(shortcutEl.url);
  }
}
