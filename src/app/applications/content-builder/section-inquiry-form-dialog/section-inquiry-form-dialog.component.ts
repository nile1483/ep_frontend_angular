import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, UserService } from '@app-shared-services';
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
import { PageService } from '../../page/page.service';

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

@Component({
    selector: 'section-inquiry-form-dialog',
    templateUrl: './section-inquiry-form-dialog.component.html',
    styleUrl: './section-inquiry-form-dialog.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SectionInquiryFormDialogComponent {

  selectedCountry: any = { "name": "India", "dialCode": "+91", "code": "IN" };
  countryList: any = [];
  countryFilteredList: any = [];
  userInquiryForm!: UntypedFormGroup;
  
  constructor(
    private router: Router,
    private userService: UserService,
    private pageService: PageService,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<SectionInquiryFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.getCountryCodeData();
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

  onSearchChange(value: string) {
    this.countryFilteredList = this.countryList.filter((item: any) => (item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) || (item.dialCode.toLowerCase().indexOf(value.toLowerCase()) !== -1));
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
  }

  createForm() {
    this.userInquiryForm = new UntypedFormGroup({
      inquiry_type: new UntypedFormControl('contact', [Validators.required]),
      url: new UntypedFormControl(this.data, [Validators.required]),
      company: new UntypedFormControl('', [Validators.required, Validators.maxLength(50)]),
      name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidatorDownload]),
      contact: new UntypedFormControl('', [Validators.required]),
    });
  }


  inquiryFormSubmit() {

    this.userInquiryForm.markAllAsTouched();
    if (!this.userInquiryForm.valid) {
      return;
    }

    let formData = this.userInquiryForm.value;
    formData.country = this.selectedCountry;

    let serviceData: any = [];
    serviceData['formData'] = formData;
    
    this.pageService.inquiryContactCreate(serviceData).subscribe(result => {
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


