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
  

  getCurrentWeather(city: string | null): Observable<any> {
    //do API call with current city
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${this.unit}&APPID=${this.apiKey}`;
    console.log('apiCall', apiCall); //log API Call output to console
    return this.httpClient.get<any>(apiCall).pipe(
      map(response => {
        console.log('apiResponse', response); 
        //found in the JSON file, the api is responding with
        const weather = response.weather[0];
        const temp = response.main.temp; 
        const weatherID = response.weather.id;
        const temp_min = response.main.temp_min;
        const temp_max = response.main.temp_max;  
        const x = {weather, temp, weatherID, temp_min, temp_max};
       // const sunsetTime = new Date(response.sys.sunset * 1000);
        return x;
      }));
    }
 
    saveWeatherData(WeatherData){
      let arrWeather: Array<WeatherData> = [];
      //puts Data into array
      arrWeather.push(WeatherData);
    }
  }
