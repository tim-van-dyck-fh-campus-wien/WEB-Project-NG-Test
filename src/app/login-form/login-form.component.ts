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
  @Input() firstName:string;
  @Output() submit = new EventEmitter<LoginData>();
  firstNameBind:string;

  ngOnInit(): void {
    this.firstNameBind=this.firstName;
  }
  onSubmit(f:NgForm){
      let data:LoginData = f.value as LoginData;
      //this.submit.emit(returnData);
      if(this.loginServ.validateCredentials(data)){//login sucessfull
        alert("Login Success");
        console.dir(data);
        this.router.navigate(["main-page-component"]);
    }else{

    }
  }

}
