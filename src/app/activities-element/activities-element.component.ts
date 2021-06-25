import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-activities-element',
  templateUrl: './activities-element.component.html',
  styleUrls: ['./activities-element.component.scss']
})
export class ActivitiesElementComponent implements OnInit {

  @Input() weatherDescripForActivities:string; 
  @Input() currentCityForActivities:string;
  @Input() failedAPIcall:boolean;

  ngOnInit(){}
  
}
