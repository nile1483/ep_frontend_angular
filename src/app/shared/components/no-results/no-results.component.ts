import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-no-results',
    templateUrl: './no-results.component.html',
    styleUrls: ['./no-results.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NoResultsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
