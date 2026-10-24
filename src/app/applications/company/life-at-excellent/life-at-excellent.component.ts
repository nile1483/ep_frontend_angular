import { Component, OnInit } from '@angular/core';
import { TeamService } from '@app-company-services';
import { META_DATA } from '@app-shared-constants';
import { MetaInformation } from '@app-shared-model';
import { CommonService } from '@app-shared-services';
import { AppURL } from 'src/app/app-url';

@Component({
  selector: 'app-life-at-excellent',
  templateUrl: './life-at-excellent.component.html',
  styleUrls: ['./life-at-excellent.component.css']
})
export class LifeAtExcellentComponent implements OnInit {
  webURL: string = AppURL.webURL;
  page: string = 'life-at-excellent';
  metaData: any = META_DATA[this.page];
  teamAlbum: any[] = []; 
  selectedAlbum:any;
  constructor(  
                private teamService: TeamService,
                private commonService: CommonService,
                ) { }

  ngOnInit(): void {
    this.setMetaData();
    this.getTeamAlbum();
    } 
    
    getTeamAlbum() {
      this.teamService.getTeamAlbum().subscribe((result:any) => {
        if (result.status == true) {
          this.teamAlbum =  Object.values(result.data);
        }
      })
    }

    setSelected(album :any){
      this.selectedAlbum = album;
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
