import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'dropdown-option',
    template: `
      <div [formGroup]="form">
        <div [formGroupName]="'options'" >
          <mat-form-field>
          <mat-label>{{field.name}} </mat-label> 
            <mat-select [formControlName]="field.code"  [(value)]="field.selected" >
                <mat-option *ngFor="let opt of field.values" [value]="opt.name" >{{opt.name}} </mat-option>
            </mat-select>
          </mat-form-field>
        </div> 
      </div> 
    `
}) 
export class DropDownOptionComponent {
    @Input() field:any = {};
    @Input() form!:FormGroup;

    constructor() {

    }

    get optionsForm() {
      return this.form.controls['options'] as FormGroup;
      }

    ngOnInit() {       
      this.optionsForm.controls[this.field.code].setValue(this.field.value.name);
    }
}