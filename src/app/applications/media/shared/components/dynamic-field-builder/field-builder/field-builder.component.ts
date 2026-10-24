import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'field-builder',
  templateUrl: './field-builder.component.html',
  styleUrls: ['./field-builder.component.css']
  
})
export class FieldBuilderComponent implements OnInit {
  @Input() field:any;
  @Input() shoppingCartForm:any;
  @Output() onResetAttribute = new EventEmitter();
  @Output() onChangeAttributeValue = new EventEmitter();
  
  get isValid() { return this.shoppingCartForm.controls[this.field.code].valid; }
  get isDirty() { return this.shoppingCartForm.controls[this.field.code].dirty; }

  constructor() {  
  }

  ngOnInit() { 
  }

  resetAttribute(attribute: any) {
    this.onResetAttribute.emit(attribute)
  }

  changeAttributeValue(attribute: any){
    this.onChangeAttributeValue.emit(attribute)
  }

}
