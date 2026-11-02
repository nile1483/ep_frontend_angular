import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
    selector: 'number',
    template: `
      <div [formGroup]="form">
        <div [formGroupName]="'priceUnit'" >
        <mat-form-field >
            <mat-label>{{field.name}} <strong class="text-danger" *ngIf="field.required">*</strong></mat-label>
            <input matInput [attr.type]="field.type" [name]="field.code" [formControlName]="field.code" [step]="field.step" [placeholder]="field.placeholder" >
            <mat-error *ngIf="isRequired"> This is required</mat-error>
            <mat-error *ngIf="hasMinError"> Minimum {{minValue}}</mat-error>
            <mat-error *ngIf="hasMaxError"> Maximum {{maxValue}}</mat-error>
        </mat-form-field>
        </div>
      </div>
      `
})
export class NumberComponent {
    @Input() field:any = {};
    @Input() form!:FormGroup;
    
    get isRequired() { return this.priceUnitForm.controls[this.field.code].hasError('required'); }
    get isValid() { return this.priceUnitForm.controls[this.field.code].valid; }
    get hasMinError() { return this.priceUnitForm.controls[this.field.code].errors?.['min']; }
    get minValue() { return this.priceUnitForm.controls[this.field.code].errors?.['min']?.['min']; }
    get hasMaxError() { return this.priceUnitForm.controls[this.field.code].errors?.['max']; }
    get maxValue() { return this.priceUnitForm.controls[this.field.code].errors?.['max']?.['max']; }
    
    get priceUnitForm() {
    return this.form.controls['priceUnit'] as FormGroup;
    }

    constructor() {}

    ngOnInit() {
    }
}