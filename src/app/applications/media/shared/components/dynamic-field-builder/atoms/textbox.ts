import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
    selector: 'textbox',
    template: `
      <div [formGroup]="form">
        <div [formGroupName]="'attribute'" >
        <mat-form-field >
            <mat-label>{{field.label}} <strong class="text-danger" *ngIf="field.required">*</strong></mat-label>
            <input matInput [attr.type]="field.type" [name]="field.name" [formControlName]="field.name" [placeholder]="field.placeholder" >
            <mat-error *ngIf="isRequired"> This is required</mat-error>
        </mat-form-field>
        </div>
      </div>
      `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class TextBoxComponent {
    @Input() field:any = {};
    @Input() form!:FormGroup;
    
    get isRequired() { return this.attributeForm.controls[this.field.name].hasError('required'); }
    get isValid() { return this.attributeForm.controls[this.field.name].valid; }
    get isDirty() { return this.attributeForm.controls[this.field.name].dirty; }
    
    get attributeForm() {
    return this.form.controls['attribute'] as FormGroup;
    }

    constructor() {}

    ngOnInit() {
    
    }
}