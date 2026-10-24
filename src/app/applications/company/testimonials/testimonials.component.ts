import { Component, OnInit } from '@angular/core';
import { META_DATA } from 'src/app/shared/constants/metadata';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { AppURL } from 'src/app/app-url';
import { TestimonialsService} from "@app-company-services";
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  webURL : string = AppURL.webURL;
  page : string = 'testimonials';
  metaData : any = META_DATA['testimonials']; 
  testimonialsList: any;
  constructor(
    private commonService: CommonService,
    private testimonialsService: TestimonialsService,
  ) { }

 
  ngOnInit(): void {

    // set meta data start
    this.setMetaData();
    this.getTestimonialsData();
    // set meta data end

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

    this.commonService.gtmPageEvents('Company', 'Company'); 
 }

 getTestimonialsData(){
  this.testimonialsService.getTestimonialsList().subscribe((result:any) => {

    if (result.status == true) {
      this.testimonialsList =  result.data;
    }
  })
 }
}
