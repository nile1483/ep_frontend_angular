import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'section-related-products',
    templateUrl: './section-related-products.component.html',
    styleUrls: ['./section-related-products.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SectionRelatedProductsComponent implements OnInit {

  @Input() pageBlock: any;
  constructor() { }

  ngOnInit(): void {
    
  }

}
