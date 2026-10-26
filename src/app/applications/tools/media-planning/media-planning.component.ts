import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MEDIA_ICON_LIST } from 'src/app/shared/constants/common';
import { MediaplanningService } from 'src/app/applications/tools/mediaplanning.service';
import { MetaInformation } from '@app-shared-model';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
@Component({
    selector: 'app-media-planning',
    templateUrl: './media-planning.component.html',
    styleUrls: ['./media-planning.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MediaPlanningComponent implements OnInit {

  
  mediaPlanForm: UntypedFormGroup = new UntypedFormGroup({
    category: new UntypedFormControl('', [Validators.required]),
    subcategory: new UntypedFormControl('', [Validators.required]),
    geography: new UntypedFormControl('', [Validators.required]),
    age: new UntypedFormControl('', [Validators.required]),
    gender: new UntypedFormControl('', [Validators.required]),
    budget: new UntypedFormControl('', [Validators.required])
  });
  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['mediaplanning'];
  mediaplanConfigs: any = {};
  mediaPlanData:any = [];
  filteredSubCategories: any = [];
  MEDIA_ICON_LIST = MEDIA_ICON_LIST
  constructor(
    private mediaplanningService: MediaplanningService,
    private scroller: ViewportScroller,
    private commonService: CommonService,
    
  ) { }

  ngOnInit(): void {
    this.setMetaData();
    this.getMediaplanConfigs(); 
  }

  mediaPlanFormSubmit() {
    this.mediaPlanForm.markAllAsTouched();
    if (this.mediaPlanForm.valid) {
      
      this.mediaplanningService.getMediaplanData(this.mediaPlanForm.value).subscribe(result => {
        this.scroller.scrollToAnchor("recommendation");
        
        
        if (result.status == true) {
          this.mediaPlanData = result.data;
          
        }
        else {
          this.mediaPlanData = [];
        }  
      })
    }
  }

  setSubCategory(category: string) {
    const result = this.mediaplanConfigs['subcategories'].filter((obj:any) => {
      return obj.parentName === category;
    });

    this.filteredSubCategories = result;
    this.mediaPlanForm.get('subcategory')?.setValue(''); 
  }

  selectValue(type: string, event: any) {
    
    let value = '';

    if (type == 'category') {
      value = (event.target.value.length > 0) ? event.target.value : '';
      if (value.length > 0) {
        this.setSubCategory(value);
      }
    }

     
  }

  getMediaplanConfigs() {
    this.mediaplanningService.getMediaplanConfigs().subscribe(result => {

      if (result.status == true) {
        this.mediaplanConfigs = result.data;
      }
      else {
        this.mediaplanConfigs = {};
      }

    })
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? ''; 
    metaInfo.meta_description = this.metaData?.meta_description ?? ''; 
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? ''; 
    metaInfo.canonical_url = `${this.webURL}`+ `tools/media-planning`;       
    this.commonService.setMetaData(metaInfo); 
 }

}
