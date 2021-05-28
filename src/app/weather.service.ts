import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { map, delay, materialize, dematerialize } from 'rxjs/operators';
import { WeatherData } from './../app/models/Weather.interface';
import { WeatherElementComponent } from './weather-element/weather-element.component';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class WeatherService {

  constructor(private httpClient: HttpClient) { }
  //define my API Key which is used for the calls
  //apiKey = 'ffbb344287855685985d58e95dd1262f';
  apiKey = '5e3281564a5218651547aa65485f14c0';
  unit = 'metric'; //define format of numbers returned
  
  //variables to be updated by weatherElement to be used by activitiesElement
  weatherdesc:string;
  tempForActivity:number;
  cityForActivity:string;
/*
  completeWeatherData : WeatherData = {
    temp: 0,
    weatherDescription: "none",
    currentlyDisplayedCity: "none",
    temp_min: 0,
    temp_max: 0, 
    id: 0,
    }
*/

  getCurrentWeather(city: string | null): Observable<any> {
    //do API call with current city
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${this.unit}&APPID=${this.apiKey}`;
    console.log('apiCall', apiCall); //log API Call output to console
    return this.httpClient.get<any>(apiCall).pipe(
      map(response => {
        console.log('apiResponse', response); 
        const updatedCity = response.name;
        const weather = response.weather[0];
        const temp = response.main.temp; 
        const temp_min = response.main.temp_min;
        const temp_max = response.main.temp_max;  
        const timezone = response.timezone;
        const x = {weather, temp, temp_min, temp_max, timezone, updatedCity};
        console.log("Logging updated Data in WeatherService:", x)
        return x;
      }));
    }

//work in progress to differentiate day/nighttime
    calculateTime(timezone:any){
      timezone = (timezone / 3600); 
      let localTime = new Date();
      //localTime = (localTime.getTime() + timezone.toLocaleTimeString()); 
      return localTime;
    }

 //roughly map weatherID to a self defined weather description for the weather Icon/activity mapping   
getWeatherType(weatherID: number){
  if (weatherID >= 200 && weatherID < 300) {
    return this.weatherdesc = "lightning";
  }
  if (weatherID >= 300 && weatherID < 600) {
    return this.weatherdesc = "rain";
  }
  if (weatherID >= 600 && weatherID < 700) {
    return this.weatherdesc = "snow";
  }
  if (weatherID >= 700 && weatherID < 800) {
    return this.weatherdesc = "fog";
  }
  if (weatherID === 800) {
    return this.weatherdesc = "clear";
  }
  if (weatherID >= 801 && weatherID < 803) {
    return this.weatherdesc = "partialClear";
  }
  if (weatherID >= 803 && weatherID < 900) {
    return this.weatherdesc = "cloud";
  }
  return this.weatherdesc = "unknown";
}

  }
