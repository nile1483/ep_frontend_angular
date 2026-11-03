import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'section-description',
    templateUrl: './section-description.component.html',
    styleUrls: ['./section-description.component.css'],
    standalone: false
})
export class SectionDescriptionComponent implements OnInit {

  @Input() pageBlock:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
