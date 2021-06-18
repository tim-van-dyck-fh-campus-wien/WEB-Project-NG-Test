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
  
  isCreatingShortcut:boolean=false;
  ngOnInit(): void {
    //Get Info of logged in user
    this.loginService.getUserData().then((dat: UserData) => {
      this.userData = dat;
    }).catch((err) => {//If not able to get User Data => redirect to login page
      alert("You don't seem to be logged in!");
      this.router.navigate(['login-component']);
    })
  
    //Get Widget List
    this.getWidgetList();
  }
  getWidgetList(){
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
  //Called when clicking the "plus" icon to add a widget
  createWidget(data:{type:string}){
      if(data.type=="ShortcutGroup"){
        this.isCreatingShortcut=true;//Show the widget for creating a shortcut group
      }
  }
  onShortcutGroupCreated(shortcutGroup:ShortcutGroup){
    if(shortcutGroup==null){//if null => creation was cancelled
      this.isCreatingShortcut=false;
    }else{
      this.widgetService.createShortcutGroup(shortcutGroup).then((sucess)=>{
        if(sucess){
          this.getWidgetList();
          this.isCreatingShortcut=false;
        }
      })
    }
    }

    shortcutGroupID:string;
    //use event!!!
    deleteThisShortcutWidget(shortcutId:String){
     // alert("somethings happening");
      //this.shortcutGroupID = "_id: "+shortcutGroup._id;
   //   console.log(this.shortcutGroupID)
      this.widgetService.deleteWidget(shortcutId).then((success) =>{
        if(success){
          this.getWidgetList();
          console.log(this.widgetList);
        }
      }, error =>
        console.log(error));
      this.widgetService.getListOfWidgets().then((res)=>{
        this.widgetList=res;
      })
    
    }

    //hide a widget - deleted for User while in this session! 
    //TODO - hide shortCutGroup based on title 
    visibleShortcut:boolean = true;
    hideShortcutWidget(){
      this.visibleShortcut = this.visibleShortcut?false:true; 
    }

    visibleWeather:boolean = true;
    hideWeatherWidget(){
      this.visibleWeather = this.visibleWeather?false:true; 
    }

    
    visibleJoke:boolean = true;
    hideJokeWidget(){
      this.visibleJoke = this.visibleJoke?false:true; 
    }


    visibleAddWidget:boolean = true;
    hideAddWidget(){
      this.visibleAddWidget = this.visibleAddWidget?false:true; 
    }

    visibleToDoWidget:boolean = true;
    hideToDoWidget(){
      this.visibleToDoWidget = this.visibleToDoWidget?false:true; 
    }
}
