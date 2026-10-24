import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '@app-media-services';
import { UserService } from 'src/app/shared/services/user.service';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['campaignlist'];
  campaignData: any = [];
  isAuthenticated : boolean = false;
  userDataObs!: Subscription;
  selectedCurrency: any;

  constructor(
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private commonService: CommonService
    ) {
    this.isAuthenticated = this.userService.isAuthenticated;
    this.userDataObs =  this.userService.userData.subscribe(data => {
      this.isAuthenticated = this.userService.isAuthenticated;
    });
  }

  ngOnInit(): void {
    //Currency
    this.selectedCurrency = this.commonService.getSelectedCurrency();
    this.commonService.getCurrency().subscribe(currency => {
      this.selectedCurrency = this.commonService.getSelectedCurrency();
    });
    
    this.setMetaData();
    this.getCampaignList();
  }


  getCampaignList() {

    this.shoppingCartService.shoppingCartList().subscribe(result => {
      if(result.status == true) {
        this.campaignData = result.data; 
      }
    });

  }
  
  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? ''; 
    metaInfo.meta_description = this.metaData?.meta_description ?? ''; 
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? ''; 
    metaInfo.canonical_url = `${this.webURL}`+ `/user/campaign`;       
    this.commonService.setMetaData(metaInfo); 
 }

 ngOnDestroy(): void {
  this.userDataObs.unsubscribe();
}

}
