import { LoginService } from './../login.service';
import { LoginData } from './../models/LoginData.interface';
import {  Component, OnInit , HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AUTO_STYLE,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[
    trigger('toggleVisbilityLoginButtons',[
      state('visible',style({
        transform:"scaleY(1)",
        visibility:"visible"
      })),
      state('hidden',style({
        height:"0px",
        transform:"scaleY(0)"
      })),
      transition('visible => hidden',[
        animate('0.3s')
      ]),
      transition('hidden => visible', [
        animate('0.3s')
      ]),
    ]),

  ],
})
export class LoginComponent implements OnInit {
  constructor() { }
  public loginIsCollapsed=true;
  public registerIsCollapsed=true;
  public loginButtonsVisible=true;
  public initialData:LoginData={email:'',password:''};

  texts=["asdf","hello","12342435"];
  ngOnInit(): void {
  }
  showLoginForm():void{
    this.loginIsCollapsed=false;
    this.registerIsCollapsed=true;
  }
  hideForms():void{
    this.loginIsCollapsed=true;
    this.registerIsCollapsed=true;
  }
  showRegisterForm():void{
    this.registerIsCollapsed=false;
    this.loginIsCollapsed=true;
  }
  handleSubmit(data:LoginData){


  }
  onLoginFormRegisterClicked(data:LoginData){
    this.initialData=data;
    this.showRegisterForm();
  }
  onRegisterFormLoginClicked(data:LoginData){
    this.initialData=data;
    this.showLoginForm();
  }


}
