import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Visibility } from '../models/Visibility.interface';
import { NgForm } from '@angular/forms';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input() visibilityWidgets:Visibility;
  @Input() visible:boolean; 

  constructor(private settings:SettingsService) { }


  /* "weatherIsVisible":false,
    "todoIsVisible":false,
    "dadJokeIsVisible":false*/
    @Output() updateSettings = new EventEmitter<Visibility>();


  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    let visibilityData:Visibility = f.value as Visibility;
    this.convertToBoolean(visibilityData);
    console.log(f);
    console.log(visibilityData)
    this.setUserSettings(visibilityData);
    this.updateSettings.emit(visibilityData);
    this.visible = false;
  }

  setUserSettings(visibilityData:Visibility){
     this.settings.setVisibilitySettings(visibilityData).then((success) =>{
       if(success){
         console.log(success);
       }
     }, error =>
       console.log(error));
   }

 /* changeSettings(){
    this.updateSettings.emit(visibilityData);
    alert("made it");
  }*/
  convertToBoolean(visibilityData:Visibility){
    if (visibilityData.weatherIsVisible == "true"){
      visibilityData.weatherIsVisible = true;
    } else {visibilityData.weatherIsVisible = false}
    if (visibilityData.todoIsVisible == "true"){
      visibilityData.todoIsVisible = true;
    } else {visibilityData.todoIsVisible = false}
    if (visibilityData.dadJokeIsVisible == "true"){
      visibilityData.dadJokeIsVisible = true;
    } else {visibilityData.dadJokeIsVisible = false}
  }
}
