import { Component, Input, OnInit } from '@angular/core';
import { log } from 'node:console';

@Component({
  selector: 'section-data-list',
  templateUrl: './section-data-list.component.html',
  styleUrls: ['./section-data-list.component.css']
})
export class SectionDataListComponent implements OnInit {

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