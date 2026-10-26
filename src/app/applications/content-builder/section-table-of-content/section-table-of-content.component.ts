import { Component, Input, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'section-table-of-content',
    templateUrl: './section-table-of-content.component.html',
    styleUrls: ['./section-table-of-content.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SectionTableOfContentComponent implements OnInit {

  @Input() pageBlock:any;

  constructor() { }

  ngOnInit(): void {

    if ('content' in this.pageBlock) {
      let tempContent: any[] = []; 
      let index = 0;
      this.pageBlock.content.forEach((element: any) => { 
       
        if (element['value']['type'] == "link") {
          index = tempContent.length;
          tempContent[index] = element['value']; 
        } 
        else 
        { 
          if ( ! ('sublink' in tempContent[index])) {
            tempContent[index]['sublink'] = [];
          }
          tempContent[index]['sublink'].push(element['value']);
        }
 
      });

      this.pageBlock.content  = tempContent

    }
    
  }

}
