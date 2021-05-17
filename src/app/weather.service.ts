import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, delay, materialize, dematerialize } from 'rxjs/operators';
import { WeatherData } from './../app/models/Weather.interface';
import { WeatherElementComponent } from './weather-element/weather-element.component';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  constructor(private httpClient: HttpClient) { }
  //define my API Key which is used for the calls
  apiKey = 'ffbb344287855685985d58e95dd1262f';
  unit = 'metric'; //define format of numbers returned
  weatherdesc:string;


  getCurrentWeather(city: string | null): Observable<any> {
    //do API call with current city
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${this.unit}&APPID=${this.apiKey}`;
    console.log('apiCall', apiCall); //log API Call output to console
    return this.httpClient.get<any>(apiCall).pipe(
      map(response => {
        console.log('apiResponse', response); 
        //found in the JSON file, the api is responding with
        const APIcity = response.name;
        const weather = response.weather[0];
        const temp = response.main.temp; 
        const weatherID = response.weather.id;
        const temp_min = response.main.temp_min;
        const temp_max = response.main.temp_max;  
        const timezone = response.timezone; 
        const x = {weather, temp, weatherID, temp_min, temp_max, timezone, APIcity};
       // const sunsetTime = new Date(response.sys.sunset * 1000);
        return x;
      }));
    }
 
    arrWeather: Array<WeatherData> = [];
    saveWeatherData(WeatherData){
      //puts Data into array
      this.arrWeather.push(WeatherData);
      console.log(this.arrWeather);
    }
    getWeatherData(){
      return this.arrWeather;
    }

   // currentAPIcity(WeatherData){
     // return WeatherData.APIcityForActivities;
    //}

    calculateTime(timezone:any){
      timezone = (timezone / 3600); 
      let localTime = new Date();
      //localTime = (localTime.getTime() + timezone.toLocaleTimeString()); 
      return localTime;
    }

    
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
