import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'section-faq',
  templateUrl: './section-faq.component.html',
  styleUrls: ['./section-faq.component.css']
})
export class SectionFaqComponent implements OnInit {

  @Input() pageBlock: any;

  constructor() { }

  ngOnInit(): void { 
  }
}
