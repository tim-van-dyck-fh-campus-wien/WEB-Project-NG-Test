import { Widget } from './Widget.interface';
import { WeatherModel } from './WeatherModel.interface';
export interface User{
    _id:string;
    firstname:string;
    lastname:string;
    email:string;
    widgets:Widget[];
    weather:WeatherModel
}