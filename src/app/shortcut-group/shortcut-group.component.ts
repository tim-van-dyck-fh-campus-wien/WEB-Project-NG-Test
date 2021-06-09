import { Component, Input, OnInit } from '@angular/core';
import { ShortcutGroup } from '../models/ShortcutGroup.interface';

@Component({
  selector: 'shortcut-group',
  templateUrl: './shortcut-group.component.html',
  styleUrls: ['./shortcut-group.component.css']
})
export class ShortcutGroupComponent implements OnInit {

  constructor() { }
  @Input() data:ShortcutGroup;
 

      

  ngOnInit(): void {
  }

}
