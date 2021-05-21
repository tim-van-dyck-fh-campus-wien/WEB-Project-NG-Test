import { ShortcutGroup } from './models/ShortcutGroup.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShortcutGroupService {

  constructor() { }
  public getShortcutGroupArray():ShortcutGroup[]{
    let a:ShortcutGroup[]=[
      {
        name:"work",
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
            url:"https://www.stackoverflow.com"
          },
          {
            name:"Youtube",
            url:"https://www.youtube.com"
          },
          {
            name:"Wikipedia",
            url:"https://www.wikipedia.com"
          },
    
          
        ]
      },
      {
        name:"sports",
        elements:[
          {
            name:"ORF",
            url:"https://sport.orf.at/"
          },
          {
            name:"Kurier",
            url:"https://kurier.at/sport"
          },
          {
            name:"Standard",
            url:"https://www.derstandard.at/sport"
          }
        ]
      },
      {
        name:"entertainment",
        elements:[
          {
            name:"Netflix",
            url:"https://www.netflix.com/at-en/"
          },
          {
            name:"Prime",
            url:"https://www.amazon.de/Amazon-Video/b?ie=UTF8&node=3010075031"
          },
          {
            name:"Reddit",
            url:"https://www.reddit.com/"
          }
        ]
      },

    ]
    return a;
  }
}
