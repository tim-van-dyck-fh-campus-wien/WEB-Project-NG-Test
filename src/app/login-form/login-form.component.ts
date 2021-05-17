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
      if(this.loginServ.validateCredentials(data)){//login sucessfull
        alert("Login Success");
        console.dir(data);
        this.router.navigate(["main-page-component"]);
    }else{

    }
  }
  onRegisterClicked(f:NgForm){
    let data:LoginData=f.value as LoginData;
    this.registerClicked.emit(data);
  }

}
