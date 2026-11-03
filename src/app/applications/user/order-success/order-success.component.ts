import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-order-success',
    templateUrl: './order-success.component.html',
    styleUrls: ['./order-success.component.css'],
    standalone: false
})
export class OrderSuccessComponent implements OnInit {

  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['order-success'];
  app_svg_icon_list = APP_SVG_ICON_LIST;

  token: string = '';
  orderData: any;

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.setMetaData();
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token != undefined) {
        this.getOrderData(this.token);
      }
    });
  }

  getOrderData(token: string) {
    this.userService.getOrderInfo(token).subscribe(result => {
      if (result.status == true) {
        this.orderData = result.data;
      }
    });
  }
  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}` + `/user/order/success`;
    this.commonService.setMetaData(metaInfo);
  }
}