import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CareerService } from "@app-company-services";
import { AppURL } from 'src/app/app-url';
import { META_DATA } from 'src/app/shared/constants/metadata';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../../page/page.service';

@Component({
    selector: 'app-career-questions-form',
    templateUrl: './career-questions-form.component.html',
    styleUrl: './career-questions-form.component.css',
    standalone: false
})
export class CareerQuestionsFormComponent {

  app_svg_icon_list = APP_SVG_ICON_LIST;
  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['career'];
  page: string = 'career'

  careerQuestions: any;
  slug: string = '';
  uuid: string = '';

  form!: FormGroup;

  formSubmit = false;
  formMessage = null;

  error: boolean = false;
  errorMsg: any;

  constructor(
    private careerService: CareerService,
    private pageService: PageService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.setMetaData();

    this.form = this.fb.group({
      answers: this.fb.array([])
    });

    this.route.params.subscribe((x) => {
      this.slug = x['slug'];
      this.uuid = x['uuid'];

      this.getCareerQuestions();
    });


  }


  getCareerQuestions() {

    this.careerService.getCareerQuestions(this.uuid).subscribe(result => {
      if (result.status == true) {
        this.careerQuestions = result.data;

        const control = this.form.get('answers') as FormArray;

        this.careerQuestions.forEach((q: any) => {

          control.push(
            this.fb.group({
              question_id: [q.id],
              question: [q.question],
              expected_answer: [q.expected_answer],
              answer: ['', q.is_required ? Validators.required : []]
            })
          );

        });
      }
    })
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let serviceData: any = [];
    serviceData['formData'] = { uuid: this.uuid, answers: this.form.value.answers };

    this.careerService.createQuestionAnswers(serviceData).subscribe(result => {
      if (result.status == true) {
        // this.formMessage = result.message;
        this.formSubmit = true;
      }
      else {
        this.errorMsg = result.message;
        this.error = true;
      }
    });
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

}
