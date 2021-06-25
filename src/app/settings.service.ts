import { Injectable } from '@angular/core';
import { Visibility } from './models/Visibility.interface';
import { environment } from './../environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private loginService:LoginService) { }

  public async setVisibilitySettings(visibility:Visibility):Promise<boolean>{
    if(await this.loginService.isLoggedIn()){
      const response = await fetch(environment.apiBaseUrl + "/user/widgets/visibility", {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body:JSON.stringify({weatherIsVisible:visibility.weatherIsVisible,
          todoIsVisible:visibility.todoIsVisible, dadJokeIsVisible:visibility.dadJokeIsVisible})
      });
      if (response.ok) {
        return true;
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


  public async getCurrentUserSettings():Promise<Visibility>{
    if(await this.loginService.isLoggedIn()){
      const response = await fetch(environment.apiBaseUrl + "/user/widgets/visibility", {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      if (response.ok) {
        let res = await response.json();
        return res;
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
