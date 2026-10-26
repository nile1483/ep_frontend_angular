import { Component, Input, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'section-step',
    templateUrl: './section-step.component.html',
    styleUrls: ['./section-step.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SectionStepComponent implements OnInit {

  @Input() pageBlock:any;
  
  constructor() { }

  ngOnInit(): void { 
  }

}
