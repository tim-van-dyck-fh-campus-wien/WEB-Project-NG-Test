import { Component, OnInit } from '@angular/core';
import { WeatherData } from '../models/Weather.interface';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-element',
  templateUrl: './weather-element.component.html',
  styleUrls: ['./weather-element.component.scss']
})
export class WeatherElementComponent implements OnInit {

  //initialize weatherData that is updated by WeatherService & used at other places too
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


//error handling (only for this component)
failed: boolean = false;
loading: boolean = false;

//change initial city in DB
textfieldIsVisible:boolean;


  constructor(public weatherService: WeatherService) { 
  }

  ngOnInit() {
   this.getCity();
   this.textfieldIsVisible = false;
  }

   //new API call for city entered
  clickme(myCity:string){
    if (myCity == ""){
      alert("Please enter a city value.")
    } else if (this.weatherData.city != myCity) {
    this.loading = true;
    this.makeAPIcall(myCity);
    }
  }

  //called for initial loading with city from DB
  getCity(){
    this.weatherService.getInitialCityFromDB().then((response)=>{
      this.weatherData.city = response;
      this.weatherData.initialCity = response;
      this.makeAPIcall(this.weatherData.city);
    })
  }

   //updates weatherData with data from API call
  async makeAPIcall(myCity){
    this.weatherData.city = myCity; 
    let newData = (await this.weatherService.getCurrentWeather(this.weatherData.city)).subscribe
    (x => {
     this.failed = false;
     this.weatherData.city = x.updatedCity;
     this.weatherData.temp = x.temp.toFixed(0);
     this.weatherData.weatherID = x.weather.id;
     this.weatherData.temp_min = x.temp_min.toFixed(0);
     this.weatherData.temp_max = x.temp_max.toFixed(0); 
     if (this.weatherData.weatherDescription == this.weatherService.getWeatherType(this.weatherData.weatherID)){
     } else {
      this.removeIcon();
     } 
     this.weatherData.weatherDescription = this.weatherService.getWeatherType(this.weatherData.weatherID);
     //console.log(this.weatherData.weatherDescription)
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
   // this.weatherData.weatherDescription = "unknown";
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


