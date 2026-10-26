import { Component, ElementRef, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '@app-shared-services';
import { SERVICE_LIST_WITH_SVG_ICON, APP_SVG_ICON_LIST, SVG_ICON_FOR_MEDIA, C2A_TITLE_DATA } from '@app-shared-constants';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';

import { MatDialog } from '@angular/material/dialog';
import { PageService } from '../../page.service';
import { UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoServiceDialogComponent } from '../seo-service-dialog/seo-service-dialogcomponent';


export function isPersonalEmailValidatoSeoServicePage(control: UntypedFormControl): ValidationErrors | null {
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
    selector: 'app-seo-service-page',
    templateUrl: './seo-service-page.component.html',
    styleUrls: ['./seo-service-page.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SeoServicePageComponent implements OnInit {

  webURL: string = AppURL.webURL;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['seoservice'];
  selectedCurrency: any;
  pageContentData: any;
  selectedCountry: any = { "name": "India", "dialCode": "+91", "code": "IN" };
  countryList: any = [];
  countryFilteredList: any = [];

  userInquiryForm!: UntypedFormGroup;
  inquiryType: string = 'seoservice';
  media: string = 'seoservice';
  href: any = "";
  inquirySubmit = false;
  inquiryMessage = null;
  callToActionData: CallToAction = { title: C2A_TITLE_DATA[this.media], inquiryUser: {}};

  constructor(
    private router: Router,
    private commonService: CommonService,
    private pageService: PageService,
    private userService: UserService,
    public dialog: MatDialog,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {

    this.href = this.router.url;

     this.callToActionData.inquiryUser = {
      contact: "8799613624",
      email: "neha@excellentpublicity.com",
      name: "Neha Sharma",
      call: { show: "8799613624", value: "8799613624" },
      whatsapp: { show: "8799613624", value: "8799613624" }
    };

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
      media: new UntypedFormControl(this.media, [Validators.required]),
      name: new UntypedFormControl('', [Validators.required]),
      contact: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidatoSeoServicePage]),
      website_type: new UntypedFormControl('', [Validators.required]),
      city: new UntypedFormControl('', [Validators.required]),
      comment: new UntypedFormControl('', [Validators.required]),
      target_audience: new UntypedFormControl('', [Validators.required]),
      seo_keyword: new UntypedFormControl('', [Validators.required])
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


  openFormDialog()
  {
    const dialogRef = this.dialog.open(SeoServiceDialogComponent, {
      width: '450px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        // this.isDialogShow = false;
        //window.location.reload();
      }

    });
  }


  scrollToElement() {
    const targetElement = this.elementRef.nativeElement.querySelector('#meetup');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
