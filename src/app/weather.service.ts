import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable, of, Subject, throwError } from 'rxjs';
import { map, delay, materialize, dematerialize } from 'rxjs/operators';
import { WeatherData } from './../app/models/Weather.interface';
import { WeatherElementComponent } from './weather-element/weather-element.component';
import { Data } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class WeatherService {

  constructor(private httpClient: HttpClient, private loginService:LoginService) { }
  //define my API Key which is used for the calls
  //apiKey = 'ffbb344287855685985d58e95dd1262f';
  apiKey = '5e3281564a5218651547aa65485f14c0';
  unit = 'metric'; //define format of numbers returned
  
  //get Icon for cur Weather
  weatherdesc:string;

  //test for weather
  activitiesWeatherDescription:string;
  tempAct:number;


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

    public async getInitialCityFromDB():Promise<string>{
      if(await this.loginService.isLoggedIn()){
        const response = await fetch(environment.apiBaseUrl + "/user/widgets/weather/city", {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });
        if (response.ok) {
          let res = await response.json();
          return res.city;
        }else{
            if(response.status==401){
              throw "You may not be logged in,please log in!";
            }else{
              throw "An error was encountered!"
            }
        }
      }
      throw "You may not be logged in,please log in!";    
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

 //with each API call, activities get updated & passed to activities-element
 getActivities(temp:number, weatherDescription:string){
  if (weatherDescription == 'unknown'){
    return this.activitiesWeatherDescription = "notAvailable";
  }
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
