import { Router } from '@angular/router';
import { LoginService } from './../login.service';
import { LoginData } from './../models/LoginData.interface';
import { Component, Input, OnInit, Output } from '@angular/core';
import{EventEmitter} from "@angular/core";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  constructor(private loginServ:LoginService,
    private router:Router) {

  }
  @Input() initialData:LoginData;
  @Output() submit = new EventEmitter<LoginData>();
  @Output() registerClicked = new EventEmitter<LoginData>();
  firstNameBind:string;

  ngOnInit(): void {
  }
  onSubmit(f:NgForm){
      let data:LoginData = f.value as LoginData;
      this.loginServ.validateCredentials(data).then((success)=>{
        if(success){
          alert("Login Success");
          console.dir(data);
          this.router.navigate(["lowbandwidth"]);
          //this.router.navigate(["main-page-component"]);
        }else{
          alert("Could not login, try again");
        }
      })
  }
  onRegisterClicked(f:NgForm){
    let data:LoginData=f.value as LoginData;
    this.registerClicked.emit(data);
  }

}
