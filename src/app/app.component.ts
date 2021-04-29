import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private loginService:LoginService, private router:Router){

  }
  ngOnInit(){
      if(!this.loginService.isLoggedIn()){
          this.router.navigate(['login-component']);
      }else{
        this.router.navigate(["main-page-component"]);
      }
  }

  title = 'bootsrapNGTest';
}
