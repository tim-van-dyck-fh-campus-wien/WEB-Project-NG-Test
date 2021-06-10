import { LogoRetrievalService } from './../logo-retrieval.service';
import { ShortcutElement } from './../models/ShortcutElement.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shortcut-element',
  templateUrl: './shortcut-element.component.html',
  styleUrls: ['./shortcut-element.component.scss']
})
export class ShortcutElementComponent implements OnInit {

  constructor(private logoRetrieval:LogoRetrievalService) { }

   //added for low BW
   @Input() lowBandwidthElement:boolean;

  @Input() shortcutData:ShortcutElement;
  imageUrl:string;
  ngOnInit(): void {
    if(!this.lowBandwidthElement){
      this.imageUrl=this.logoRetrieval.getLogoFromUrl(this.shortcutData.url);
    }
  }
  openUrl():void{
    window.open(this.shortcutData.url);
  }

}
