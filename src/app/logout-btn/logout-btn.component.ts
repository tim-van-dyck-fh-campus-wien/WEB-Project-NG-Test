import { Component, OnInit } from '@angular/core';
import { LoginService } from './../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout-btn',
  templateUrl: './logout-btn.component.html',
  styleUrls: ['./logout-btn.component.css']
})
export class LogoutBtnComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router,) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.loginService.logOut();
    this.router.navigate(['login-component']);
  }
}
