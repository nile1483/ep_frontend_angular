import { Component, OnInit } from '@angular/core';
import { TeamService } from "@app-company-services";
import { META_DATA } from 'src/app/shared/constants/metadata';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { AppURL } from 'src/app/app-url';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  webURL: string = AppURL.webURL;
  page: string = 'team';
  metaData: any = META_DATA['team'];
  teamExcellentList: any; 

  constructor(
    private teamService: TeamService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.setMetaData();
    this.teamService.getTeamExcellentList().subscribe((result: any) => {
      if (result.status == true) {
        this.teamExcellentList = result.data;
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

}
