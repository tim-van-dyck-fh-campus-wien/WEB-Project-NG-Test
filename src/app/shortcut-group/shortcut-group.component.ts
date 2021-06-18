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

  //to delete shortcutGroup 
  @Output() deleteShortcutGroup = new EventEmitter<ShortcutGroup>();
 
  //added for low BW version
  @Input() lowBandwidth:boolean;

      

  ngOnInit(): void {
  }

  onDeleteShortcutGroupClicked(){
    this.deleteShortcutGroup.emit(this.data);
    //console.log(this.data);
  }

}
