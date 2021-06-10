import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  //added for low Bandwidth
  @Input() lowBandwidth:boolean;

  constructor() { }
  searchPhrase:string;
  ngOnInit(): void {
  }
  searchTerm(){
    window.open("https://www.google.com/search?q="+this.searchPhrase);
  }
}
