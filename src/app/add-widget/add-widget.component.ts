import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'add-widget',
  templateUrl: './add-widget.component.html',
  styleUrls: ['./add-widget.component.scss','../shortcut-group/shortcut-group.component.css']
})
export class AddWidgetComponent implements OnInit {

  constructor() { }
  @Output() widgetCreateRequest = new EventEmitter<{type:string}>();//Which type of widget should be created

  ngOnInit(): void {
  }
  createWidgetClicked(){
    this.widgetCreateRequest.emit({type:"ShortcutGroup"});
  }

}
