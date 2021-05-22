import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoRetrievalService {

  constructor(private http:HttpClient) { }
  public getLogoFromUrl(url:string):string{
    return "https://besticon-demo.herokuapp.com/icon?url="+url+"&size=80..120..200";
  }
}
