import { NgForm } from '@angular/forms';
import { ShortcutElement } from './../models/ShortcutElement.interface';
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import {NgbModal,NgbModalRef,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { isJSDocThisTag } from 'typescript';

@Component({
  selector: 'create-shortcut-element',
  templateUrl: './create-shortcut-elemenent.component.html',
  styleUrls: ['./create-shortcut-elemenent.component.css','../shortcut-element/shortcut-element.component.scss']
})
export class CreateShortcutElemenentComponent implements OnInit {
  shortcutDat:ShortcutElement={_id:'',name:'',url:''};
  @Input() data;
  @Output() shortcutCreated = new EventEmitter<ShortcutElement>();
  modalRef:NgbModalRef;
  constructor(private modalService:NgbModal) { }
  ngOnInit(): void {
    if(this.data!=null){
      this.shortcutDat=this.data;
    }
  }
  open(content) {
    console.log("open");
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
    }, (reason) => {//modal closed...

    });
  }
  onSubmit(form:NgForm){
    let data:ShortcutElement = form.value as ShortcutElement;
    data._id="";
    this.shortcutCreated.emit(data);//Notify Create shortcut group of shortcut creation
    if(this.modalRef!=null){
      this.modalRef.close('cancelled');
    }
  }
  
  

}
