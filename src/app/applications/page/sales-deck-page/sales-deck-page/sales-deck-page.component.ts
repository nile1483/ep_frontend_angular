import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CommonService } from '@app-shared-services';
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
import { PageService } from '../../../page/page.service';
import { Categories } from '../mock';

export function isPersonalEmailValidatorContact(control: UntypedFormControl): ValidationErrors | null {
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
  selector: 'app-sales-deck-page',
  templateUrl: './sales-deck-page.component.html',
  styleUrl: './sales-deck-page.component.css'
})
export class SalesDeckPageComponent {

  salesDeckForm!: UntypedFormGroup;
  inquirySubmit = false;
  inquiryMessage: any = null;

  categories = Categories;
  productGroups = [];

  constructor(
    private pageService: PageService,
    private commonService: CommonService,
  ) {
  }

  ngOnInit(): void {
    this.createForm();

    this.salesDeckForm.get('super_category')?.valueChanges.subscribe(value => {

      if (value) {
        // enable product group
        this.salesDeckForm.get('product_group')?.enable();
      } else {
        // disable + reset product group
        this.salesDeckForm.get('product_group')?.reset();
        this.salesDeckForm.get('product_group')?.disable();
      }

      const selected = this.categories.find(
        c => c.super_category === value
      );

      this.productGroups = selected ? selected.product_groups : [];

      // reset product group when super category changes
      this.salesDeckForm.get('product_group')?.reset();
    });

  }


  createForm() {
    this.salesDeckForm = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidatorContact]),
      brand_name: new UntypedFormControl('', [Validators.required, Validators.maxLength(35)]),
      budget: new UntypedFormControl('', [Validators.required]),
      super_category: new UntypedFormControl('', [Validators.required]),
      product_group: new UntypedFormControl({ value: '', disabled: true }, [Validators.required]),
      target_age: new UntypedFormControl('', [Validators.required]),
      target_gender: new UntypedFormControl('', [Validators.required]),
      primary_channel: new UntypedFormControl('', [Validators.required]),
      key_regions: new UntypedFormControl('', [Validators.required]),
      objective: new UntypedFormControl('', [Validators.required]),
      campaign_timeline: new UntypedFormControl('', [Validators.required]),
    });
  }


  inquiryFormSubmit() {

    this.salesDeckForm.markAllAsTouched();
    if (!this.salesDeckForm.valid) {
      return;
    }

    let serviceData: any = [];
    let formData = this.salesDeckForm.value;
    serviceData['formData'] = formData;

    this.pageService.salesDeckCreate(serviceData).subscribe(result => {
      if (result.status == true) {
        // this.inquiryMessage = result.message;
        this.inquiryMessage = "Thank you for your submission. Your sales pitch deck is currently in preparation and will be delivered to you via email once completed";
        this.inquirySubmit = true;
        this.commonService.gtmGenerateLeadEvents('Contact', result.id);

      }
    });
  }

}