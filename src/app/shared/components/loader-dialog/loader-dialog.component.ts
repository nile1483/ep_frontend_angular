import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-loader-dialog',
    templateUrl: './loader-dialog.component.html',
    styleUrls: ['./loader-dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LoaderDialogComponent implements OnInit { 

  ngOnInit() { }

}
