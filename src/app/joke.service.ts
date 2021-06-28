import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  constructor(private httpClient: HttpClient) { }
  //define my API Key which is used for the calls
  apiKey = '5ccbd803f0msha7e4dc3823902aap170585jsndd44c19055b1';

  

  public async getFunnyJoke(): Promise<any> {
    //do API call with current joke
    const jokeAPIcall = `https://dad-jokes.p.rapidapi.com/random/joke/?rapidapi-key=${this.apiKey}`;
    console.log('apiCall', jokeAPIcall); //log API Call output to console
    return this.httpClient.get<any>(jokeAPIcall).pipe(
      map(response => {
        console.log('jokeResponse', response); 
        const body = response.body[0];
        const y = {body};
        console.log("joke:", y)
        return y;
      }));
    }
}
