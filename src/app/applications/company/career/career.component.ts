import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CareerService } from "@app-company-services";
import { AppURL } from 'src/app/app-url';
import { META_DATA } from 'src/app/shared/constants/metadata';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

export class CareerFilters {
  title: string;
  location: string;

  constructor(options: {
    title?: string;
    location?: string;
   
  } = {}) {
    this.title = options.title || '';
    this.location = options.location || '';
  }
}


@Component({
    selector: 'app-career',
    templateUrl: './career.component.html',
    styleUrls: ['./career.component.css'],
    standalone: false
})
export class CareerComponent implements OnInit {

  app_svg_icon_list = APP_SVG_ICON_LIST;
  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['career'];
  currentOpenings: any[] = [];
  page: string = 'career'
  inquirySubmit = false;
  inquiryMessage = null;
  careerFaqList: any[] = [];


  filterTitleList: any[] = [];
  filterLocationList: any[] = [];

  locationSearchControl = new UntypedFormControl();
  titleSearchControl = new UntypedFormControl();
  careerFilters : any = new CareerFilters();
  isDataLoaded = false;

  @ViewChild('accordionButtonLocationRef') accordionButtonLocationRef: ElementRef | undefined;
  @ViewChild('accordionButtonJobRef') accordionButtonJobRef: ElementRef | undefined;

  constructor(
    private careerService: CareerService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.getMasterList();
    this.setMetaData();
    this.getFaqDataList();
    
  }


  ngAfterViewInit(): void {
    this.getCareerList();
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

  getCareerList() {
    this.currentOpenings = [];
    this.careerService.getCurrentOpenings(this.careerFilters).subscribe(result => {
      if (result.status == true) {
        this.currentOpenings = result.data;
        this.isDataLoaded = false;
      }
      else 
      {
        this.isDataLoaded = true;
        this.currentOpenings = (this.currentOpenings.length > 0) ? this.currentOpenings : [];
      } 
    })
  }

  getMasterList() {
    this.careerService.getCurrentMaster().subscribe(result => {
      if (result.status == true) {
        this.filterTitleList = result.data.title;
        this.filterLocationList = result.data.location;
      }
    })
  }


  selectTitle(title: any){
    this.careerFilters.title = title;
    if (this.accordionButtonJobRef) {
      this.accordionButtonJobRef.nativeElement.click();
    }
  }

  selectLocation(location: any){
    this.careerFilters.location = location;
    if (this.accordionButtonLocationRef) {
      this.accordionButtonLocationRef.nativeElement.click();
    }
  }

  searchFilters() {
    this.getCareerList();
  }

  getFaqDataList() {
    this.careerFaqList = [
      {
        question: 'What will my first day involve?',
        answer: 'These questions seem small but they impact how your new hires feel on their very first day - which sets the tone for the rest of their career with you.',
      },
      {
        question: 'Can I work from home occasionally?',
        answer: '',
      },
      {
        question: "What are the company's goals?",
        answer: '',
      },
      {
        question: 'Do we celebrate festivals?',
        answer: '',
      },
      {
        question: 'How do I get promoted?',
        answer: '',
      }
    ];
  }




}
