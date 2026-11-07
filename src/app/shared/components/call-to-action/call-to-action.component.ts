import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
 

@Component({
    selector: 'app-call-to-action',
    templateUrl: './call-to-action.component.html',
    styleUrls: ['./call-to-action.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class CallToActionComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }
 
  goToContact() {
    this.router.navigate(['/contact'], { queryParams: {q:'quickInquiry'}});
  }

}
