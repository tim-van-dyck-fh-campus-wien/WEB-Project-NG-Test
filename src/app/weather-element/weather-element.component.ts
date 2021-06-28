import { Component, OnInit } from '@angular/core';
import { WeatherData } from '../models/Weather.interface';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-element',
  templateUrl: './weather-element.component.html',
  styleUrls: ['./weather-element.component.scss']
})
export class WeatherElementComponent implements OnInit {

weatherData:WeatherData = {
  initialCity: "",
  city: "", 
  temp: 0,
  weatherID: 0,
  weatherDescription: "none", 
  temp_min: 0,
  temp_max: 0,
  activitiesWeatherDescription: "none",
}

//initialize data that is updated by WeatherService
/*city: any;
temp:number = 0;
weatherID:number=0;
weatherDescription: string = 'none';
temp_min: number;
temp_max: number;
activitiesWeatherDescription: string;*/

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
    if (myCity == ""){
      alert("Please enter a city value.")
    } 
   // else if (this.city != myCity){
      else if (this.weatherData.city != myCity){
    this.loading = true;
    this.makeAPIcall(myCity);
    }
  }

  //called for initial loading with city from DB
  getCity(){
    this.weatherService.getInitialCityFromDB().then((response)=>{
      this.weatherData.city = response;
      this.weatherData.initialCity = response;
     // this.city=response;
      //console.log(this.city);
      this.makeAPIcall(this.weatherData.city);
      //this.makeAPIcall(this.city);
    })
  }

   //takes care of API call itself
  async makeAPIcall(myCity){
    this.weatherData.city = myCity; 
    //let newData = (await this.weatherService.getCurrentWeather(this.city)).subscribe

    let newData = (await this.weatherService.getCurrentWeather(this.weatherData.city)).subscribe
    (x => {
     this.failed = false;
     this.weatherData.city = x.updatedCity;
     this.weatherData.temp = x.temp.toFixed(0);
     this.weatherData.weatherID = x.weather.id;
     this.weatherData.temp_min = x.temp_min.toFixed(0);
     this.weatherData.temp_max = x.temp_max.toFixed(0); 


    /* this.city = x.updatedCity;
     this.temp = x.temp.toFixed(0);
     this.weatherID = x.weather.id;
     this.temp_min = x.temp_min.toFixed(0);
     this.temp_max = x.temp_max.toFixed(0); 
    if (this.weatherDescription == this.weatherService.getWeatherType(this.weatherID)){
    } else {
      this.removeIcon();
    } 
     this.weatherDescription = this.weatherService.getWeatherType(this.weatherID);
     console.log(this.weatherDescription)
     this.activitiesWeatherDescription = this.weatherService.getActivities(this.temp, this.weatherDescription);
     this.loading = false;*/


     if (this.weatherData.weatherDescription == this.weatherService.getWeatherType(this.weatherData.weatherID)){
    } else {
      this.removeIcon();
    } 
     this.weatherData.weatherDescription = this.weatherService.getWeatherType(this.weatherData.weatherID);
     console.log(this.weatherData.weatherDescription)
     this.weatherData.activitiesWeatherDescription = this.weatherService.getActivities(this.weatherData.temp, this.weatherData.weatherDescription);
     this.loading = false;

    },
    //error handling, if user input invalid, connected to HTML *ngIf 
      error => {
        console.log('error occured', error);

        this.weatherData.weatherDescription = "unknown";
        if (this.weatherData.weatherDescription == this.weatherService.getWeatherType(this.weatherData.weatherID)){
        } else {
          this.removeIcon();
        } 
         this.weatherData.activitiesWeatherDescription = this.weatherService.getActivities(this.weatherData.temp, this.weatherData.weatherDescription);


        /*this.weatherDescription = "unknown";
        if (this.weatherDescription == this.weatherService.getWeatherType(this.weatherID)){
        } else {
          this.removeIcon();
        } 
         this.activitiesWeatherDescription = this.weatherService.getActivities(this.temp, this.weatherDescription);*/
        this.failed = true;
        this.loading = false; 
        this.reset();
      });
   }

   //reset in case of failure
  reset() {
    this.weatherData.temp_min = 0;
    this.weatherData.temp_max = 0; 
    this.weatherData.temp = 0;
    this.weatherData.weatherID = 0;
    this.weatherData.weatherDescription = "unknown";
   /* this.temp_min = 0;
    this.temp_max = 0; 
    this.temp = 0;
    this.weatherID = 0;
    this.weatherDescription = "unknown";*/
  }

 
  //with city update, new icon might be needed
  removeIcon(){
    var iconIdArray: Array<string> = ["cloud", "smog", "snow", "bolt", "sun", "cloudsun", "rain", "confused"];
    var curId = "";
    for(let i = 0; i <= iconIdArray.length; i++){
      curId = iconIdArray[i];
      var curIcon = document.getElementById(curId);
      if (curIcon != null){
        curIcon.remove();
        break;
      }
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
        this.weatherData.initialCity = initialCity;
        console.log(success);
      }
    }, error =>
      console.log(error));
      this.textfieldIsVisible = false;
    }
  }
  

}


