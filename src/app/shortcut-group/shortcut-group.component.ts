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
  data_:ShortcutGroup = {
    name:"test",
    elements:[
      {
        name:"google",
        url:"https://www.google.at/"
      },
      {
        name:"instagram",
        url:"https://www.instagram.com/?hl=de"
      },
      {
        name:"github",
        url:"https://github.com/"
      },
      {
        name:"amazon",
        url:"https://www.amazon.com/"
      },
      {
        name:"Stackoverflow",
        url:"www.stackoverflow.com"
      },
      {
        name:"Youtube",
        url:"www.youtube.com"
      },
      {
        name:"Wikipedia",
        url:"www.wikipedia.com"
      },

      
    ]
  }
  ngOnInit(): void {
  }

}
