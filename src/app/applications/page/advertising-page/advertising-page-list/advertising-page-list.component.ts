import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AdvertisingPageService } from '../advertising-page.service';
import { UserService } from '@app-shared-services';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';

@Component({
    selector: 'app-advertising-page-list',
    templateUrl: './advertising-page-list.component.html',
    styleUrls: ['./advertising-page-list.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AdvertisingPageListComponent implements OnInit {

  webURL : string = AppURL.webURL;
  param: any = {};
  advertisingPageList: any = [];
  lpMedia: string = "";
  isDataLoaded: boolean = false;

  productdata: any = [];
  dataList: any[] = [];
  filterData: any[] = [];
  contentList: any[] = [];

  constructor(   
    private advertisingPageService: AdvertisingPageService,
    private userService: UserService,
    private router: Router,
    private commonService: CommonService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllAdvertisingPage();
  }

  getAllAdvertisingPage() {
    this.advertisingPageService.advertisingPageList().subscribe(result => {
      this.isDataLoaded = true;
      this.advertisingPageList = result?.data ?? [];
    });
  }
  

}
