import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { WeatherData } from './../models/Weather.interface';
import {ActivitiesElementComponent} from '../activities-element/activities-element.component'

@Component({
  selector: 'app-weather-element',
  templateUrl: './weather-element.component.html',
  styleUrls: ['./weather-element.component.scss']
})
export class WeatherElementComponent implements OnInit {

   //initialize data that is updated by WeatherService
city: string | null;
temp:number = 0;
weatherID:number=0;
weatherDescription: string = 'none';
sunrise: number = 0;
sunset:Date;
isDay: boolean = true;
temp_min: number;
temp_max: number;
timezone: number|Date;
//to check whether city exists
failed: boolean = false;
//to not resend data on multiple clicks when already searching
searching: boolean = false; 
//If the user input was not valid, the output will be error handled 
failedToLoad: boolean = false;

activitiesWeatherDescription: string;


  constructor(public weatherService: WeatherService) { 
  }

  ngOnInit() {
    this.city = 'Vienna';
    this.makeAPIcall(this.city);
  }
  
   //makes a new API call for city entered
  clickme(myCity:string){
    this.makeAPIcall(myCity);
  }

   //takes care of API call itself
  makeAPIcall(myCity){
    this.city = myCity; 
    let newData = this.weatherService.getCurrentWeather(this.city).subscribe
    (x => {
     this.city = x.updatedCity;
     this.temp = x.temp.toFixed(0);
     this.weatherID = x.weather.id;
     this.temp_min = x.temp_min.toFixed(0);
     this.temp_max = x.temp_max.toFixed(0); 
    if (this.weatherDescription == this.weatherService.getWeatherType(this.weatherID)){
    } else {
      this.removeIcon();
    } 
     this.weatherDescription = this.weatherService.getWeatherType(this.weatherID);
     this.activitiesWeatherDescription = this.getActivities(this.temp, this.weatherDescription);
    },
    //error handling, if user input invalid, connected to HTML *ngIf 
      error => {
        console.log('error occured', error);
        this.failedToLoad = true;
        this.reset();
      });
   }

   //reset in case of failure
  reset() {
    this.failedToLoad = false;
    this.temp_min = 0;
    this.temp_max = 0; 
    this.temp = 0;
    this.weatherID = 0;
    this.weatherDescription = "unknown";
  }

  //with city update, new icon might be needed
  removeIcon(){
    var currentIcon = document.getElementById("icon"); 
   if (currentIcon != null){
      currentIcon.remove();
    }
  }

  //with each API call, activities get updated & passed to activities-element
  getActivities(temp:number, weatherDescription:string){
    if (weatherDescription == 'snow'){
     return this.activitiesWeatherDescription = "snow"; 
    }
    if(weatherDescription == 'rain' ||weatherDescription == 'lightning' ||weatherDescription == 'fog'){
      return this.activitiesWeatherDescription = "insideActivities";
    }
    if (weatherDescription == 'clear'||weatherDescription == 'partialClear'||weatherDescription == 'cloud'){
        if (temp <= 20){
          return this.activitiesWeatherDescription = "outsideWarm"; 
          }
        if (temp > 20){
          return this.activitiesWeatherDescription = "outsideHot";
          }
     }
 }


}


