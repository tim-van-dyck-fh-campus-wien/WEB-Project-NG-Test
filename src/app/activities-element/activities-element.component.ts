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
weatherDescription: string;
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

  ngOnInit() {
   //this.updateCity('Vienna'); //initial standard value for now // should work without an extra API call
   //probably the API call should happen at mainpage / loginclick to get values in time 
   this.temperatureForActivities = this.weatherService.tempForActivity;
   this.weatherDescripForActivities = this.weatherService.weatherdesc; 
   console.log('onInit Activities', this.temperatureForActivities, this.weatherDescripForActivities);
  // this.weatherService.getWeatherData(); gets weather description 
   this.getActivities(this.temperatureForActivities, this.weatherDescripForActivities);
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

  //upon button click, the activities should update for currently searched city based on weather/temp (gets data from weatherService)
  //(city update could be nice, to get href links with the specific city searched in the weather widget)
  updateActivities(){
    //supposed to get the current values of temperature / weatherdescription 
    //from the weatherService to update activities if needed
    this.temperatureForActivities = this.weatherService.tempForActivity; 
    this.weatherDescripForActivities = this.weatherService.weatherdesc; 
    this.getActivities(this.temperatureForActivities, this.weatherDescripForActivities);
  }


  //second API call for the activities -> should be avoided in longterm -> API overkill 
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
    this.temperatureForActivities = this.weatherService.tempForActivity;
    this.weatherDescripForActivities = this.weatherService.weatherdesc; 
    this.getActivities(this.temp, this.weatherDescription);
  },
  //error handling, if user input invalid, connected to HTML *ngIf 
    error => {
      console.log('error occured', error);
      this.failedToLoad = true;
      this.reset();
    });
    this.temperatureForActivities = this.weatherService.tempForActivity;
    this.weatherDescripForActivities = this.weatherService.weatherdesc; 
    //this.reset();
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
