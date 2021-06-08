import { Component, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import{EventEmitter} from "@angular/core";
import { LoginService } from '../login.service';
import{LoginData} from '../models/LoginData.interface';
import { RegisterData } from '../models/RegisterData.interface';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor(private loginServ:LoginService,
  private router:Router) { }

  @Input() initialData:LoginData;
  @Output() loginClicked = new EventEmitter<LoginData>();
  ngOnInit(): void {
  }
  onSubmit(f:NgForm){
    let data:RegisterData = f.value as RegisterData;
    this.loginServ.registerAccount(data).then((suceeded)=>{
      if(suceeded){
        alert("Login Success");
        console.dir(data);
        this.router.navigate(["main-page-component"]);
      }else{
        alert("Error while registering account");
      }
    })
    //this.submit.emit(returnData);
    /*
    if(!this.loginServ.registerAccount(data)){
      alert("Error while registering account");
    }
    if(this.loginServ.validateCredentials(data)){//login sucessfull
      alert("Login Success");
      console.dir(data);
      this.router.navigate(["main-page-component"]);
  }else{

  }
*/
}
onLoginClicked(f:NgForm){
    let data:RegisterData = f.value as RegisterData;
    let convertedData:LoginData = {email:data.email,password:data.password};
    this.loginClicked.emit(convertedData);
  }

}
