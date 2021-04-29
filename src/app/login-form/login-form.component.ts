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
  constructor() {

  }
  @Input() firstName:string;
  @Output() submit = new EventEmitter<LoginData>();
  firstNameBind:string;

  ngOnInit(): void {
    this.firstNameBind=this.firstName;
  }
  onSubmit(f:NgForm){
      let returnData:LoginData = f.value as LoginData;
      this.submit.emit(returnData);
      console.dir(returnData);
      console.log(f.valid);
  }

}
