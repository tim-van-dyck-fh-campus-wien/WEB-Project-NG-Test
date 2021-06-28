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
  @Output() updateSettings = new EventEmitter<Visibility>();

  constructor(private settings:SettingsService) { }
  
  valuesBoolean: boolean;

  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    let visibilityData:Visibility = f.value as Visibility;
    this.convertToBoolean(visibilityData);
  //  console.log(f);
    //console.log(visibilityData)
    if (this.valuesBoolean == true){
      this.setUserSettings(visibilityData);
      this.updateSettings.emit(visibilityData);
      this.visible = false;
    }
  }

  setUserSettings(visibilityData:Visibility){
     this.settings.setVisibilitySettings(visibilityData).then((success) =>{
       if(success){
       //  console.log(success);
       }
     }, error =>
       console.log(error));
   }

 convertToBoolean(visibilityData:Visibility){
    this.valuesBoolean = true;
    if (visibilityData.weatherIsVisible == "true"){
      visibilityData.weatherIsVisible = true;
    } else if (visibilityData.weatherIsVisible == "false") {
      visibilityData.weatherIsVisible = false;
    }
    if (visibilityData.todoIsVisible == "true"){
      visibilityData.todoIsVisible = true;
    } else if (visibilityData.todoIsVisible == "false") {
      visibilityData.todoIsVisible = false;
    }
    if (visibilityData.dadJokeIsVisible == "true"){
      visibilityData.dadJokeIsVisible = true;
    } else if (visibilityData.dadJokeIsVisible == "false") {
      visibilityData.dadJokeIsVisible = false
    } 
    else { 
      alert("Please choose hide or show for each widget.");
      this.valuesBoolean = false;
    }
  }
}
