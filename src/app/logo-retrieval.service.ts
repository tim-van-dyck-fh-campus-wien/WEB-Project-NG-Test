import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoRetrievalService {

  constructor(private http:HttpClient) { }
  public getLogoFromUrl(url:string):string{
    /*let params = new HttpParams().set('url',"www.google.at");
   
    this.http.get("https://besticon-demo.herokuapp.com/allicons.json",{params:params}).subscribe((data) => {
      console.dir(data);
    })*/

    return "https://besticon-demo.herokuapp.com/icon?url="+url+"&size=80..120..200";
  }
}
