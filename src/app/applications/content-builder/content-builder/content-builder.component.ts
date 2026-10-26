import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-content-builder',
    templateUrl: './content-builder.component.html',
    styleUrls: ['./content-builder.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ContentBuilderComponent implements OnInit {

  @Input() contentDetail: any;

  constructor() { }

  ngOnInit(): void {
    let tempPageBlock: any[] = [];    
    this.contentDetail?.pageBlock.forEach((pageBlock: any) => {
      if (pageBlock?.content) {
        tempPageBlock.push(pageBlock);
      }
    });

    if (tempPageBlock.length > 0) {
      this.contentDetail.pageBlock = tempPageBlock;
    }

  } 
  
}
