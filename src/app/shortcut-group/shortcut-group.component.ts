import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShortcutGroup } from '../models/ShortcutGroup.interface';

@Component({
  selector: 'shortcut-group',
  templateUrl: './shortcut-group.component.html',
  styleUrls: ['./shortcut-group.component.css']
})
export class ShortcutGroupComponent implements OnInit {
 

  constructor() { }
  @Input() data:ShortcutGroup;
  @Input() id:String;

  //to delete shortcutGroup 
  @Output() deleteShortcutGroup = new EventEmitter<String>();
 
  //added for low BW version
  @Input() lowBandwidth:boolean;

      

  ngOnInit(): void {
  }

  onDeleteShortcutGroupClicked(){
    this.deleteShortcutGroup.emit(this.id);
  }

}
