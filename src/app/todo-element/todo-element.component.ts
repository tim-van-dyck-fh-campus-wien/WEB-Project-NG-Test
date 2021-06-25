import { TodoElement } from './../models/TodoElement.interface';
import { WidgetService } from './../widget.service';
import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-element',
  templateUrl: './todo-element.component.html',
  styleUrls: ['./todo-element.component.css']
})
export class TodoElementComponent implements OnChanges {

  constructor(private widgetService: WidgetService) { }
  @Input() data: TodoElement[];

  //Seperated so that Maaany api calls, for example on every change of a character at a todos name, are prohibited!
  @Output() saveTodos = new EventEmitter<TodoElement[]>();//Called when a new todo was added to the list and save clicked
  @Output() todoIsDoneChanged = new EventEmitter<TodoElement>();//Called on isDone of todo changed
  @Output() todoDeleted = new EventEmitter<TodoElement>();


  _data: TodoElement[] = [];

  saveNeeded:boolean=false;//used to indicate wether save needs to be clicked in order to save the state!


  ngOnChanges(): void {//On input property change...
    if (this.data != undefined) {
      this._data = this.data;
      console.dir("TODO DATA")
      console.dir(this._data);
    }
  }
  checkboxValueChanged(elementIndex){
    if(this._data[elementIndex]._id!=""){//Check if this is a newly created todo... => if it is, it has to be saved first!
      this.todoIsDoneChanged.emit(this._data[elementIndex]);
    }
  }
  onDeleteTodoClicked(elementIndex) {
    if(this._data[elementIndex]._id!=""){//Check if this is a newly created todo... => if it is, it has to be saved first!
      this.todoDeleted.emit(this._data[elementIndex]);
    }
    this._data.splice(elementIndex, 1);

    //  alert(elementId);

  }
  onTextInputChanged(){
    this.saveNeeded=true;
  }
  addNewTodo() {
    this.saveNeeded=true;
    this._data.push({ _id: "", name: "", isDone: false });

  }
  //Notify parent of major changes in todos (=> name change, new addition to todo...)
  saveClicked() {
      this.saveNeeded=false;
      this.saveTodos.emit(this._data);
  }
}
