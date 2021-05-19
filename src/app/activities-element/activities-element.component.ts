import { Component, OnInit } from '@angular/core';
import {WeatherElementComponent} from 'src/app/weather-element/weather-element.component';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-activities-element',
  templateUrl: './activities-element.component.html',
  styleUrls: ['./activities-element.component.css']
})
export class ActivitiesElementComponent implements OnInit {

constructor(private weatherService:WeatherService) { }

weatherDescripForActivities:string; 
currentCityForActivities:string;

  ngOnInit() {
    //use values stored in weatherService to return specific suggested activities & current city for hrefs
    this.currentCityForActivities = this.weatherService.cityForActivity; 
    this.getActivities(this.weatherService.tempForActivity, this.weatherService.weatherdesc);
    console.log('onInit Activities', this.weatherService.tempForActivity, this.weatherService.weatherdesc);
  }


  //upon button click, the activities update based on weatherService Data for currently searched city based on weather/temp
  updateActivities(){
    this.currentCityForActivities = this.weatherService.cityForActivity; 
    this.getActivities(this.weatherService.tempForActivity, this.weatherService.weatherdesc);
  }

  //set keywords for activities
  getActivities(temp:number, weatherDescription:string){
     if (weatherDescription == 'snow'){
      return this.weatherDescripForActivities = "snow"; 
     }
     if(weatherDescription == 'rain' ||weatherDescription == 'lightning' ||weatherDescription == 'fog'){
       return this.weatherDescripForActivities = "insideActivities";
     }
     if (weatherDescription == 'clear'||weatherDescription == 'partialClear'||weatherDescription == 'cloud'){
         if (temp <= 20){
           return this.weatherDescripForActivities = "outsideWarm"; 
           }
         if (temp > 20){
           return this.weatherDescripForActivities = "outsideHot";
           }
      }
  }
}
