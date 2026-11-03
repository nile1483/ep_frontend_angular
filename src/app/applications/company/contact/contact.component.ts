import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '@app-shared-services';
import { META_DATA } from 'src/app/shared/constants/metadata';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
import { PageService } from '../../page/page.service';

export function isPersonalEmailValidatorContact(control: UntypedFormControl) : ValidationErrors | null {
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
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
    standalone: false
})
export class ContactComponent implements OnInit {

  userInquiryForm!: UntypedFormGroup;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['contact'];
  inquirySubmit = false;
  inquiryMessage = null;
  page: string = 'contact';
  fragmentstr: any = false;
  selectedCountry: any = { "name": "India", "dialCode": "+91", "code": "IN" };
  countryList: any = [];
  countryFilteredList: any = [];

  @ViewChild("myElem") MyProp!: ElementRef;

  constructor(
    private userService: UserService,
    private pageService: PageService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    const queryParams = this.route.snapshot.queryParams;

    if (queryParams['q'] && queryParams['q'].length > 0) {
      this.fragmentstr = queryParams['q'];
    }

  }

  ngOnInit(): void {

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


  createForm() {
    this.userInquiryForm = new UntypedFormGroup({
      inquiry_type: new UntypedFormControl(this.page, [Validators.required]),
      name: new UntypedFormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidatorContact]),
      contact: new UntypedFormControl('', [Validators.required]),
      city: new UntypedFormControl('', [Validators.required, Validators.maxLength(50)]),
      company: new UntypedFormControl('', [Validators.maxLength(50)]),
      comment: new UntypedFormControl('', []),
    });
  }
  onSearchChange(value: string) {
    this.countryFilteredList = this.countryList.filter((item: any) => (item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) || (item.dialCode.toLowerCase().indexOf(value.toLowerCase()) !== -1));
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToTitle()
    }, 1000)

  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}` + `/${this.page}`;
    //og data          
    metaInfo.og_url = `${this.webURL}` + `/${this.page}`;
    metaInfo.og_image = `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);

    //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Company', 'Company');
  }

  inquiryFormSubmit() {

    this.userInquiryForm.markAllAsTouched();
    if (!this.userInquiryForm.valid) {
      return;
    }

    let serviceData: any = [];
    let formData = this.userInquiryForm.value;
    formData.country = this.selectedCountry;
    serviceData['formData'] = formData;

    this.pageService.inquiryContactCreate(serviceData).subscribe(result => {
      if (result.status == true) {
        this.inquiryMessage = result.message;
        this.inquirySubmit = true;
        this.commonService.gtmGenerateLeadEvents('Contact', result.id);

      }
    });

    this.scrollToTitle();
  }

  scrollToTitle() {
    const element: any = document.querySelector('#quickInquiry');
    element.scrollIntoView();
  }
}
