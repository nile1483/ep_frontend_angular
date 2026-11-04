import { Component, ChangeDetectionStrategy } from '@angular/core';
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
    selector: 'app-cricket-advertising-page',
    templateUrl: './cricket-advertising-page.component.html',
    styleUrl: './cricket-advertising-page.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CricketAdvertisingPageComponent {

  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['cricket-advertising'];
  inquiryType: string = 'cricketadvertising';
  media: string = 'cricketadvertising';

  href: any = "";
  inquirySubmit = false;
  inquiryMessage = null;
  userInquiryForm!: UntypedFormGroup;
  isMobile = false;

  isNewsletterFormSubmit: boolean = false;
  newsletterMessage = null;
  newsletterForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
  });

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

    this.commonService.gtmPageEvents('Company', 'Cricket Advertising Page');
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

  newsletterFormSubmit() {

    this.newsletterForm.markAllAsTouched();

    if (!this.newsletterForm.valid) {
      return;
    }

    let serviceData: any = [];
    serviceData['formData'] = this.newsletterForm.value;

    this.pageService.subscribeNewsletter(serviceData).subscribe(result => {
      if (result.status == true) {
        this.newsletterMessage = result.message;
        this.isNewsletterFormSubmit = true;
      }
    });
  }

  faqList = [
    {
      "question": "How do I evaluate whether my advertising campaign during live sports performed well?",
      "answer": "Campaign performance is evaluated using a mix of reach, impressions, frequency, visibility, and engagement metrics across TV and digital platforms. Post-campaign reports also include delivery vs planned inventory, audience profiles reached, and contextual analysis based on match intensity and viewership trends.",
    },
    {
      "question": "Does the viewership shown during live matches represent concurrent or cumulative audiences?",
      "answer": "Viewership displayed on-screen typically reflects concurrent viewers at that moment. Cumulative reach is calculated separately using industry measurement systems and platform-level data, which account for unique viewers across the full match or tournament duration.",
    },
    {
      "question": "How is audience reach calculated for sports advertising campaigns?",
      "answer": "Audience reach is measured using official broadcast measurement tools and digital analytics. TV reach is based on panel-based measurement systems, while digital reach is derived from device-level data, logged-in users, and platform analytics, ensuring duplication is minimized across devices where possible.",
    },
    {
      "question": "How should a brand compare on-screen media properties versus on-ground media properties?",
      "answer": "On-screen media delivers scale, frequency, and repeat visibility, making it effective for mass awareness. On-ground media provides strong contextual presence and association but reaches a limited audience. The right mix depends on campaign objectives, budget size, and whether the goal is reach, recall, or premium brand association.",
    },
    {
      "question": "What is the minimum investment required to achieve meaningful visibility in sports advertising?",
      "answer": "Meaningful visibility depends on frequency and placement rather than a fixed amount. Campaigns generally need sufficient investment to ensure repeated exposure across multiple matches or days to drive recall and impact, rather than one-off placements.",
    },
    {
      "question": "How does the reach of the T20 World Cup compare with IPL and other major tournaments?",
      "answer": "The T20 World Cup delivers massive short-term global reach, while IPL offers sustained domestic exposure over an extended period. IPL’s long duration enables higher frequency and recall, whereas ICC events provide sharp spikes in viewership during key matches.",
    },
    {
      "question": "Which advertising inventory is more effective for a limited budget: pre-roll or mid-roll?",
      "answer": "Mid-roll inventory generally delivers higher visibility and attention, as viewers are already engaged in live content. Pre-roll placements offer scale but may experience higher drop-offs. For limited budgets, fewer high-impact mid-rolls often outperform high-volume pre-rolls.",
    },
    {
      "question": "How does live sports advertising compare to regular entertainment advertising in terms of attention?",
      "answer": "Live sports command higher attention levels due to unpredictability and emotional engagement. Unlike scripted content, viewers are less likely to multitask or skip ads, making sports advertising more impactful for brand recall.",
    },
    {
      "question": "How is sports advertising impactful for brands?",
      "answer": "Sports content often captures viewers&#39; complete attention due to its live nature and the emotional stakes involved. In contrast to normal commercials, which viewers might skip, ads during sports events are seen by a captive audience. This can cause better memory of the ads and a higher degree of trust in the brand because of its within the game.",
    },
    {
      "question": "Can advertisers have different targeting options during cricket league and tournament events??",
      "answer": "Yes, advertisers use different targeting options like affluence, demographics, states, cities, device price, age and gender to structure brand campaigns on digital platforms connecting with particular audiences. Premium audiences (NCCS AB) can also be targeted along with the price of the device they use.",
    },
    {
      "question": "Why is IPL considered one of the best platforms for advertising in India?",
      "answer": "The Indian Premier League merges cricket with brand promotions securing widespread daily viewership on TV, and streaming platforms. The two and a half month duration guarantees repeated brand visibility, which boosts memory and involvement of the audience.",
    }
  ]
}