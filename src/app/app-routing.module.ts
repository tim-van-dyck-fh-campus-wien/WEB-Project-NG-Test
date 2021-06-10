import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LowbandwidthComponent } from './lowbandwidth/lowbandwidth.component';
import { LowMainpageComponent } from './low-mainpage/low-mainpage.component';


const routes: Routes = [
  {path:'login-component',component:LoginComponent},
{path:'main-page-component',component:MainPageComponent},
{path:'lowbandwidth', component:LowbandwidthComponent},
{path:'low-mainpage', component:LowMainpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
