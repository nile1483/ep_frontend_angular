import { Component, ElementRef, OnInit } from '@angular/core';
import { UserService } from '@app-shared-services';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { MatDialog } from '@angular/material/dialog';
import { PageService } from '../../page.service';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
import { Router } from '@angular/router';

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
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.css'
})
export class CommunityPageComponent {

  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['community'];

  selectedCountry: any = { "name": "India", "dialCode": "+91", "code": "IN" };
  countryList: any = [];
  countryFilteredList: any = [];

  userInquiryForm!: UntypedFormGroup;
  inquiryType: string = 'community';
  media: string = 'community';
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
      media: new UntypedFormControl('community'),
      email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidatoMediaPage]),
      contact: new UntypedFormControl('', [Validators.required]),
      company: new UntypedFormControl('', [Validators.required]),
      comment: new UntypedFormControl('', [Validators.required]),
      community: new UntypedFormArray([]),
      agree_terms_conditions: new UntypedFormControl('', [Validators.required]),
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

    this.commonService.gtmPageEvents('Company', 'Community Page');
  }


  onSearchChange(value: string) {
    this.countryFilteredList = this.countryList.filter((item: any) => (item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) || (item.dialCode.toLowerCase().indexOf(value.toLowerCase()) !== -1));
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
  }

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

  agreeTermsConditionsChange(event: any) {
    if (event.target.checked) {
      this.userInquiryForm.get('agree_terms_conditions')?.setValue('Yes');
    } else {
      this.userInquiryForm.get('agree_terms_conditions')?.setValue(null);
    }
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

  scrollToElementTermsConditions() {
    const targetElement = this.elementRef.nativeElement.querySelector('#termsconditions');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  faqList = [
    {
      "question": "Who can join the Excellent Publicity Community?",
      "answer": "Visionaries across industries who are looking to grow, connect, and access valuable business insights."
    },
    {
      "question": "Is the community free to join?",
      "answer": "Membership is complimentary but invite-only, ensuring exclusivity and relevance for all participants."
    },
    {
      "question": "How will my data be used?",
      "answer": "Your contact details will only be used to add you to the community and share updates from Excellent Publicity. We do not share or sell any data."
    },
    {
      "question": "What kind of opportunities are shared?",
      "answer": "Members gain early access to advertising and branding opportunities, market insights, partnership leads, and professional collaborations."
    },
    {
      "question": "How do I request an invite?",
      "answer": "Fill out the integrated form below with your details. Our team will review your profile and share the next steps upon approval."
    }
  ];

}