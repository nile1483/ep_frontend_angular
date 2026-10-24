import { Component, ElementRef, OnInit } from '@angular/core';
import { UserService } from '@app-shared-services';
import { SERVICE_LIST_WITH_SVG_ICON, APP_SVG_ICON_LIST, SVG_ICON_FOR_MEDIA } from '@app-shared-constants';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';

import { MatDialog } from '@angular/material/dialog';
import { PageService } from '../../page.service';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
import { ActivatedRoute, Router } from '@angular/router';

export function isPersonalEmailValidatoMediaPage(control: UntypedFormControl): ValidationErrors | null {
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
  selector: 'app-whatsapp-community-elements-page',
  templateUrl: './whatsapp-community-elements.component.html',
  styleUrl: './whatsapp-community-elements.component.css'
})
export class WhatsappCommunityElementsComponent {


  webURL: string = AppURL.webURL;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['whatsappcommunityelements'];
  selectedCurrency: any;
  pageContentData: any;
  selectedCountry: any = { "name": "India", "dialCode": "+91", "code": "IN" };
  countryList: any = [];
  countryFilteredList: any = [];

  userInquiryForm!: UntypedFormGroup;
  inquiryType: string = 'whatsappcommunityelements';
  media: string = 'whatsappcommunityelements';
  href: any = "";
  inquirySubmit = false;
  inquiryMessage = null;


  constructor(
    private router: Router,
    private commonService: CommonService,
    private pageService: PageService,
    private userService: UserService,
    public dialog: MatDialog,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {

    this.href = this.router.url;

    this.getCountryCodeData();
    this.setMetaData();
    this.createForm();

    //Currency
    this.selectedCurrency = this.commonService.getSelectedCurrency();
    this.commonService.getCurrency().subscribe(currency => {
      this.selectedCurrency = this.commonService.getSelectedCurrency();
    });
  }

  getCountryCodeData() {
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


  private createForm() {
    this.userInquiryForm = new UntypedFormGroup({
      url: new UntypedFormControl(this.href, [Validators.required]),
      inquiry_type: new UntypedFormControl(this.inquiryType, [Validators.required]),
      media: new UntypedFormControl('whatsapp community elements',),
      email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidatoMediaPage]),
      contact: new UntypedFormControl('', [Validators.required]),
      company: new UntypedFormControl('', [Validators.required]),
      comment: new UntypedFormControl('', [Validators.required]),
      community: new UntypedFormArray([]),
    });
  }


  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}` + `${this.router.url}`;
    //og data          
    metaInfo.og_url = `${this.webURL}`;
    metaInfo.og_image = `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);

    //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Company', 'Company');
  }


  onSearchChange(value: string) {
    this.countryFilteredList = this.countryList.filter((item: any) => (item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) || (item.dialCode.toLowerCase().indexOf(value.toLowerCase()) !== -1));
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
  }

  inquiryFormSubmit() {

    this.userInquiryForm.markAllAsTouched();

    if (this.userInquiryForm.valid) {

      let formData = this.userInquiryForm.value;
      formData.country = this.selectedCountry;

      let serviceData: any = [];
      serviceData['inquiryType'] = this.inquiryType;
      serviceData['formData'] = formData;

      this.pageService.inquiryOtherServicesCreate(serviceData).subscribe(result => {
        if (result.status == true) {
          this.inquiryMessage = result.message;
          this.inquirySubmit = true;
        }
      });
    }
    else {
      return;
    }

  }


  scrollToElement() {
    const targetElement = this.elementRef.nativeElement.querySelector('#meetup');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


  faqList = [
    {
      "question": "Who can join this community?",
      "answer": "Marketers, entrepreneurs, and business owners who want to grow through media and advertising opportunities."
    },
    {
      "question": "How often will I get updates?",
      "answer": "We share opportunities, insights, and case studies on a regular basis."
    },
    {
      "question": "Is my data safe?",
      "answer": "Yes. Your phone number and professional email ID will be used only to add you to the community."
    },
    {
      "question": "Is there a fee to join?",
      "answer": "Currently, joining is free. Certain premium resources may be offered exclusively to active members."
    }
  ];



  communityChange(event: any) {
  
      const community = <UntypedFormArray>this.userInquiryForm.get('community') as UntypedFormArray;
  
      if (event.target.checked) {
        community.push(new UntypedFormControl(event.target.value))
      }
      else {
        const i = community.controls.findIndex(x => x.value === event.target.value);
        community.removeAt(i);
      }
    }
}
