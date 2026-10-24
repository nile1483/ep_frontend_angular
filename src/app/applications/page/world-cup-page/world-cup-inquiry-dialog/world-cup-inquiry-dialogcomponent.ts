import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app-shared-services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from '@app-shared-services';
import { CommonService } from '@app-shared-services';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
import { PageService } from '../../page.service';

export function isPersonalEmailValidatorWorldCup(control: UntypedFormControl): ValidationErrors | null {

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
  selector: 'app-world-cup-inquiry-dialog',
  templateUrl: './world-cup-inquiry-dialog.component.html',
  styleUrls: ['./world-cup-inquiry-dialog.component.css']
})


export class WorldCupInquiryDialogComponent implements OnInit {

  app_svg_icon_list = APP_SVG_ICON_LIST;
  selectedCountry: any = { "name": "India", "dialCode": "+91", "code": "IN" };
  countryList: any = [];
  countryFilteredList: any = [];

  inquiryType : string = 'worldcup';
  media : string = 'worldcup';
  userInquiryForm !: UntypedFormGroup;
  href: any = "";


  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private pageService: PageService,
    private router: Router,
    private loaderService: LoaderService,
    public dialogRef: MatDialogRef<WorldCupInquiryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.href = this.router.url;
  }

  ngOnInit(): void {
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
      url: new UntypedFormControl(this.href, [Validators.required]),
      inquiry_type: new UntypedFormControl(this.inquiryType, [Validators.required]),
      media: new UntypedFormControl(this.media),
      name: new UntypedFormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidatorWorldCup]),
      contact: new UntypedFormControl('', [Validators.required]),
      company: new UntypedFormControl('', [Validators.required, Validators.maxLength(50)]),
      comment: new UntypedFormControl('', [Validators.required])
    });
  }

  onSearchChange(value: string) {
    this.countryFilteredList = this.countryList.filter((item: any) => (item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) || (item.dialCode.toLowerCase().indexOf(value.toLowerCase()) !== -1));
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
  }

  userInquiryFormSubmit() {

    this.userInquiryForm.markAllAsTouched();

    if (this.userInquiryForm.valid) {
      const userInquiryData = this.userInquiryForm.value;
      userInquiryData.country = this.selectedCountry;

      let serviceData: any = [];
      serviceData['inquiryType'] = this.inquiryType;
      serviceData['formData'] = userInquiryData;

      this.loaderService.open();
      this.pageService.inquiryOtherServicesCreate(serviceData).subscribe(response => {
        this.loaderService.close();
        if (response.status === true) {
          this.commonService.openSnackBar(response.message);
          this.dialogRef.close(true);
        }
      });
    }
  }

  dialogClose() {
    this.dialogRef.close(true);
  }

}
