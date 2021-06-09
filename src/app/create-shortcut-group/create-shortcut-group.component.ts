import { ShortcutGroup } from './../models/ShortcutGroup.interface';
import { ShortcutElement } from './../models/ShortcutElement.interface';
import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'create-shortcut-group',
  templateUrl: './create-shortcut-group.component.html',
  styleUrls: ['./create-shortcut-group.component.css']
})
export class CreateShortcutGroupComponent implements OnInit {

  constructor() { }
  shortcutGroup:ShortcutGroup = {_id:"",name:"",elements:[]};
  //Emit event when group is created, emit null if cancelled!
  @Output() shortcutGroupCreated = new EventEmitter<ShortcutGroup>();
  ngOnInit(): void {
  }
  onShortcutCreated(shortcutEl:ShortcutElement){
    this.shortcutGroup.elements.push(shortcutEl);
    console.dir(shortcutEl.url);
  }
  saveClicked(){
    if(this.shortcutGroup.name!=""){
      if(this.shortcutGroup.elements.length>0){
        this.shortcutGroupCreated.emit(this.shortcutGroup);
      }
    }else{
      alert("Data is still missing! Please add atleast one shortcut and a name!");
    }
  }
  cancelClicked(){
    this.shortcutGroupCreated.emit(null);
  }
}
