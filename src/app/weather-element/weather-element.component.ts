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
city: any;
temp:number = 0;
weatherID:number=0;
weatherDescription: string = 'none';
temp_min: number;
temp_max: number;
activitiesWeatherDescription: string;

//error handling
failed: boolean = false;
loading: boolean = false;

//change initial city
textfieldIsVisible:boolean;


  constructor(public weatherService: WeatherService) { 
  }

  ngOnInit() {
   this.getCity();
   this.textfieldIsVisible = false;
  }

   //makes a new API call for city entered
  clickme(myCity:string){
    this.loading = true;
    this.makeAPIcall(myCity);
  }

  //called for initial loading with city from DB
  getCity(){
    this.weatherService.getInitialCityFromDB().then((response)=>{
      this.city=response;
      console.log(this.city);
      this.makeAPIcall(this.city);
    })
  }

   //takes care of API call itself
  makeAPIcall(myCity){
    this.city = myCity; 
    let newData = this.weatherService.getCurrentWeather(this.city).subscribe
    (x => {
     this.failed = false;
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
     this.activitiesWeatherDescription = this.weatherService.getActivities(this.temp, this.weatherDescription);
     this.loading = false;
    },
    //error handling, if user input invalid, connected to HTML *ngIf 
      error => {
        console.log('error occured', error);
        this.weatherDescription = "unknown";
        if (this.weatherDescription == this.weatherService.getWeatherType(this.weatherID)){
        } else {
          this.removeIcon();
        } 
         this.activitiesWeatherDescription = this.weatherService.getActivities(this.temp, this.weatherDescription);
        this.failed = true;
        this.loading = false; 
        this.reset();
      });
   }

   //reset in case of failure
  reset() {
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

  showTextfield(){
    if (this.textfieldIsVisible == true){
      this.textfieldIsVisible = false;
    } else {
      this.textfieldIsVisible = true;
    }
  }  


  changeInitialCityValue(initialCity:String){
    if (initialCity === ""){
      alert("Please enter a valid City!");
    } else {
    this.weatherService.setInitialCity(initialCity).then((success) =>{
      if(success){
        console.log(success);
      }
    }, error =>
      console.log(error));
      this.textfieldIsVisible = false;
    }
  }
  

}


