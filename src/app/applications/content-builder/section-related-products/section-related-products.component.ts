import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'section-related-products',
    templateUrl: './section-related-products.component.html',
    styleUrls: ['./section-related-products.component.css'],
    standalone: false
})
export class SectionRelatedProductsComponent implements OnInit {

  @Input() pageBlock: any;
  constructor() { }

  ngOnInit(): void {
    
  }

}
