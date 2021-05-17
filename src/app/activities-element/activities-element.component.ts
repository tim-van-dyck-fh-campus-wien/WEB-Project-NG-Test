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
  temperatureForActivities:number;
  weatherDescripForActivities:string; 

  ngOnInit(): void {
  //  this.city = 'Vienna';
   this.updateCity('Vienna');
   this.weatherService.getWeatherData();
   
   // this.temperatureForActivities = this.weatherElement.temp;
   // this.weatherDescripForActivities = this.weatherElement.weatherDescription; 
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

updateCity(city:string){
  this.city = city;
  let myData = this.weatherService.getCurrentWeather(this.city).subscribe
  (x => {
   // this.displayCity = x.name; //Test
    this.temp = x.temp.toFixed(0);
    this.weatherID = x.weather.id;
    this.temp_min = x.temp_min.toFixed(0);
    this.temp_max = x.temp_max.toFixed(0);
    this.weatherDescription = this.weatherService.getWeatherType(this.weatherID);
    this.timezone = x.timezone;
    this.weatherService.calculateTime(this.timezone);
    //this.weatherService.saveWeatherData(myData); - sollte Daten nur in einem Array abspeichern -> löst aber zweifach Icon aus
    console.log('Initialize: ', myData);
    this.weatherDescripForActivities = this.getActivities(this.temp, this.weatherDescription);
  },
  //error handling, if user input invalid, connected to HTML *ngIf 
    error => {
      console.log('error occured', error);
      this.failedToLoad = true;
    });
this.reset();

}

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
