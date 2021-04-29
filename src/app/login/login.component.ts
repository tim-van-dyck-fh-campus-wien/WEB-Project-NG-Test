import { LoginData } from './../models/LoginData.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor() { }
  public loginIsCollapsed=true;
  zahl:string="1234";
   
  texts=["asdf","hello","12342435"];

  ngOnInit(): void {
    this.zahl
  }
  handleSubmit(data:LoginData){
    alert(data.email);
  }


}
