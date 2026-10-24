import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppURL } from 'src/app/app-url';
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
import { UserService } from 'src/app/shared/services/user.service';
import { PageService } from '../../page.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { log } from 'console';
import { META_DATA } from '@app-shared-constants';
import { MetaInformation } from '@app-shared-model';
import { CommonService } from '@app-shared-services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-infilm-outfilm',
  templateUrl: './infilm-outfilm.component.html',
  styleUrl: './infilm-outfilm.component.css'
})
export class InfilmOutfilmComponent implements OnInit {

  media: string = 'infilmoutfilm';
  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['infilmoutfilm'];
  href: any = "";

  infilm = [
    { name: 'Baby John', slug: 'baby-john', mediaType: 'Infilm', image: 'assets/media/infilm-outfilm/baby-john.jpg' },
    { name: 'Game Changer', slug: 'game-changer', mediaType: 'Infilm', image: 'assets/media/infilm-outfilm/game-changer.jpg' },
    { name: 'Dhadak 2', slug: 'dhadak-2', mediaType: 'Infilm', image: 'assets/media/infilm-outfilm/dhadak.jpg' },
    { name: 'Robinhood', slug: 'robinhood', mediaType: 'Infilm', image: 'assets/media/infilm-outfilm/robinhood.jpg' },
    { name: 'Emergency', slug: 'emergency', mediaType: 'Infilm', image: 'assets/media/infilm-outfilm/emergency.jpg' },
    { name: 'Deva', slug: 'deva', mediaType: 'Infilm', image: 'assets/media/infilm-outfilm/deva.jpg' },
    { name: 'Chand Mera Dil', slug: 'chand-mera-dil', mediaType: 'Infilm', image: 'assets/media/infilm-outfilm/chand-mera-dil.jpg' }
  ];

  constructor(
    public dialog: MatDialog,
    public commonService: CommonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.href = this.router.url;

    this.setMetaData();
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

  openInquiryDialog(item: any): void {
    item.url = this.href;
    const dialogRef = this.dialog.open(InfilmOutfilmInquiryDialog, {
      width: '600px',
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  faqList = [
    {
      "question": "What Is the Difference Between In-Film and Co-branding?",
      "answer": "In-film advertising is when brands or products are part of the film's storyline. Out-of-film advertising, on the other hand, is where films are marketed outside the film itself. Examples of Co-branding is when two companies work together to market a product in cinema ads with both companies' names on it."
    },
    {
      "question": "Are In-Film Advertising Rates the Same for All Films?",
      "answer": "No, <b>in-film advertising rates</b> depend on several factors like popular films, the budget of the production, the kind of brand integration, and its target audience; hence, every placement will be different in price."
    },
    {
      "question": "How Do You Track the Effectiveness of In-Film Advertising?",
      "answer": "The effectiveness can be measured through <b>brand recall surveys</b>, <b>social media engagement</b>, <b>sales growth</b>, and <b>digital traffic</b> that provide a notion about consumer response and ROI."
    },
    {
      "question": "What Are the Common Co-branding Methods?",
      "answer": "Common co-branding methods include same-company branding, product co-branding, ingredient branding, and joint venture co-branding."
    },
    {
      "question": "Are In-Film and Co-branding Effective for Small Businesses?",
      "answer": "Yes, for small businesses, in-film and co-branding can work out as niche or regional films reach specific audiences interested in the film for a cost."
    },
    {
      "question": "What are some examples of successful in-film and co-branding?",
      "answer": "Coca-Cola in 'Dil Dhadakne Do' and Samsung in 'Dangal': wonderful cases where <b>in-film brand placements</b> were complemented by co-branding and yielded sustained consumer connection and truly added sales."
    },
    {
      "question": "How to Integrate Both Strategies for Maximum Impact?",
      "answer": "Both in-film advertising and co-branding could create a sound campaign wherein the narration of the cinema could be subtly integrated with digital and theater advertisements to enhance the message after releasing the film."
    },
    {
      "question": "What Metrics Should You Track to Measure the ROI of Film-Based Advertising?",
      "answer": "Track brand awareness, consumer engagement, sales impact, and social media activity as return on investment indicators. Reach and viewership analysis is equally important in gauging the effectiveness of the campaign."
    },
    {
      "question": "How Does Brand Placement in Films Influence Consumer Perception?",
      "answer": "Brand placement can also be labeled as an influence as a brand is linked with the values, characters, or narrative that creates an emotional attachment to the story for the audience."
    },
    {
      "question": "Can Co-branding Help Drive Traffic to In-Film Campaigns?",
      "answer": "For sure, co-branding through social media promos or event activation may drive traffic to in-film campaigns that might then build awareness and engagement both before and after its release."
    },
    {
      "question": "How Important Are Audience Demographics for Film Advertising?",
      "answer": "Hence, film marketing largely relies on audience demographics. Knowing the age, region, and other preferences of viewers will probably ensure that in-film and co-branding, is relevant, effective, and resonates with the target market."
    }
  ];

}





@Component({
  selector: 'infilm-outfilm-inquiry-dialog',
  templateUrl: 'infilm-outfilm-inquiry-dialog.html',
  styles: ['.mat-mdc-dialog-actions { padding-top: 0px !important; }']
})

export class InfilmOutfilmInquiryDialog {

  selectedCountry: any = { "name": "India", "dialCode": "+91", "code": "IN" };
  countryList: any = [];
  countryFilteredList: any = [];

  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private pageService: PageService,
    public dialogRef: MatDialogRef<InfilmOutfilmInquiryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.getCountryCodeData();
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

  onSearchChange(value: string) {
    this.countryFilteredList = this.countryList.filter((item: any) => (item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) || (item.dialCode.toLowerCase().indexOf(value.toLowerCase()) !== -1));
  }


  selectCountry(country: any) {
    this.selectedCountry = country;
  }

  inquiryForm = new UntypedFormGroup({
    url: new UntypedFormControl(),
    inquiry_type: new UntypedFormControl('infilmoutfilm', [Validators.required]),
    media: new UntypedFormControl('infilmoutfilm', [Validators.required]),
    company: new UntypedFormControl('', [Validators.required, Validators.maxLength(50)]),
    name: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidatorDownload]),
    contact: new UntypedFormControl('', [Validators.required]),
    city: new UntypedFormControl('', [Validators.required]),
  });


  inquiryFormSubmit() {

    this.inquiryForm.markAllAsTouched();
    if (!this.inquiryForm.valid) {
      return;
    }

    let formData = this.inquiryForm.value;
    formData.country = this.selectedCountry;
    formData.url = this.data.item.url;
    formData.product_name = this.data.item.name;
    formData.product_slug = this.data.item.slug;
    formData.product_type = this.data.item.mediaType;

    let serviceData: any = [];
    serviceData['formData'] = formData;

    this.pageService.inFilmAndCobrandingCreate(serviceData).subscribe(result => {
      if (result.status == true) {
        this.commonService.openSnackBar(result.message);
        this.dialogClose(true);
      }
    });
  }

  dialogClose(isReg: boolean): void {
    this.dialogRef.close(isReg);
  }
}


export function isPersonalEmailValidatorDownload(control: UntypedFormControl): ValidationErrors | null {

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
