import { Component, ElementRef, OnInit } from '@angular/core';
import { UserService } from '@app-shared-services';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { MatDialog } from '@angular/material/dialog';
import { PageService } from '../../page.service';
import { UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
import { Router } from '@angular/router';

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
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.css']
})
export class MediaPageComponent implements OnInit {

  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['mediapage'];

  selectedCountry: any = { "name": "India", "dialCode": "+91", "code": "IN" };
  countryList: any = [];
  countryFilteredList: any = [];

  userInquiryForm!: UntypedFormGroup;
  inquiryType: string = 'mediapage';
  media: string = 'mediapage';
  href: any = "";
  inquirySubmit = false;
  inquiryMessage = null;

  //file upload
  validFile: boolean = true;
  error: boolean = false;
  errorMsg: any;
  selectFileName: any = null;
  selectFilePath: any = null;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private pageService: PageService,
    private userService: UserService,
    public dialog: MatDialog,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.href = this.router.url;

    this.getCountryCodeData();
    this.setMetaData();
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

  private createForm() {
    this.userInquiryForm = new UntypedFormGroup({
      url: new UntypedFormControl(this.href, [Validators.required]),
      inquiry_type: new UntypedFormControl(this.inquiryType, [Validators.required]),
      media: new UntypedFormControl(this.media, [Validators.required]),
      name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidatoMediaPage]),
      contact: new UntypedFormControl('', [Validators.required]),
      city: new UntypedFormControl('', [Validators.required]),
      company: new UntypedFormControl('', [Validators.required]),
      comment: new UntypedFormControl('', [Validators.required]),
      fileName: new UntypedFormControl('',),
      filePath: new UntypedFormControl('',),
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

    this.commonService.gtmPageEvents('Company', 'Media Page');
  }


  onSearchChange(value: string) {
    this.countryFilteredList = this.countryList.filter((item: any) => (item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) || (item.dialCode.toLowerCase().indexOf(value.toLowerCase()) !== -1));
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
  }

  inquiryFormSubmit() {

    this.userInquiryForm.value.fileName = this.selectFileName;
    this.userInquiryForm.value.filePath = this.selectFilePath;

    this.userInquiryForm.markAllAsTouched();

    if (this.userInquiryForm.value.fileName == null) {
      this.validFile = false;
      this.error = true;
      this.errorMsg = "Please select a file to upload...";
      return;
    }

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

  fileUpload(event: any) {

    this.validFile = true;
    var files = event.target.files[0];

    if (files.size > 10485760) { //10485760 = 10 mb
      this.validFile = false;
      this.error = true;
      this.errorMsg = "Please select less then size 10 MB";
    }

    if (this.validateImage(files.name) == false) {
      this.validFile = false;
      this.error = true;
      this.errorMsg = "Please select docx, doc and pdf";
    }

    if (this.validFile == true) {
      this.error = false;
      this.errorMsg = "";

      let fileData = new FormData();
      fileData.append("file", files, files.name);
      this.fileSave(fileData);
    }
  }

  validateImage(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'docx' || ext.toLowerCase() == 'doc' || ext.toLowerCase() == 'pdf') {
      return true;
    }
    else {
      return false;
    }
  }

  fileSave(fileDetail: any) {

    if (this.validFile == true) {
      this.error = false;
      this.errorMsg = "";

      let serviceData: any = [];
      serviceData['inquiryType'] = this.inquiryType;
      serviceData['formData'] = fileDetail;

      this.pageService.mediaPageFileUpload(serviceData).subscribe(result => {
        if (result.status == true) {
          this.selectFileName = result.data.file_name;
          this.selectFilePath = result.data.file_path;
        }
      });
    }
  }


  scrollToElement() {
    const targetElement = this.elementRef.nativeElement.querySelector('#meetup');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}