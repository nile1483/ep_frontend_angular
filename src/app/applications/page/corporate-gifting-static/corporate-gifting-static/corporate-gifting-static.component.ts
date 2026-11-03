import { Component, OnInit } from '@angular/core';
import { UserService } from '@app-shared-services';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { MatDialog } from '@angular/material/dialog';
import { PageService } from '../../page.service';
import { UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
import { Router } from '@angular/router';
import { META_DATA } from '@app-shared-constants';

export function isPersonalEmailValidatorStatic(control: UntypedFormControl): ValidationErrors | null {

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
    selector: 'app-corporate-gifting-static',
    templateUrl: './corporate-gifting-static.component.html',
    styleUrls: ['./corporate-gifting-static.component.css'],
    standalone: false
})
export class CorporateGiftingStaticComponent implements OnInit {

  media: string = 'corporate-gifting';
  webURL: string = AppURL.webURL;
  metaData: any = META_DATA[this.media];

  selectedCountry: any = { "name": "India", "dialCode": "+91", "code": "IN" };
  countryList: any = [];
  countryFilteredList: any = [];

  inquirySubmit = false;
  inquiryMessage = null;

  quickInquiryForm = new UntypedFormGroup({
    inquiryType: new UntypedFormControl('quickenquiry', [Validators.required]),
    inquiryPage: new UntypedFormControl('excellentbasket', [Validators.required]),
    company: new UntypedFormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidatorStatic]),
    contact: new UntypedFormControl('', [Validators.required]),
    lookingfor: new UntypedFormControl('', [Validators.required]),
    budget: new UntypedFormControl('', [Validators.required]),
    quantity: new UntypedFormControl('', [Validators.required])
  });


  constructor(
    private router: Router,
    private commonService: CommonService,
    private pageService: PageService,
    private userService: UserService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getCountryCodeData();
    this.setMetaData();
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


  onSearchChange(value: string) {
    this.countryFilteredList = this.countryList.filter((item: any) => (item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) || (item.dialCode.toLowerCase().indexOf(value.toLowerCase()) !== -1));
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
  }

  quickInquiryFormSubmit() {

    this.quickInquiryForm.markAllAsTouched();
    if (!this.quickInquiryForm.valid) {
      return;
    }

    let formData = this.quickInquiryForm.value;
    formData.country = this.selectedCountry;

    let serviceData: any = [];
    serviceData['formData'] = formData;

    this.pageService.quickInquiryGiftingCreate(serviceData).subscribe(result => {
      if (result.status == true) {
        this.inquiryMessage = result.message;
        this.inquirySubmit = true;
      }
    });
  }




  faqList = [
    {
      "question": "How can corporate gifts be used effectively in employee incentive programs?",
      "answer": "Corporate gifts can serve as powerful motivators within employee incentive programs. By strategically aligning gifts with specific performance goals, companies can create a tangible reward system that drives employee engagement and productivity. For instance, gifts can be linked to sales targets, customer satisfaction metrics, or project completion deadlines. It's essential to ensure the reward is commensurate with the achievement to maintain its motivational impact. Additionally, considering employee preferences when selecting gifts can enhance their perceived value and effectiveness.",
    },
    {
      "question": "How can corporate gifts support employee wellness initiatives?",
      "answer": "Corporate gifts can be instrumental in fostering a culture of well-being within an organization. By offering gifts that promote health and wellness, companies demonstrate a genuine commitment to their employees' overall well-being. This can include items like gym memberships, fitness trackers, or subscriptions to meditation or mindfulness apps. Additionally, curated gift baskets containing healthy snacks, relaxation products, or ergonomic equipment can create a supportive work environment that encourages employees to prioritize their health.",
    },
    {
      "question": "What are some creative ways to package corporate gifts?",
      "answer": "The presentation of a corporate gift is just as important as the gift itself. Creative packaging can elevate the overall gifting experience and leave a lasting impression. Consider incorporating personalized elements such as the recipient's name or company logo into the packaging design. Unique gift boxes or bags can add a touch of exclusivity. For eco-conscious companies, sustainable packaging options made from recycled materials can demonstrate a commitment to environmental responsibility. Additionally, themed gift baskets or hampers can be created to align with specific occasions or company values.",
    },
    {
      "question": "Why are personalized gifts important in corporate gifting?",
      "answer": "Personalized gifts demonstrate a higher level of thoughtfulness and care, making the recipient feel valued and appreciated. By incorporating personal details such as the recipient's name, interests, or preferences, companies can create a more meaningful and impactful gifting experience. Personalized gifts also strengthen the emotional connection between the giver and the receiver, fostering stronger relationships and loyalty. Whether it's a custom-engraved item or a personalized message, these small touches can make a significant difference.",
    },
    {
      "question": "What are common occasions for corporate gifting?",
      "answer": "Corporate gifting presents numerous opportunities to strengthen relationships and build brand loyalty. Common occasions include holidays, employee anniversaries, promotions, client appreciation, business milestones, and corporate events. By selecting appropriate gifts for each occasion, companies can demonstrate thoughtfulness and create a positive impression. For example, during the holiday season, gifts can express gratitude to clients and employees. For employee anniversaries, personalized gifts can celebrate tenure and loyalty.",
    },
    {
      "question": "How can corporate gifts be aligned with company values?",
      "answer": "Aligning corporate gifts with company values reinforces brand identity and demonstrates a commitment to social responsibility. By selecting gifts that reflect the company's mission and values, businesses can create a positive and consistent brand image. For example, a company that prioritizes sustainability can offer eco-friendly gifts made from recycled materials. Those focused on community involvement can donate a portion of the proceeds to charity or support local businesses. By choosing gifts that resonate with the company's values, businesses can create a stronger connection with their stakeholders.",
    },
    {
      "question": "What types of corporate gifts do you offer in your catalog?",
      "answer": "At Excellent Publicity, our catalog boasts an extensive array of corporate gifts designed to meet a variety of preferences and occasions. Our offerings include: </br>\n- Food and Beverages </br> \n- Grooming Kits and Perfumes </br>\n- Travel Companions and Accessories </br>\n- Writing Instruments and Stationery </br>\n- Lifestyle Products </br>\n- Home Appliances and Kitchen Utility </br>\n- Personalized Items </br>\nOur diverse selection ensures that you can find the perfect corporate gift to suit your specific needs, whether you're looking to impress clients, reward employees, or mark special events and milestones."
    },
    {
      "question": "How can I place an order for corporate gifts?",
      "answer": "Placing an order for corporate gifts is easy. You can visit our website and browse our catalog. Once you've selected the items you want, simply add them to your cart and proceed to the checkout. Our ordering process is user-friendly and provides step-by-step guidance.",
    },
    {
      "question": "What is the minimum order quantity for corporate gifts?",
      "answer": "The minimum order quantity for corporate gifts may vary depending on the specific product. We offer flexibility in this regard to accommodate both small and large orders. You can find the minimum order quantity listed on each product page. ",
    },
    {
      "question": "Do you offer bulk discounts for larger orders?",
      "answer": "Yes, we do offer bulk discounts for larger corporate gift orders. We believe in rewarding our clients for their trust and loyalty. The extent of the discount will depend on the order quantity and the products selected. Feel free to contact our team for more information. ",
    },
    {
      "question": "What is the average delivery time for corporate gift orders?",
      "answer": "The average delivery time for corporate gift orders can vary depending on factors such as the order size, customization requirements, and shipping destination. We strive to process and deliver orders efficiently. You can find estimated delivery times on the product pages, and you can also contact our customer support for specific delivery inquiries. ",
    },
    {
      "question": "Can you handle international shipping for corporate gifts?",
      "answer": "Yes, we offer international shipping services for corporate gifts. We have experience in shipping to various countries and can ensure your gifts reach their destination promptly and in excellent condition. Please note that shipping costs and delivery times may vary based on the destination country.</br>For more information or specific inquiries about our corporate gifting services, please visit our corporate gifting page or reach out to our dedicated customer support team. We are here to assist you in making your corporate gifting experience exceptional.",
    }
  ];

}
