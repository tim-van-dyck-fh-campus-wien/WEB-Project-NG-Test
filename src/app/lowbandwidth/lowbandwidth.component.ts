import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-lowbandwidth',
  templateUrl: './lowbandwidth.component.html',
  styleUrls: ['./lowbandwidth.component.scss']
})
export class LowbandwidthComponent implements OnInit {

  fancy:boolean;
  low :boolean;
  constructor(private myRouter:Router) { }

  ngOnInit(): void {
    this.low = false;
    this.fancy =false;
  }

  showFancyUI(){
    this.fancy = true; 
    this.bandwidthVersion();
  }

  showBasicUI(){
    this.low = true; 
    this.bandwidthVersion();
  }



  bandwidthVersion(){
    if (this.fancy == true){
      try{
      this.myRouter.navigate(["main-page-component"]);
    } catch(err){
        console.log(err);
        alert("Something went wrong. You're being redirected to the Login Page.");
        this.myRouter.navigate(["login-component"]);
    }
    } else if (this.low == true){
      try{
        this.myRouter.navigate(["low-mainpage"]);
      } catch(err){
        console.log(err);
        alert("Something went wrong. You're being redirected to the Login Page.");
        this.myRouter.navigate(["login-component"]);
      }
    } else {
      alert("Couldn't process your input. Redirecting to Login Page.");
      this.myRouter.navigate(["login-component"]);
    }
  }

}
