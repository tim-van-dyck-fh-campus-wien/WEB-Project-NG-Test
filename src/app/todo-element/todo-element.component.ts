import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-element',
  templateUrl: './todo-element.component.html',
  styleUrls: ['./todo-element.component.css']
})
export class TodoElementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById("last-row")?.addEventListener("click", this.addNewTodoRow);
    document.getElementById("delete2")?.addEventListener("click", this.deleteRow2);
    document.getElementById("delete3")?.addEventListener("click", this.deleteRow3);
    document.getElementById("delete4")?.addEventListener("click", this.deleteRow4);
    document.getElementById("delete5")?.addEventListener("click", this.deleteRow5);
    
    let row2 = document.getElementById("2");
    let row3 = document.getElementById("3");
    let row4 = document.getElementById("4");
    let row5 = document.getElementById("5");

    if(row2 != null){
        row2.style.visibility = "hidden";
    }
    if(row3 != null){
      row3.style.visibility = "hidden";
    }
    if(row4 != null){
      row4.style.visibility = "hidden";
    }
    if(row5 != null){
      row5.style.visibility = "hidden";
    }
  }

  addNewTodoRow(){
    let row2 = document.getElementById("2");
    let row3 = document.getElementById("3");
    let row4 = document.getElementById("4");
    let row5 = document.getElementById("5");

    if(row2 != null && row2.style.visibility == "hidden"){
      row2.style.visibility = "visible";
    }
    else if(row3 != null && row3.style.visibility == "hidden"){
      row3.style.visibility = "visible";
    }
    else if(row4 != null && row4.style.visibility == "hidden"){
      row4.style.visibility = "visible";
      }
    else if(row5 != null && row5.style.visibility == "hidden"){
      row5.style.visibility = "visible";
    }
  }

  deleteRow2(){
    let row2 = document.getElementById("2");
    if(row2 != null){
      row2.style.visibility = "hidden";
    }
  }
  deleteRow3(){
    let row3 = document.getElementById("3");
    if(row3 != null){
      row3.style.visibility = "hidden";
    }
  }
  deleteRow4(){
    let row4 = document.getElementById("4");
    if(row4 != null){
      row4.style.visibility = "hidden";
    }
  }
  deleteRow5(){
    let row5 = document.getElementById("5");
    if(row5 != null){
      row5.style.visibility = "hidden";
    }
  }

}
