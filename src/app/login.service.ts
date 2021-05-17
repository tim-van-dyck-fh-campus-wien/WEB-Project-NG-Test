import { LoginData } from './models/LoginData.interface';
import { Injectable } from '@angular/core';
import { RegisterData } from './models/RegisterData.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  public validateCredentials(credentials:LoginData):boolean{
      return true;
  }
  public registerAccount(data:RegisterData):boolean{
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
