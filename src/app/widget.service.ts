import { ShortcutGroup } from './models/ShortcutGroup.interface';
import { environment } from './../environments/environment';
import { Widget } from './models/Widget.interface';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { JsonpClientBackend } from '@angular/common/http';
import { SimpleOuterSubscriber } from 'rxjs/internal/innerSubscribe';

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

    public async createShortcutGroup(shortcutGroup:ShortcutGroup):Promise<boolean>{
      console.dir(JSON.stringify(shortcutGroup))
      
      if(await this.loginService.isLoggedIn()){
        let json  = JSON.stringify(shortcutGroup, (key,val)=>{//Exclude all id fields!
          if(key!="_id"){
            return val;
          }
        });

          const response = await fetch(environment.apiBaseUrl + "/user/widgets/shortcutgroup", {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body:json,
            credentials: 'include',
          });
          if(response.ok){
            return true;
          }
        }
        return false;
    }

    public async deleteWidget(widgetId:String):Promise<boolean>{
      let json  = JSON.stringify({_id:widgetId});
    
      //works bec isloggedin returns boolean promise too
      if(await this.loginService.isLoggedIn()){
        const APIresponse = await fetch(environment.apiBaseUrl + "/user/widgets/id/", {
            method: 'delete',
            headers:{
              'Content-Type' : 'application/json'
            }, 
            body:json,
            credentials:'include'
          })
        if(APIresponse.ok){
          return true;
        }
      }
      return false;
}
}