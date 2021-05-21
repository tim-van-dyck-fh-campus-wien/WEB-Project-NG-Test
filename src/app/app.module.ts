import { ShortcutGroupService } from './shortcut-group.service';
import { LogoRetrievalService } from './logo-retrieval.service';
import { WeatherElementComponent } from './weather-element/weather-element.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { LoginService } from './login.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ActivitiesElementComponent } from './activities-element/activities-element.component';
import { ShortcutElementComponent } from './shortcut-element/shortcut-element.component';
import { ShortcutGroupComponent } from './shortcut-group/shortcut-group.component';
import { WeatherService } from './weather.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    LoginFormComponent,
    SearchbarComponent,
    WeatherElementComponent,
    RegisterFormComponent,
    ActivitiesElementComponent,
    ShortcutElementComponent,
    ShortcutGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [LoginService,LogoRetrievalService,ShortcutGroupService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
