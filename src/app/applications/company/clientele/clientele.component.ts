import { Component, OnInit} from '@angular/core';
import { ClienteleService } from "@app-company-services";;
import { META_DATA } from 'src/app/shared/constants/metadata';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
@Component({
    selector: 'app-clientele',
    templateUrl: './clientele.component.html',
    styleUrls: ['./clientele.component.css'],
    standalone: false
})
export class ClienteleComponent implements OnInit {
  webURL : string = AppURL.webURL;
  page : string = 'clientele';
  metaData : any = META_DATA['clientele']; 
  categoryList: any;
  clienteleList: any;
  filteredClienteleList: any[] = [];

  constructor(
    private clienteleService: ClienteleService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.setMetaData();
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? ''; 
    metaInfo.meta_description = this.metaData?.meta_description ?? ''; 
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? ''; 
    metaInfo.canonical_url = `${this.webURL}`+ `/${this.page}`; 
    //og data          
     metaInfo.og_url = `${this.webURL}`+ `/${this.page}`;       
     metaInfo.og_image = `${this.webURL}`+ '/assets/logo/excellent-logo-footer.webp'; 
 
     
    this.commonService.setMetaData(metaInfo); 
    
      //************************// 
      //   Google Tag Manager   //
     //************************//

     this.commonService.gtmPageEvents('Company','Company'); 
 }
 
  ngAfterViewInit(): void {
    this.getClienteleCategoryList();
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
    this.clienteleService.getClienteleList().subscribe(result => {
      if (result.status == true) {
        this.clienteleList = result.data;
        this.filteredClienteleList = result.data;
      }
    })
  }

  changeCategory(event : any){
    
    let selectedCategoryId = Number(event.target.value);
     if (selectedCategoryId == 0) {
      this.filteredClienteleList = this.clienteleList;
      return
     }
    this.filteredClienteleList = [];

    this.filteredClienteleList = this.clienteleList.filter(function(clientele:any) {
      return ((clientele.category).indexOf(selectedCategoryId) >= 0); 
    });
     
  }

}
