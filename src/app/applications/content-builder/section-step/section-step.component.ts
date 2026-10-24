import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'section-step',
  templateUrl: './section-step.component.html',
  styleUrls: ['./section-step.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SectionStepComponent implements OnInit {

  @Input() pageBlock:any;
  
  constructor() { }

  ngOnInit(): void { 
  }

}
