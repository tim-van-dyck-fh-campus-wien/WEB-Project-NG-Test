import { LoginData } from './models/LoginData.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  public validateCredentials(credentials:LoginData):boolean{
      return true;
  }
  public login():boolean{
      console.log("login successfull");
      return true;
  }
  public isLoggedIn():boolean{
    return false;
  }

}
