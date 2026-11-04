import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-seo-service-page-detail',
    templateUrl: './seo-service-page-detail.component.html',
    styleUrls: ['./seo-service-page-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SeoServicePageDetailComponent implements OnInit {

  type: string = '';

  constructor(
    private route: ActivatedRoute,
  ) { }
  

  ngOnInit(): void {
    this.route.params.subscribe((x) => {
      this.type = x['type'] || '';
    });
  }

}