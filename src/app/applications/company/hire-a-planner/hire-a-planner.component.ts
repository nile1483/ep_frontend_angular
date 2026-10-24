import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '@app-shared-services';
import { META_DATA } from 'src/app/shared/constants/metadata';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
import { PageService } from '../../page/page.service';

export function isPersonalEmailValidatorHireAPlanner(control: UntypedFormControl): ValidationErrors | null {
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
  selector: 'app-hire-a-planner',
  templateUrl: './hire-a-planner.component.html',
  styleUrls: ['./hire-a-planner.component.css']
})
export class HireAPlannerComponent implements OnInit {

  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['hireaplanner'];
  inquirySubmit = false;
  inquiryMessage = null;
  page: string = 'hire-a-planner';
  selectedCountry: any = { "name": "India", "dialCode": "+91", "code": "IN" };
  countryList: any = [];
  countryFilteredList: any = [];

  userInquiryForm !: UntypedFormGroup;

  constructor(
    private pageService: PageService,
    private userService: UserService,
    private commonService: CommonService,
  ) { }

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
      inquiry_type: new UntypedFormControl('hireaplanner', [Validators.required]),
      media: new UntypedFormControl('hire a planner',),
      name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidatorHireAPlanner]),
      contact: new UntypedFormControl('', [Validators.required]),
      city: new UntypedFormControl('', [Validators.required]),
      product_desc: new UntypedFormControl('', [Validators.required]),
      website_name: new UntypedFormControl(''),
      start_date: new UntypedFormControl(''),
      location: new UntypedFormControl(''),
      audience_type: new UntypedFormArray([]),
      media_option: new UntypedFormArray([]),
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

    this.userInquiryForm.markAllAsTouched()
    if (!this.userInquiryForm.valid) {
      return;
    }

    let serviceData: any = [];
    let formData = this.userInquiryForm.value;
    formData.country = this.selectedCountry;
    serviceData['formData'] = formData;

    this.pageService.inquiryHireaplannerCreate(serviceData).subscribe(result => {
      if (result.status == true) {
        this.inquiryMessage = result.message;
        this.inquirySubmit = true;
        this.commonService.gtmGenerateLeadEvents('Hire a Planner', result.id);
      }
    });

    this.scrollToTitle();
  }

  scrollToTitle() {
    const element: any = document.querySelector('#title');
    element.scrollIntoView({ behavior: 'smooth' });
  }

  audienceTypeChange(event: any) {

    const audience_type = <UntypedFormArray>this.userInquiryForm.get('audience_type') as UntypedFormArray;

    if (event.target.checked) {
      audience_type.push(new UntypedFormControl(event.target.value))
    }
    else {
      const i = audience_type.controls.findIndex(x => x.value === event.target.value);
      audience_type.removeAt(i);
    }

  }

  mediaOptionChange(event: any) {

    const media_option = <UntypedFormArray>this.userInquiryForm.get('media_option') as UntypedFormArray;

    if (event.target.checked) {
      media_option.push(new UntypedFormControl(event.target.value))
    }
    else {
      const i = media_option.controls.findIndex(x => x.value === event.target.value);
      media_option.removeAt(i);
    }
  }

}
