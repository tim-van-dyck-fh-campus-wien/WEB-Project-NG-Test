export interface WeatherData{
    
    //initialize data that is updated by WeatherService
 
 temp: number;
 temp_min: number;
 temp_max: number; 
 weatherID:number;
 weatherDescription: string;
 //sunrise: number;
// sunset:Date;
 isDay: boolean;
 APIcityForActivities:string|null;
 }
