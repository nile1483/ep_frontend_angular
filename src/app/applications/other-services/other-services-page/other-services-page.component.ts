import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { META_DATA } from '@app-shared-constants';
import { MetaInformation } from '@app-shared-model';
import { CommonService, UserService } from '@app-shared-services';
import { AppURL } from 'src/app/app-url';
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
import { PageService } from '../../page/page.service';

export function isPersonalEmailValidatorOtherServicesPage(control: UntypedFormControl): ValidationErrors | null {
  var emailTemp = control.value; 
  var email = (emailTemp.length > 0) ? emailTemp.toLowerCase() : emailTemp;
  var emailDomain = email.split('@').slice(1);
  var isValid = true;
  
  if (emailDomain.length > 0) {
    var emailDomainFinal = emailDomain[0].split('.');
    var forbiddenDomains  = FORBIDDEN_EMAIL_DOMAINS;
     
    isValid = forbiddenDomains.indexOf(emailDomainFinal[0]) == -1;
  } 

  return isValid ? null : { 'isPersonal': true }; 
}

@Component({
    selector: 'app-other-services-page',
    templateUrl: './other-services-page.component.html',
    styleUrls: ['./other-services-page.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class OtherServicesPageComponent implements OnInit {
  webURL: string = AppURL.webURL;
  metaData: any;
  userInquiryForm!: UntypedFormGroup;
  inquiryType !: string;
  media !: string;
  page !: string;
  url !: string;
  title !: string;
  subTitle !: string;
  pageTitle!: string;
  metaDescription!: string;
  inquirySubmit = false;
  inquiryMessage = null;
  selectedCountry:any = { "name": "India", "dialCode": "+91", "code": "IN" };
  countryList:any = [];
  countryFilteredList:any = [];
  
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private pageService: PageService,
    private commonService: CommonService

  ) {
    const routeParams = this.activeRoute.snapshot.url[0].path;
    this.url = routeParams;
    this.metaData = META_DATA[this.url]
  }

  ngOnInit(): void {

    this.setPageInfo();
    this.setMetaData();
    this.createForm(this.inquiryType, this.media);

    this.userService.getCountryCodes().subscribe(response => {
      if (response?.status) {
         this.countryList = response?.data;
         this.countryFilteredList = response?.data;
      }
      else
      {
         this.countryList = [];
         this.countryFilteredList = [];
      }
       
    });

  }

  onSearchChange(value:string){
    this.countryFilteredList =  this.countryList.filter((item:any) => (item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) || (item.dialCode.toLowerCase().indexOf(value.toLowerCase()) !== -1));
  }

  selectCountry(country :any)
  {
     this.selectedCountry = country; 
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}` + `${this.router.url}`;

    //og data           
    metaInfo.og_url = `${this.webURL}` + `${this.media}`;
    metaInfo.og_image = `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);

    //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Other', this.page);
     

  }



  private createForm(inquiryType: string, media: string) {

    this.userInquiryForm = new UntypedFormGroup({
      inquiry_type: new UntypedFormControl(inquiryType, [Validators.required]),
      media: new UntypedFormControl(media, [Validators.required]),
      name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidatorOtherServicesPage]),
      contact: new UntypedFormControl('', [Validators.required]),
      city: new UntypedFormControl('', [Validators.required]),
      company: new UntypedFormControl('', []),
      comment: new UntypedFormControl('', []),
    });

  }

  inquiryFormSubmit() {
    this.userInquiryForm.markAllAsTouched()
    if (!this.userInquiryForm.valid) {
      return;
    }

    let serviceData: any = [];
    serviceData['inquiryType'] = this.inquiryType; 
    let formData = this.userInquiryForm.value;
    formData.country =  this.selectedCountry;
    serviceData['formData'] = formData;

    this.pageService.inquiryOtherServicesCreate(serviceData).subscribe(result => {
      if (result.status == true) {
        this.inquirySubmit = true;
        this.inquiryMessage = result.message;
        this.commonService.gtmGenerateLeadEvents(this.page, result.id);
      }
    });

    this.scrollToTitle()
  }

  scrollToTitle() {
    const element: any = document.querySelector('#title');
    element.scrollIntoView({ behavior: 'smooth' });
  }

  setPageInfo() {
    switch (this.url) {

      case 'design-solutions':
        this.inquiryType = 'designsolutions';
        this.media = 'design solutions';
        this.page = 'Design Solutions';
        this.title = 'for Design Solutions';
        this.subTitle = "Get Design solutions with competitive rates, versatile creative, actionable content, and functional, distinctive visuals which engage with your audience in the right way. Wish to know more about this? Fill the form below and we will get in touch with you!";
        this.pageTitle = 'Excellent publicity is a renowned agency for Design Solutions in India';
        this.metaDescription = 'We are the best agency in Design Solutions. Write to us at inquiry@excellentpublicity.com for designing and branding solutions to improve your brand visibility.';
        break;

      case 'interactive-meets':
        this.inquiryType = 'interactivemeets';
        this.media = 'interactive meets';
        this.page = 'Interactive Meets';
        this.title = 'for Interactive Meets';
        this.subTitle = 'Are you looking for customized activation to maximize the conversions and interaction with your audience? Schedule a meeting with us to know better and for any other queries.';
        this.pageTitle = 'Advertise with us through Interactive Meets | Excellent Publicity';
        this.metaDescription = 'Looking for Interactive Advertising? Excellent Publicity helps you to reach customers directly for cost-effective interactive meets and promotional activities.';
        break;

      default:
        this.title = '';
        this.pageTitle = 'Advertise in Excellent Publicity';
        this.metaDescription = 'Advertise in Excellent Publicity';
    }
  }
}
