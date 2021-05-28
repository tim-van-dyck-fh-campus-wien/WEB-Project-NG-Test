import { Component,OnChanges, SimpleChanges, Input, OnInit, SimpleChange } from '@angular/core';
import {WeatherElementComponent} from 'src/app/weather-element/weather-element.component';
import { WeatherData } from '../models/Weather.interface';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-activities-element',
  templateUrl: './activities-element.component.html',
  styleUrls: ['./activities-element.component.scss']
})
export class ActivitiesElementComponent implements OnInit {

  @Input() weatherDescripForActivities:string; 
  @Input() currentCityForActivities:string;

  ngOnInit(){}
  
}
