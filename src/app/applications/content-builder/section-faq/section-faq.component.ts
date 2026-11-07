import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'section-faq',
    templateUrl: './section-faq.component.html',
    styleUrls: ['./section-faq.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SectionFaqComponent implements OnInit {

  @Input() pageBlock: any;

  constructor() { }

  ngOnInit(): void { 
  }
}
