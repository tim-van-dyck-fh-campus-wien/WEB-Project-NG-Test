import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ShortcutGroup } from '../models/ShortcutGroup.interface';
import { UserData } from '../models/UserData.interface';
import { Widget } from '../models/Widget.interface';
import { WidgetService } from '../widget.service';

@Component({
  selector: 'app-low-mainpage',
  templateUrl: './low-mainpage.component.html',
  styleUrls: ['./low-mainpage.component.scss']
})
export class LowMainpageComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router,private widgetService: WidgetService) { }

  userData: UserData = { firstname: "", lastname: "", email: "" };

  widgetList:Widget[];
  isCreatingShortcut:boolean=false;

  lowBandwidthSearchbar = true;

  ngOnInit(): void {
   // alert("This is a low bandwidth version. If you want full functionality, please choose no after log in.");
    this.loginService.getUserData().then((dat: UserData) => {
      this.userData = dat;
      this.lowBandwidthSearchbar = true;
    }).catch((err) => {
      alert("You don't seem to be logged in!");
      this.router.navigate(['login-component']);
    })
      //Get Widget List
      this.getWidgetList();
    
  }

  logOutClicked(){
    this.loginService.logOut();
    this.router.navigate(['login-component']);
  }

    
    getWidgetList(){
      this.widgetService.getListOfWidgets().then((res)=>{
        this.widgetList=res;
        console.log("WIDGET LIST");
        console.log(this.widgetList);
      })
    }
   
  }