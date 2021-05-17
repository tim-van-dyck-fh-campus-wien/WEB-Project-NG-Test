import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { WeatherData } from './../models/Weather.interface';

@Component({
  selector: 'app-weather-element',
  templateUrl: './weather-element.component.html',
  styleUrls: ['./weather-element.component.css']
})
export class WeatherElementComponent implements OnInit {

   //initialize data that is updated by WeatherService
city: string | null;

temp = 0;
weatherID:number=0;
weatherDescription: string = 'none';
sunrise: number = 0;
sunset:Date;
isDay: boolean = true;
temp_min: number;
temp_max: number;
displayCity: string|null;
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
     let myData = this.weatherService.getCurrentWeather(this.city).subscribe
      (x => {
       // this.displayCity = x.name; //Test
        this.temp = x.temp.toFixed(0);
        this.weatherID = x.weather.id;
        this.temp_min = x.temp_min.toFixed(0);
        this.temp_max = x.temp_max.toFixed(0);
        this.weatherDescription = this.getWeatherType(this.weatherID);
        this.timezone = x.timezone;
        this.weatherService.calculateTime(this.timezone);
        //this.weatherService.saveWeatherData(myData); - sollte Daten nur in einem Array abspeichern -> löst aber zweifach Icon aus
        console.log('Initialize: ', myData);
        //this.sunrise = x.sys.sunrise; 
        //let sunsetTime = new Date(x.sys.sunset * 1000);
        //let currentDate = new Date; 
        //this.isDay = (currentDate.getTime() < sunsetTime.getTime());
      },
      //error handling, if user input invalid, connected to HTML *ngIf 
        error => {
          console.log('error occured', error);
          this.failedToLoad = true;
        });
   this.reset();
   }
  
  
   clickme(myCity:string){
     this.removeIcon();
     this.city = myCity; 
     this.weatherService.getCurrentWeather(this.city).subscribe
     (x => {
     // this.displayCity = x.name; //Test
      this.temp = x.temp.toFixed(0);
      this.weatherID = x.weather.id;
      this.temp_min = x.temp_min.toFixed(0);
      this.temp_max = x.temp_max.toFixed(0);
      this.weatherDescription = this.getWeatherType(this.weatherID);
      this.timezone = x.timezone; 
      // this.sunrise = x.sys.sunrise; 
      //let sunsetTime = new Date(x.sys.sunset * 1000);
      //let currentDate = new Date; 
      //this.isDay = (currentDate.getTime() < (sunsetTime.getTime()+4));     
     },
     //error handling, if user input invalid, connected to HTML *ngIf 
       error => {
         console.log('error occured', error);
         this.failedToLoad = true;
       });
       this.reset();
   }

   reset() {
    this.failedToLoad = false;
    this.temp_min = 0;
    this.temp_max = 0; 
    this.temp = 0;
    this.weatherID = 0;
    this.weatherDescription = "unknown";
    //this.sunrise = 0;
  }

removeIcon(){
  var currentIcon = document.getElementById("icon"); 
  currentIcon.remove();
}

getWeatherType(weatherID: number){
    if (weatherID >= 200 && weatherID < 300) {
      return this.weatherDescription = "lightning";
    }
    if (weatherID >= 300 && weatherID < 600) {
      return this.weatherDescription = "rain";
    }
    if (weatherID >= 600 && weatherID < 700) {
      return this.weatherDescription = "snow";
    }
    if (weatherID >= 700 && weatherID < 800) {
      return this.weatherDescription = "fog";
    }
    if (weatherID === 800) {
      return this.weatherDescription = "clear";
    }
    if (weatherID >= 801 && weatherID < 803) {
      return this.weatherDescription = "partialClear";
    }
    if (weatherID >= 803 && weatherID < 900) {
      return this.weatherDescription = "cloud";
    }
    return this.weatherDescription = "unknown";
  }
}


