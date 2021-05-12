import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherElementComponent } from './weather-element/weather-element.component';

const routes: Routes = [
  {path:'login-component',component:LoginComponent},
{path:'main-page-component',component:MainPageComponent},
/*{ path: 'city/:city', component: WeatherElementComponent }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
