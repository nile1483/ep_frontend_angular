import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'section-features',
    templateUrl: './section-features.component.html',
    styleUrls: ['./section-features.component.css'],
    standalone: false
})
export class SectionFeaturesComponent implements OnInit {

  @Input() pageBlock: any;

  constructor() { }

  ngOnInit(): void {
    if ('content' in this.pageBlock) {
      let pageBlock: any = [];

      this.pageBlock.content.forEach((element: any) => {
        pageBlock[element.type] = element[element.type];
      });

      this.pageBlock = pageBlock;

    }
  }

}
