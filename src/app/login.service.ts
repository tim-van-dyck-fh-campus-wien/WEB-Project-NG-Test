import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public login():boolean{
      console.log("login successfull");
      return true;
  }
  public isLoggedIn():boolean{
    return false;
  }

}
