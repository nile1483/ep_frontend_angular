import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ClienteleService } from "@app-company-services";;
import { META_DATA } from 'src/app/shared/constants/metadata';
import { AppURL } from 'src/app/app-url';
import { CommonService, LoaderService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { ClienteleParams } from 'src/app/shared/model';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
  selector: 'app-clientele',
  templateUrl: './clientele.component.html',
  styleUrls: ['./clientele.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ClienteleComponent implements OnInit {

  webURL: string = AppURL.webURL;
  page: string = 'clientele';
  metaData: any = META_DATA['clientele'];
  app_svg_icon_list = APP_SVG_ICON_LIST;

  params: any = new ClienteleParams();
  isShowViewMore: boolean = true;
  categoryList: any = [];
  clienteleList: any = [];
  filteredClienteleList: any[] = [];

  constructor(
    private clienteleService: ClienteleService,
    private commonService: CommonService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.setMetaData();
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}` + `/${this.page}`;
    //og data          
    metaInfo.og_url = `${this.webURL}` + `/${this.page}`;
    metaInfo.og_image = `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);

    //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Company', 'Clientele');
  }

  ngAfterViewInit(): void {
    this.getClienteleCategoryList();

    this.params.category = '';
    this.params.offset = 0;
    this.getClienteleList();
  }

  getClienteleCategoryList() {
    this.clienteleService.getClienteleCategoryList().subscribe(result => {
      if (result.status == true) {
        this.categoryList = result.data;
      }
    })
  }


  getClienteleList() {

    this.loaderService.open();

    this.clienteleService.getClienteleList(this.params).subscribe(result => {

      this.loaderService.close();

      if (result.status == true) {
        this.clienteleList = (this.clienteleList.length == 0) ? result.data : [...this.clienteleList, ...result.data];
        this.isShowViewMore = (result.data.length < this.params.limit) ? false : true;
      }
      else {
        this.clienteleList = (this.clienteleList.length > 0) ? this.clienteleList : [];
        this.isShowViewMore = false
      }
      this.setMetaData();
    })
  }


  changeCategory(event: any) {
    this.params.category = event.target.value;
    this.params.offset = 0; // Reset offset
    this.clienteleList = []; // Clear previous category data
    this.getClienteleList();
  }


  viewMoreClienteles() {
    this.params.offset = this.params.offset + this.params.limit;
    this.getClienteleList();
  }
}