import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginData } from './models/LoginData.interface';
import { Injectable } from '@angular/core';
import { RegisterData } from './models/RegisterData.interface';
import { ThrowStmt } from '@angular/compiler';
import { UserData } from './models/UserData.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private httpClient: HttpClient) { }

  public async validateCredentials(credentials: LoginData): Promise<boolean> {
    const response = await fetch(environment.apiBaseUrl + "/auth/login", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      this.getUserData();
      return true;
    }else{
      return false;
    }

  }
  public async registerAccount(data: RegisterData): Promise<boolean> {
    console.dir(JSON.stringify(data))
    const response = await fetch(environment.apiBaseUrl + "/auth/register", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (response.ok) {
      let ret = await this.validateCredentials({email:data.email,password:data.password});
      return ret;
    } else {
      return false;
    }
  }
  public getCookie(): void {
    //this.httpClient.get(this.apiBaseUrl+'/user',{responseType:'text',withCredentials:true}).subscribe((res)=>{
    // });
  }
  //Check if session is still active and user is logged in
  public async isLoggedIn(): Promise<boolean> {
    const response = await fetch(environment.apiBaseUrl + "/auth/checkAuthentication", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    if (response.ok) {
      return true;
    }else if(response.status==401){
      return false;
    }else{
      throw "Request could not be handled";
    }
  }
  public async getUserData():Promise<UserData>{
    if(await this.isLoggedIn()){
      const response = await fetch(environment.apiBaseUrl + "/user/UserData", {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      if (response.ok) {
        return await response.json();
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
  public async logOut(){
      const response = await fetch(environment.apiBaseUrl + "/auth/logout", {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
  }

}
