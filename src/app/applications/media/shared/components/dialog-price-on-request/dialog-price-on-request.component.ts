import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-price-on-request',
    templateUrl: './dialog-price-on-request.component.html',
    styleUrls: ['./dialog-price-on-request.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DialogPriceOnRequestComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogPriceOnRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = [],
  ) { }

  ngOnInit(): void {
    
  }

  closeDialog(isSend:boolean){ 
    this.dialogRef.close(isSend);
  }
  
  
}
