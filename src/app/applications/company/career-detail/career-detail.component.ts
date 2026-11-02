import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CareerService } from "@app-company-services";
import { AppURL } from 'src/app/app-url';
import { META_DATA } from 'src/app/shared/constants/metadata';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.css']
})
export class CareerDetailComponent implements OnInit {

  app_svg_icon_list = APP_SVG_ICON_LIST;
  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['career'];
  careerDetail: any = null;
  page: string = 'career'
  inquirySubmit = false;
  inquiryMessage = null;
  slug: string = '';

  //file upload
  validFile: boolean = true;
  error: boolean = false;
  errorMsg: any;
  selectFileName: any = null;
  selectFilePath: any = null;

  userInquiryForm: UntypedFormGroup = new UntypedFormGroup({
    inquiry_type: new UntypedFormControl(this.page, [Validators.required]),
    applyFor: new UntypedFormControl('', [Validators.required]),
    position_id: new UntypedFormControl('', [Validators.required]),
    name: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    contact: new UntypedFormControl('', [Validators.required]),
    city: new UntypedFormControl('', [Validators.required]),
    fileName: new UntypedFormControl('',),
    filePath: new UntypedFormControl('',),
  });

  constructor(
    private careerService: CareerService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.setMetaData();

    this.route.params.subscribe((x) => {
      this.slug = x['slug'];
      this.getCareerDetail();
    });
  }

  ngAfterViewInit(): void {
  }

  getCareerDetail() {
    this.careerService.getCareerDetail(this.slug).subscribe(result => {

      if (result.status == true) {
        this.careerDetail = result.data;
        this.userInquiryForm.controls['applyFor'].setValue(this.careerDetail.title);
        this.userInquiryForm.controls['position_id'].setValue(this.careerDetail.position_id);
      }
      else {
        this.careerDetail = null;
      }
    })
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}` + `/${this.page}`;
    //og data          
    metaInfo.og_url = `${this.webURL}` + `/${this.page}`;
    metaInfo.og_image = `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);


    //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Company', 'Company');
  }

  selectDesignation(applyFor: any) {
    this.userInquiryForm.get('applyFor')?.setValue(applyFor);
    this.scrollToForm();
  }

  inquiryFormSubmit() {

    this.userInquiryForm.value.fileName = this.selectFileName;
    this.userInquiryForm.value.filePath = this.selectFilePath;

    this.userInquiryForm.markAllAsTouched()

    if (this.userInquiryForm.value.fileName == null) {
      this.validFile = false;
      this.error = true;
      this.errorMsg = "Please select a file to upload...";
      return;
    }

    if (!this.userInquiryForm.valid) {
      return;
    }

    let serviceData: any = [];
    serviceData['formData'] = this.userInquiryForm.value;

    this.careerService.careerCreate(serviceData).subscribe(result => {

      if (result.status == true) {
        this.inquiryMessage = result.message;
        this.inquirySubmit = true;

        this.router.navigate([result.data.uuid, 'questions'], { relativeTo: this.route });
      }
    });

    this.scrollToForm();
  }

  scrollToForm() {

    const element: any = document.querySelector('#applynowform');
    element.scrollIntoView({ behavior: 'smooth' });
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
      serviceData['formData'] = fileDetail;

      this.careerService.careerFileUpload(serviceData).subscribe(result => {
        if (result.status == true) {
          this.selectFileName = result.data.file_name;
          this.selectFilePath = result.data.file_path;
        }
      });
    }
  }
}
