import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-weather-element',
  templateUrl: './weather-element.component.html',
  styleUrls: ['./weather-element.component.css']
})
export class WeatherElementComponent implements OnInit {

   //initialize data that is updated by WeatherService
city: string | null = 'Wien';
weather : string = '?';
temp = 0;
weatherID:number=0;
weatherDescription: string = 'none';
sunrise: number = 0;
isDay: true;

newCity!: string;
//to check whether city exists
failed: boolean = false;
//to not resend data on multiple clicks when already searching
searching: boolean = false; 

//If the user input was not valid, the output will be error handled 
failedToLoad: boolean = false;
  constructor(public weatherService: WeatherService, private route: ActivatedRoute) { }

  ngOnInit() {

    //get city from the angular route 
    //doesn't work within this
    //for now, will be changed to input value / automatic value binding with location
      this.route.paramMap.subscribe(route => {
     // this.city = route.get('Wien');
      this.reset();
      this.weatherService.getCurrentWeather(this.city).subscribe
      (x => {
        this.weather = x.weather.description;
        this.temp = x.temp;
        this.weatherID = x.weather.id;
        this.weatherDescription = this.getWeatherType(this.weatherID);
        this.sunrise = x.sys.sunrise; 
             
      },
      //error handling, if user input invalid, connected to HTML *ngIf 
        error => {
          console.log('error occured', error);
          this.failedToLoad = true;
        });
    });
   }
  
  
   clickme(myCity:string){
     this.city = myCity; 
     this.reset();
     this.weatherService.getCurrentWeather(this.city).subscribe
     (x => {
       this.weather = x.weather.description;
       this.temp = x.temp;
       this.weatherID = x.weather.id;
       this.weatherDescription = this.getWeatherType(this.weatherID);
       this.sunrise = x.sys.sunrise; 
            
     },
     //error handling, if user input invalid, connected to HTML *ngIf 
       error => {
         console.log('error occured', error);
         this.failedToLoad = true;
       });
    
   }

   reset() {
    this.failedToLoad = false;
    this.weather = '?';
    this.temp = 0;
    this.weatherID = 0;
    this.weatherDescription = "unknown"
    this.sunrise = 0;
  }

  addCity() {
    this.failed = false;
    this.searching = true;
    const city = this.newCity;
    this.weatherService.getCurrentWeather(city).subscribe
    (x => {
      console.log('Successfully found city');
      this.searching = false;
     // this.router.navigate(['/city/' + city]);
    },
      error => {
        console.log('Could not add city');
        this.failed = true;
        this.searching = false;
      });
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


