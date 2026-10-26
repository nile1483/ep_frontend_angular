import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, CookieService, UserService } from '@app-shared-services';
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
import { PageService } from '../../page.service';
import { CORPORATE_META_DATA } from '@app-shared-constants';
import { MetaInformation } from '@app-shared-model';
import { AppURL } from 'src/app/app-url';

@Component({
    selector: 'app-corporate-gifting-detail',
    templateUrl: './corporate-gifting-detail.component.html',
    styleUrls: ['./corporate-gifting-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CorporateGiftingDetailComponent implements OnInit {

  downloadType: string = '';
  metaData: any = CORPORATE_META_DATA['corporategifting'];
  webURL: string = AppURL.webURL;
  
  downloadLinkBase: string = 'https://asset.apiexcellent.com/app/public/images/medias/corporategifting/download/';

  isRegisteredGift: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public cookieService: CookieService,
    public commonService: CommonService
  ) {
    this.getCookie();
  }

  ngOnInit(): void {
    this.route.params.subscribe((x) => {
      this.downloadType = x['downloadType'] || '';

      this.metaData = CORPORATE_META_DATA[this.downloadType]
      this.setMetaData();
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


  handleGiftClick(event: Event, pdfLink: string) {
    event.preventDefault();

    const downloadLink = `${this.downloadLinkBase}/${pdfLink}`;

    if (!this.isRegisteredGift) {
      this.openCatalogDownloadDialog(downloadLink);
    } else {
      window.open(downloadLink, '_blank');
    }
  }

  setCookie() {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + 30 * 60 * 1000);
    this.cookieService.set('isRegisteredGift', 'true', expirationDate, '/');
    this.getCookie();
  }

  getCookie() {
    let getCookie: unknown = this.cookieService.get('isRegisteredGift');
    this.isRegisteredGift = (getCookie == "true") ? true : false;
  }


  openCatalogDownloadDialog(downloadLink: any): void {

    const dialogRef = this.dialog.open(CatalogDownloadInquiryDialog, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setCookie();
        window.open(downloadLink, '_blank');
      }
    });
  }

}



@Component({
    selector: 'catalog-download-inquiry-dialog',
    templateUrl: 'catalog-download-inquiry-dialog.html',
    styles: ['.mat-mdc-dialog-actions { padding-top: 0px !important; }'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class CatalogDownloadInquiryDialog {

  selectedCountry: any = { "name": "India", "dialCode": "+91", "code": "IN" };
  countryList: any = [];
  countryFilteredList: any = [];

  constructor(
    private userService: UserService,
    private pageService: PageService,
    public dialogRef: MatDialogRef<CatalogDownloadInquiryDialog>,
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
  
  downloadInquiryForm = new UntypedFormGroup({
    inquiryType: new UntypedFormControl('catalogdownload', [Validators.required]),
    inquiryPage: new UntypedFormControl('excellentbasket', [Validators.required]),
    company: new UntypedFormControl('', [Validators.required, Validators.maxLength(50)]),
    name: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidatorDownload]),
    contact: new UntypedFormControl('', [Validators.required]),
  });


  downloadInquiryFormSubmit() {

    this.downloadInquiryForm.markAllAsTouched();
    if (!this.downloadInquiryForm.valid) {
      return;
    }

    let formData = this.downloadInquiryForm.value;
    formData.country = this.selectedCountry;

    let serviceData: any = [];
    serviceData['formData'] = formData;

    this.pageService.catalogDownloadGiftingCreate(serviceData).subscribe(result => {
      if (result.status == true) {
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
