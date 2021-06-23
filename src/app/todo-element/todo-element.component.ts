import { TodoElement } from './../models/TodoElement.interface';
import { WidgetService } from './../widget.service';
import { TodoGroup } from './../models/TodoGroup.interface';
import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-element',
  templateUrl: './todo-element.component.html',
  styleUrls: ['./todo-element.component.css']
})
export class TodoElementComponent implements OnChanges {

  constructor(private widgetService: WidgetService) { }
  @Input() data: TodoElement[];
  @Output() saveTodos = new EventEmitter<TodoElement[]>();
  _data: TodoElement[] = [];


  ngOnChanges(): void {//On input property change...
    if (this.data != undefined) {
      this._data = this.data;
      console.dir(this._data);
    }
  }
  onDeleteTodoClicked(elementIndex) {
    alert(elementIndex);
    this._data.splice(elementIndex, 1);
    //  alert(elementId);

  }
  addNewTodo() {
    this._data.push({ _id: "", name: "", isDone: false });

  }
  //Notify parent of major changes in todos (=> name change, new addition to todo...)
  saveClicked() {
      this.saveTodos.emit(this._data);
  }
}
