import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-user-login-dialog',
    templateUrl: './user-login-dialog.component.html',
    styleUrls: ['./user-login-dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class UserLoginDialogComponent implements OnInit {

  
  constructor( @Inject(MAT_DIALOG_DATA) public data: any = []) { }

  ngOnInit(): void {
     
     
  }

}
