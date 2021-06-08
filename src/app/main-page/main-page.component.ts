import { Widget } from './../models/Widget.interface';
import { WidgetService } from './../widget.service';
import { Router } from '@angular/router';
import { User } from './../models/User.interface';
import { UserData } from './../models/UserData.interface';
import { LoginService } from './../login.service';
import { ShortcutGroup } from './../models/ShortcutGroup.interface';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private widgetService: WidgetService) { }

  
  widgetList:Widget[];
  userData: UserData = { firstname: "", lastname: "", email: "" };//Contains basic Userinfo
  ngOnInit(): void {
    //Get Info of logged in user
    this.loginService.getUserData().then((dat: UserData) => {
      this.userData = dat;
    }).catch((err) => {//If not able to get User Data => redirect to login page
      alert("You don't seem to be logged in!");
      this.router.navigate(['login-component']);
    })

    //Get Widget List
    this.widgetService.getListOfWidgets().then((res)=>{
      this.widgetList=res;
      console.log("WIDGET LIST");
      console.log(this.widgetList);
    })
  }
  logOutClicked(){
    this.loginService.logOut();
    this.router.navigate(['login-component']);
  }

}
