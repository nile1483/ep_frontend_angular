import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderDialogComponent } from '../components/loader-dialog/loader-dialog.component';

@Injectable()
export class LoaderService {
  dialogRef: MatDialogRef<LoaderDialogComponent> | undefined;
  constructor(private dialog: MatDialog) { }

  public open( ): Observable<boolean> {
    //  this.title= 'Please wait',
    this.dialogRef = this.dialog.open(LoaderDialogComponent, { disableClose: true, panelClass: 'my-dialog-loader' });
    this.dialogRef.updateSize('200px'); 
    return this.dialogRef.afterClosed();
  }

  public close( ) {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

  }
}
