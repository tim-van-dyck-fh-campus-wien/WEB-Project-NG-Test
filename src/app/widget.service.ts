import { environment } from './../environments/environment';
import { Widget } from './models/Widget.interface';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//Service for fetching widgets from API
export class WidgetService {
  constructor(private loginService:LoginService) {
  }
  public async getListOfWidgets():Promise<Widget[]>{
    if(await this.loginService.isLoggedIn()){
      const response = await fetch(environment.apiBaseUrl + "/user/widgets", {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      if (response.ok) {
        let res = await response.json();
        return res.widgets;
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




}
