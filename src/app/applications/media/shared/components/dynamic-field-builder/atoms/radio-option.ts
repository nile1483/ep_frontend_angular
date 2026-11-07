import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'radio-option',
    template: `
      <div [formGroup]="form"> 
        <div [formGroupName]="'options'" >       
        <mat-label>{{field.name}}</mat-label><br> 
          <mat-radio-group [formControlName]="field.code">
            <mat-radio-button class="ms-2" [value]="opt.name" color="primary" *ngFor="let opt of field.values" > 
            {{opt.name}} 
            </mat-radio-button>
          </mat-radio-group>
          <mat-error *ngIf="isRequired"> This is required </mat-error>
        </div> 
      </div> 
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RadioOptionComponent {
  @Input() field: any = {};
  @Input() form!: FormGroup;

  selected: any = '';

  get isRequired() { return this.optionsForm.controls[this.field.code].hasError('required'); }

  get optionsForm() {
    return this.form.controls['options'] as FormGroup;
  }
  constructor() { }

  ngOnInit() {
    this.setDefault();
  }

  setDefault() {

    let selected = this.field.values.find((e:any) => e.isdefault == true);
    
    if (selected != undefined) {
      this.selected = selected.key;
    }
    
    let index = this.field.values.findIndex((o:any) => o.name === this.field.value.name);

    if (index > (-1))
    {
      this.selected = (index > 0)? this.field.values[index] : this.field.values[0];      
    }   
     
    this.optionsForm.controls[this.field.code].setValue(this.selected.name);
  }
}