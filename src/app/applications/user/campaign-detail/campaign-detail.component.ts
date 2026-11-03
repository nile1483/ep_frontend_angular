import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from '@app-media-services';
import { UserService } from 'src/app/shared/services/user.service';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-campaign-detail',
    templateUrl: './campaign-detail.component.html',
    styleUrls: ['./campaign-detail.component.css'],
    standalone: false
})
export class CampaignDetailComponent implements OnInit {

  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['campaign-detail'];

  campaignData: any = false;
  campaignCurrencyTotals: any = false;
  campaignId: number = 0;
  isAuthenticated: boolean = false;
  userDataObs!: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) {

    this.isAuthenticated = this.userService.isAuthenticated;
    this.userDataObs = this.userService.userData.subscribe(data => {
      this.isAuthenticated = this.userService.isAuthenticated;
    });
  }

  ngOnInit() {
    this.setMetaData();
    this.route.params.subscribe(params => {
      this.campaignId = params['campaignId'];
      this.getCampaignDetail();
    });


  }

  getCampaignDetail() {

    let serviceData: any = [];
    serviceData['campaignId'] = this.campaignId;

    this.shoppingCartService.shoppingCartItemList(serviceData).subscribe(result => {
      if (result?.status == true) {
        this.campaignData = result?.data;
        this.campaignCurrencyTotals = result?.data?.currencyTotals;
      }

    });

  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}` + `/user/campaign`;
    this.commonService.setMetaData(metaInfo);
  }

  orderCampaign() {
    this.router.navigate(['/user/billing', this.campaignId]);
  }

  ngOnDestroy(): void {
    this.userDataObs.unsubscribe();
  }

}