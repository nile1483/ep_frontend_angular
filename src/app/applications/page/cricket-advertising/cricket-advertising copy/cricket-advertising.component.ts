import { Component } from '@angular/core';
import { SERVICE_LIST_WITH_SVG_ICON, APP_SVG_ICON_LIST, SVG_ICON_FOR_MEDIA, C2A_TITLE_DATA } from '@app-shared-constants';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { CommonService, UserService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { Router } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
import { PageService } from '../../page.service';

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
  selector: 'app-cricket-advertising',
  templateUrl: './cricket-advertising.component.html',
  styleUrl: './cricket-advertising.component.css'
})
export class CricketAdvertisingComponent {

  inquiryType: string = 'cricketadvertising';
  media: string = 'cricketadvertising';
  href: any = "";
  inquirySubmit = false;
  inquiryMessage = null;
  userInquiryForm!: UntypedFormGroup;
  isMobile = false;

  webURL: string = AppURL.webURL;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA[this.media];

  selectedCurrency: any;

  selectedCountry: any = { "name": "India", "dialCode": "+91", "code": "IN" };
  countryList: any = [];
  countryFilteredList: any = [];

  constructor(
    private router: Router,
    private commonService: CommonService,
    private userService: UserService,
    private pageService: PageService,
  ) { }

  ngOnInit(): void {

    this.href = this.router.url;

    this.getCountryCodeData();
    this.setMetaData();
    this.createForm();
    this.checkScreen();
    window.addEventListener('resize', () => this.checkScreen());
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


  private createForm() {
    this.userInquiryForm = new UntypedFormGroup({
      url: new UntypedFormControl(this.href, [Validators.required]),
      inquiry_type: new UntypedFormControl(this.inquiryType, [Validators.required]),
      media: new UntypedFormControl(this.media, [Validators.required]),
      name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidatoMediaPage]),
      contact: new UntypedFormControl('', [Validators.required]),
      comment: new UntypedFormControl('',),
    });
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

  checkScreen() {
    this.isMobile = window.innerWidth < 1150;
  }


  faqList = [
    {
      "question": "What are some effective sports marketing strategies for growing fan engagement?",
      "answer": "Effective sports marketing strategies aim to make fans feel emotionally involved using engaging experiences. Methods might include social media interaction, behind the scenes content, activities during games, stories told by athletes, and rewards for fans. Regular interaction on digital platforms, at community events, and in the stadium can make fans more loyal.",
    },
    {
      "question": "How does digital marketing for sports help teams and athletes grow their audience?",
      "answer": "Digital marketing allows sports teams and athletes to connect with audiences worldwide using platforms like social media, content marketing, videos, and targeted ads. Sports brands can use data to create more personalised content, interact with fans instantly, and reach people outside of physical locations. Digital channels also assist in turning followers into dedicated fans by providing direct engagement and special content.",
    },
    {
      "question": "What makes advertising at sporting events such an effective brand awareness tool?",
      "answer": "Advertising during sporting events provides strong visibility by putting brands in front of audiences who are emotionally invested in the game. Brands can make repeated impressions with stadium branding, LED boards around the field, activations at the event, and broadcast exposure. Tying a brand to sports can also improve how well people remember the brand, its believability, and positive feelings among fans.",
    },
    {
      "question": "How does sports product marketing influence buyer decisions and brand preference?",
      "answer": "Sports product marketing affects consumer buying choices by linking products to athletic ability, lifestyle, and personal goals. Endorsement of products by athletes, feature demonstrations at events, and content showcasing enhance trust and believability. This method makes brand preference stronger by associating the product to strong sentiments of fans about sports and athletes.",
    }
  ]

}
