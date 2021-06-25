import { TodoElement } from './../models/TodoElement.interface';
import { TodoGroup } from './../models/TodoGroup.interface';
import { Widget } from './../models/Widget.interface';
import { WidgetService } from './../widget.service';
import { Router } from '@angular/router';
import { User } from './../models/User.interface';
import { UserData } from './../models/UserData.interface';
import { LoginService } from './../login.service';
import { ShortcutGroup } from './../models/ShortcutGroup.interface';
import { Component, OnInit } from '@angular/core';
import { Visibility } from '../models/Visibility.interface';
import { SettingsService } from '../settings.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private widgetService: WidgetService,
    private settings:SettingsService) { }

  
  widgetList:Widget[];
  userData: UserData = { firstname: "", lastname: "", email: "" };//Contains basic Userinfo
  todoList:TodoElement[];
  visibleWidgets:Visibility;

  //these widgets can be customized 
  weatherVisible:boolean=false;
  todoVisible:boolean=false;
  jokeVisible:boolean=false;

  isCreatingShortcut:boolean=false;
  ngOnInit(): void {
    //Get Info of logged in user
    this.loginService.getUserData().then((dat: UserData) => {
      this.userData = dat;
    }).catch((err) => {//If not able to get User Data => redirect to login page
      alert("You don't seem to be logged in!");
      this.router.navigate(['login-component']);
    })
    this.getVisibleWidgetsSettings();
  
    //Get Widget List
    this.getWidgetList();
    if (this.todoVisible == true){this.getTodos();}
  
  }

  //show the settings form on main page
  visibilitySettings:boolean = false;
  showSettingsForm(){
    if(this.visibilitySettings == true){
      this.visibilitySettings = false;
    } else {
    this.visibilitySettings = true;}
  }

  //update settings
  updateVisibility(visibility:Visibility){
    if(visibility.weatherIsVisible == true){
        this.weatherVisible = true;
    } else {this.weatherVisible = false;}
    if (visibility.todoIsVisible == true){
        this.todoVisible = true;
    } else{this.todoVisible=false}
    if (visibility.dadJokeIsVisible == true){
        this.jokeVisible = true;
    } else {this.jokeVisible = false}
  }

  //get current user settings
  getVisibleWidgetsSettings(){
    this.settings.getCurrentUserSettings().then((res)=>{
      this.visibleWidgets=res;
      console.log(this.visibleWidgets);
      if(this.visibleWidgets.weatherIsVisible == true){
        this.weatherVisible = true;
    } else {this.weatherVisible = false;}
    if (this.visibleWidgets.todoIsVisible == true){
        this.todoVisible = true;
    } else{this.todoVisible=false}
    if (this.visibleWidgets.dadJokeIsVisible == true){
        this.jokeVisible = true;
    } else {this.jokeVisible = false}
    })
  }

  getWidgetList(){
    this.widgetService.getListOfWidgets().then((res)=>{
      this.widgetList=res;
      console.log("WIDGET LIST");
      console.log(this.widgetList);
    })
  }
  getTodos(){
    this.widgetService.getListOfTodos().then((res)=>{
      this.todoList = res;
      console.log("TODO GROUP");
      console.dir(this.todoList);
    })
  }
  onSaveTodos(todoList:TodoElement[]){
      this.widgetService.updateListOfTodos(todoList).then((res)=>{
        this.todoList=res;
      }).catch(err=>{
        console.log(err);
      })
  }
  onTodoIsDoneChanged(todo:TodoElement){
    this.widgetService.changeIsDoneOfTodo(todo).catch(err=>{
      console.log(err);
    })
  }
  onTodoDeleted(todo:TodoElement){
    this.widgetService.deleteTodo(todo).catch(err=>{console.log(err)});
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

    //delete shortcuts completely
    shortcutGroupID:string;
    deleteThisShortcutWidget(shortcutId:String){
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
}
