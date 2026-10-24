import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['orderlist'];
  orderData = [];
  isAuthenticated: boolean = false;
  userDataObs!: Subscription;
  
  constructor(
        private userService: UserService,
        private commonService: CommonService
  ) {

    this.isAuthenticated = this.userService.isAuthenticated;
    this.userDataObs =  this.userService.userData.subscribe(data => {
      this.isAuthenticated = this.userService.isAuthenticated;
    });
  }

  ngOnInit() {
    this.setMetaData();
    this.getUserOrders(); 
  }


  getUserOrders() {

    this.userService.getUserOrderList().subscribe(result => {

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
    metaInfo.canonical_url = `${this.webURL}`+ `/user/order`;       
    this.commonService.setMetaData(metaInfo); 
 }

 ngOnDestroy(): void {
  this.userDataObs.unsubscribe();
}
}
