import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { WeatherData } from './../models/Weather.interface';
import {ActivitiesElementComponent} from '../activities-element/activities-element.component'

@Component({
  selector: 'app-weather-element',
  templateUrl: './weather-element.component.html',
  styleUrls: ['./weather-element.component.css']
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
APICity: string|null;
timezone: number|Date;


//to check whether city exists
failed: boolean = false;
//to not resend data on multiple clicks when already searching
searching: boolean = false; 

//If the user input was not valid, the output will be error handled 
failedToLoad: boolean = false;


  constructor(public weatherService: WeatherService) { }

  ngOnInit() {
    this.city = 'Vienna';
    this.makeAPIcall(this.city);
   }
  
  clickme(myCity:string){
    this.removeIcon();
    this.makeAPIcall(myCity);
    this.weatherService.weatherdesc = this.weatherDescription;
    this.weatherService.tempForActivity = this.temp; 
    console.log('Double Update: WeatherElement', this.weatherService.weatherdesc, this.weatherService.tempForActivity);
   }

  makeAPIcall(myCity){
    this.city = myCity; 
    let newData = this.weatherService.getCurrentWeather(this.city).subscribe
    (x => {
     this.APICity = x.name; //Test
     this.temp = x.temp.toFixed(0);
     this.weatherID = x.weather.id;
     this.temp_min = x.temp_min.toFixed(0);
     this.temp_max = x.temp_max.toFixed(0);
     this.weatherDescription = this.weatherService.getWeatherType(this.weatherID);
     this.timezone = x.timezone; 
    // this.weatherService.saveWeatherData(newData);  
    },
    //error handling, if user input invalid, connected to HTML *ngIf 
      error => {
        console.log('error occured', error);
        this.failedToLoad = true;
        this.reset;
      });
      this.weatherService.weatherdesc = this.weatherDescription;
      this.weatherService.tempForActivity = this.temp; 
      console.log("WeatherElement: ", this.weatherService.weatherdesc, this.weatherService.tempForActivity); 
     // this.reset();
   }

  reset() {
    this.failedToLoad = false;
    this.temp_min = 0;
    this.temp_max = 0; 
    this.temp = 0;
    this.weatherID = 0;
   // this.weatherDescription = "unknown";
  }

  removeIcon(){
    var currentIcon = document.getElementById("icon"); 
    if (currentIcon != null){
      currentIcon.remove();
    }
  }

}


