import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'section-card-with-image',
  templateUrl: './section-card-with-image.component.html',
  styleUrls: ['./section-card-with-image.component.css']
})
export class SectionCardWithImageComponent implements OnInit {

  @Input() pageBlock: any;

  constructor() { }

  ngOnInit(): void {

    

    if ('content' in this.pageBlock) {
      let tempContent: any = {};
      let iconBlocks: any[] = [];
      this.pageBlock.content.forEach((element: any) => {

        if (element.type == "image_block") {
          iconBlocks.push(element.value)
        }

        tempContent[element.type] = element[element.type];

      });


      tempContent['image_block'] = iconBlocks;
      this.pageBlock = tempContent;
    }

     

  }

}
