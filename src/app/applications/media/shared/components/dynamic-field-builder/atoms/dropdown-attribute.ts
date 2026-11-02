import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dropdown-attribute',
  template: `
      <div [formGroup]="form">
        <div [formGroupName]="'attribute'" >
        
          <mat-form-field>
          <a class="reset-attribute" (click)="resetAttribute(field)">Reset</a>
          <mat-label>{{field.name}}   </mat-label> 
            <mat-select [formControlName]="field.code"  [(value)]="field.selected" (selectionChange)="changeAttributeValue(field)">
                <mat-option *ngFor="let opt of field.values;let i=index" [value]="opt" [disabled]="field?.isOptionDisabled[i]" >{{opt}} </mat-option>
            </mat-select>
          </mat-form-field>
        </div> 
      </div> 
    `,
  styles: [
    '::ng-deep ::-webkit-scrollbar {width: 5px;} ::ng-deep ::-webkit-scrollbar-thumb { background: var(--bs-primary); }'
  ]     
})
export class DropDownAttributeComponent {
  @Input() field: any = {};
  @Input() form!: FormGroup;
  @Output() onResetAttribute = new EventEmitter();
  @Output() onChangeAttributeValue = new EventEmitter();
  constructor() {

  }

  get attributeForm() {
    return this.form.controls['attribute'] as FormGroup;
  }

  ngOnInit() {
    this.attributeForm.controls[this.field.code].setValue(this.field.defaultValue);
  }

  resetAttribute(attribute: any) {
    this.onResetAttribute.emit(attribute)
  }

  changeAttributeValue(attribute: any){
    this.onChangeAttributeValue.emit(attribute)
  }
}