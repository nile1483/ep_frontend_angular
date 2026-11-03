import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';
import { CommonService } from '@app-shared-services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: false
})
export class FooterComponent implements OnInit {

  app_svg_icon_list = APP_SVG_ICON_LIST;
  footerData : any = [];
  footerDataObs!: Subscription;
  
  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef) {}
 
  ngOnInit(): void {
     
    this.footerData = this.commonService.footerData;
    this.footerDataObs = this.commonService.subFooterData.subscribe((result:any)=>{
      this.footerData = this.commonService.footerData;
      this.cdr.detectChanges();
    });
    

    if(this.footerData.length == 0){
      this.commonService.setFooterData();
    }
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    //this.footerDataObs.unsubscribe();
  }
}
