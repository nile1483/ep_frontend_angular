import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'section-card-horizontal',
    templateUrl: './section-card-horizontal.component.html',
    styleUrls: ['./section-card-horizontal.component.css'],
    standalone: false
})
export class SectionCardHorizontalComponent implements OnInit {

  @Input() pageBlock: any;

  constructor() { }

  ngOnInit(): void {
    if ('content' in this.pageBlock) {
      let tempContent: any = {};
      let titleSubtitles: any[] = [];

      this.pageBlock.content.forEach((element: any) => {

        if (element.type == "title_subtitle") {
          titleSubtitles.push(element.value)
        }

        tempContent[element.type] = element[element.type];

      });

      tempContent['title_subtitle'] = titleSubtitles;
      this.pageBlock = tempContent;
      
    }
  }

}
