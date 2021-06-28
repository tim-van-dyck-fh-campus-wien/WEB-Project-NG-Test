import { Component, OnInit } from '@angular/core';
import { JokeService } from '../joke.service';

@Component({
  selector: 'app-joke-element',
  templateUrl: './joke-element.component.html',
  styleUrls: ['./joke-element.component.scss']
})
export class JokeElementComponent implements OnInit {

  constructor(public jokeService: JokeService) { }

  ngOnInit(): void {
   // this.dummyForDeveloping();
    this.makeJokeAPICall();
  }

  jokeSetup:string;
  jokePunchline:string;
  answer:boolean;
  async makeJokeAPICall(){
    let jokeData = (await this.jokeService.getFunnyJoke()).subscribe
    (y => {
     this.jokeSetup = y.body.setup;
     this.jokePunchline = y.body.punchline;
     this.answer = false;
    },
      error => {
        console.log('error occured', error);
      });
  }
  
  dummyForDeveloping(){
    this.jokeSetup="What kind of tree fits in your hand?";
    this.jokePunchline="A palm tree!"
    this.answer = false;
  }


  showPunchline(){
    this.answer = true;
  }

  nextJoke(){
    this.makeJokeAPICall(); 
    this.answer = false;
    //this.dummyJoke();
  }

  dummyJoke(){
    this.jokeSetup ="What do you get from a pampered cow?";
    this.jokePunchline ="Spoiled milk."
  }
}
