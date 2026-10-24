import { Component, ElementRef, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { META_DATA } from '@app-shared-constants';
import { MetaInformation } from '@app-shared-model';
import { CommonService, UserService } from '@app-shared-services';
import { AppURL } from 'src/app/app-url';
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
import { C2A_TITLE_DATA } from '@app-shared-constants';
import { PageService } from '../../page.service';

export function isPersonalEmailValidatoChannelPage(control: UntypedFormControl): ValidationErrors | null {
  var emailTemp = control.value;
  var email = (emailTemp.length > 0) ? emailTemp.toLowerCase() : emailTemp;
  var emailDomain = email.split('@').slice(1);
  var isValid = true;

  if (emailDomain.length > 0) {
    var emailDomainFinal = emailDomain[0].split('.');
    var forbiddenDomains = FORBIDDEN_EMAIL_DOMAINS;

    isValid = forbiddenDomains.indexOf(emailDomainFinal[0]) == -1;
  }

  return isValid ? null : { 'isPersonal': true };
}

@Component({
  selector: 'app-channel-partner-page',
  templateUrl: './channel-partner-page.component.html',
  styleUrls: ['./channel-partner-page.component.css']
})
export class ChannelPartnerPageComponent implements OnInit {

  webURL: string = AppURL.webURL;
  media: string = 'agencypartnershipprogram';
  page: string = 'agency partnership program';
  title: string = 'for Agency Partnership Program';
  subTitle !: string;
  pageTitle: string = 'Advertise in Excellent Publicity';
  metaDescription: string = 'Advertise in Excellent Publicity';

  // callToActionData: CallToAction = { title: C2A_TITLE_DATA['agencypartnershipprogram'], inquiryUser: {} };
  metaData: any = META_DATA['agencypartnershipprogram'];

  selectedCountry: any = { "name": "India", "dialCode": "+91", "code": "IN" };
  countryList: any = [];
  countryFilteredList: any = [];

  userInquiryForm!: UntypedFormGroup;
  inquiryType: string = 'agencypartnershipprogram';
  href: any = "";
  inquirySubmit = false;
  inquiryMessage = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private pageService: PageService,
    private commonService: CommonService,
    private elementRef: ElementRef

  ) {
  }

  ngOnInit(): void {

    this.href = this.router.url;

    // this.callToActionData.inquiryUser = {
    //   contact: "9727797470",
    //   email: "amit@excellentpublicity.com",
    //   name: "Amit Thakkar",
    //   call: { show: "9727797470", value: "9727797470" },
    //   whatsapp: { show: "9727797470", value: "9727797470" }
    // };

    this.setMetaData();
    this.createForm();

    this.userService.getCountryCodes().subscribe(response => {
      if (response?.status) {
        this.countryList = response?.data;
        this.countryFilteredList = response?.data;
      }
      else {
        this.countryList = [];
        this.countryFilteredList = [];
      }

    });

  }

  onSearchChange(value: string) {
    this.countryFilteredList = this.countryList.filter((item: any) => (item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) || (item.dialCode.toLowerCase().indexOf(value.toLowerCase()) !== -1));
  }

  selectCountry(country: any) {
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

  private createForm() {
    this.userInquiryForm = new UntypedFormGroup({
      url: new UntypedFormControl(this.href, [Validators.required]),
      inquiry_type: new UntypedFormControl(this.inquiryType, [Validators.required]),
      media: new UntypedFormControl(this.media, [Validators.required]),
      name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidatoChannelPage]),
      contact: new UntypedFormControl('', [Validators.required]),
      city: new UntypedFormControl('', [Validators.required]),
      company: new UntypedFormControl('', [Validators.required]),
      comment: new UntypedFormControl('', [Validators.required]),
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
    formData.country = this.selectedCountry;
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

  scrollToElement() {
    const targetElement = this.elementRef.nativeElement.querySelector('#meetup');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
