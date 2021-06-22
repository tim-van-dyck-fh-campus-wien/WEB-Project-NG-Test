import { LogoutBtnComponent } from './logout-btn/logout-btn.component';
import { WidgetService } from './widget.service';
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
import { JokeService } from './joke.service';
import { JokeElementComponent } from './joke-element/joke-element.component';
import { CreateShortcutGroupComponent } from './create-shortcut-group/create-shortcut-group.component';
import { CreateShortcutElemenentComponent } from './create-shortcut-elemenent/create-shortcut-elemenent.component';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { LowbandwidthComponent } from './lowbandwidth/lowbandwidth.component';
import { LowMainpageComponent } from './low-mainpage/low-mainpage.component';
import { TodoElementComponent } from './todo-element/todo-element.component';


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
    JokeElementComponent,
    CreateShortcutGroupComponent,
    CreateShortcutElemenentComponent,
    AddWidgetComponent,
    LowbandwidthComponent,
    LowMainpageComponent,
    TodoElementComponent
    ,LogoutBtnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [LoginService,LogoRetrievalService, WeatherService,WidgetService,JokeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
