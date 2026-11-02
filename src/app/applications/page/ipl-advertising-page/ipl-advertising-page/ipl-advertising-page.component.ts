import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { C2A_TITLE_DATA } from '@app-shared-constants';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { IPLAdvertisingPageInquiryDialogComponent } from '../ipl-advertising-page-inquiry-dialog/ipl-advertising-page-inquiry-dialogcomponent';
import { MatDialog } from '@angular/material/dialog';
import { PageService } from '../../page.service';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ipl-advertising-page',
  templateUrl: './ipl-advertising-page.component.html',
  styleUrls: ['./ipl-advertising-page.component.css']
})
export class IPLAdvertisingPageComponent implements OnInit, AfterViewInit {

  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['ipl-advertising'];
  media: string = 'iplmarketing';
  callToActionData: CallToAction = { title: C2A_TITLE_DATA[this.media], inquiryUser: {} };

  constructor(
    private router: Router,
    private commonService: CommonService,
    public dialog: MatDialog,
    private pageService: PageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.setMetaData();
    this.getIplPageData();

    // this.animateCount1(3.83, 2000);
    // this.animateCount2(495, 2000);
    // this.animateCount3(3.83, 2000);
    // this.animateCount4(438, 2000);
  }

  getIplPageData() {
    this.pageService.getIplPageData().subscribe(result => {
      if (result.status == true) {
        this.callToActionData.inquiryUser = result.data?.inquiryUser;
      }
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

    this.commonService.gtmPageEvents('Company', 'IPL Advertising Page');
  }


  openFormDialog(): void {

    if (this.dialog.openDialogs.length > 0) {
      return; // already open che
    }

    const dialogRef = this.dialog.open(IPLAdvertisingPageInquiryDialogComponent, {
      width: '700px',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      sessionStorage.removeItem('iplDialogShown');
    });
  }

  @ViewChild('iplSection', { static: false })
  iplSection!: ElementRef;

  count1 = 0;
  count2 = 0;
  count3 = 0;
  count4 = 0;

  hasAnimated = false;

  ngAfterViewInit(): void {

    if (isPlatformBrowser(this.platformId)) {

      // 🔥 Dialog Control
      if (!sessionStorage.getItem('iplDialogShown')) {

        setTimeout(() => {
          this.openFormDialog();
          sessionStorage.setItem('iplDialogShown', 'true');
        }, 5000);

      }

      // 🔥 Intersection Observer
      if (this.iplSection) {

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {

            if (entry.isIntersecting && !this.hasAnimated) {
              this.hasAnimated = true;
              this.startAllCounts();
              observer.disconnect();
            }

          });
        }, { threshold: 0.4 });

        observer.observe(this.iplSection.nativeElement);
      }

    }

  }

  startAllCounts() {
    this.animateCount('count1', 3.83, 2000);
    this.animateCount('count2', 495, 2000);
    this.animateCount('count3', 3.83, 2000);
    this.animateCount('count4', 438, 2000);
  }

  animateCount(property: string, target: number, duration: number) {

    const stepTime = 10;
    const steps = duration / stepTime;
    const increment = target / steps;

    const interval = setInterval(() => {
      (this as any)[property] += increment;

      if ((this as any)[property] >= target) {
        (this as any)[property] = target;
        clearInterval(interval);
      }

    }, stepTime);
  }


  matches = [
    {
      match_no: "MATCH-1",
      title_background: "#9e1818",
      card_background: "#33304d",
      date: "28 Mar 2026, Sat",
      time: "7:30 pm IST",
      team1: "RCB",
      team1_logo: "/assets/page/ipl/team-logo/rcb.png",
      team2: "SRH",
      team2_logo: "/assets/page/ipl/team-logo/srh.png",
      stadium: "M Chinnaswamy Stadium, Bengaluru"
    },
    {
      match_no: "MATCH-2",
      title_background: "#a39b31",
      card_background: "#441e49",
      date: "29 Mar 2026, Sun",
      time: "7:30 pm IST",
      team1: "MI",
      team1_logo: "/assets/page/ipl/team-logo/mi.png",
      team2: "KKR",
      team2_logo: "/assets/page/ipl/team-logo/kkr.png",
      stadium: "Wankhede Stadium, Mumbai"
    },
    {
      match_no: "MATCH-3",
      title_background: "#237032",
      card_background: "#203e60",
      date: "30 Mar 2026, Mon",
      time: "7:30 pm IST",
      team1: "RR",
      team1_logo: "/assets/page/ipl/team-logo/rr.png",
      team2: "CSK",
      team2_logo: "/assets/page/ipl/team-logo/csk.png",
      stadium: "ACA Stadium, Guwahati"
    },
    {
      match_no: "MATCH-4",
      title_background: "#e26447",
      card_background: "#750000",
      date: "31 Mar 2026, Tue",
      time: "7:30 pm IST",
      team1: "PBKS",
      team1_logo: "/assets/page/ipl/team-logo/pbk.png",
      team2: "GT",
      team2_logo: "/assets/page/ipl/team-logo/gt.png",
      stadium: "PCA Stadium, New Chandigarh"
    },
    {
      match_no: "MATCH-5",
      title_background: "#936d0f",
      card_background: "#0a4256",
      date: "01 April 2026, Wed",
      time: "7:30 pm IST",
      team1: "LSG",
      team1_logo: "/assets/page/ipl/team-logo/lsg.png",
      team2: "DC",
      team2_logo: "/assets/page/ipl/team-logo/dc.png",
      stadium: "BRSABV Ekana Cricket Stadium, Lucknow"
    },
    {
      match_no: "MATCH-6",
      title_background: "#1b8c7c",
      card_background: "#382d63",
      date: "02 April 2026, Thu",
      time: "7:30 pm IST",
      team1: "KKR",
      team1_logo: "/assets/page/ipl/team-logo/kkr.png",
      team2: "SRH",
      team2_logo: "/assets/page/ipl/team-logo/srh.png",
      stadium: "Eden Gardens, Kolkata"
    },
    {
      match_no: "MATCH-7",
      title_background: "#237032",
      card_background: "#203e60",
      date: "03 April 2026, Fri",
      time: "7:30 pm IST",
      team1: "CSK",
      team1_logo: "/assets/page/ipl/team-logo/csk.png",
      team2: "PBKS",
      team2_logo: "/assets/page/ipl/team-logo/pbk.png",
      stadium: "MA Chidambaram Stadium, Chennai"
    },
    {
      match_no: "MATCH-8",
      title_background: "#af2e5d",
      card_background: "#633513",
      date: "04 April 2026, Sat",
      time: "3:30 pm IST",
      team1: "DC",
      team1_logo: "/assets/page/ipl/team-logo/dc.png",
      team2: "MI",
      team2_logo: "/assets/page/ipl/team-logo/mi.png",
      stadium: "Arun Jaitley Stadium, Delhi"
    },
    {
      match_no: "MATCH-9",
      title_background: "#a8823f",
      card_background: "#492039",
      date: "04 April 2026, Sat",
      time: "7:30 pm IST",
      team1: "GT",
      team1_logo: "/assets/page/ipl/team-logo/gt.png",
      team2: "RR",
      team2_logo: "/assets/page/ipl/team-logo/rr.png",
      stadium: "Narendra Modi Stadium, Ahmedabad"
    },
    {
      match_no: "MATCH-10",
      title_background: "#9e1818",
      card_background: "#33304d",
      date: "05 April 2026, Sun",
      time: "3:30 pm IST",
      team1: "SRH",
      team1_logo: "/assets/page/ipl/team-logo/srh.png",
      team2: "LSG",
      team2_logo: "/assets/page/ipl/team-logo/lsg.png",
      stadium: "Rajiv Gandhi International Stadium, Hyderabad"
    },
    {
      match_no: "MATCH-11",
      title_background: "#a39b31",
      card_background: "#441e49",
      date: "05 April 2026, Sun",
      time: "7:30 pm IST",
      team1: "RCB",
      team1_logo: "/assets/page/ipl/team-logo/rcb.png",
      team2: "CSK",
      team2_logo: "/assets/page/ipl/team-logo/csk.png",
      stadium: "M Chinnaswamy Stadium, Bengaluru"
    },
    {
      match_no: "MATCH-12",
      title_background: "#af2e5d",
      card_background: "#203e60",
      date: "06 April 2026, Mon",
      time: "7:30 pm IST",
      team1: "KKR",
      team1_logo: "/assets/page/ipl/team-logo/kkr.png",
      team2: "PBKS",
      team2_logo: "/assets/page/ipl/team-logo/pbk.png",
      stadium: "Eden Gardens, Kolkata"
    },
    {
      match_no: "MATCH-13",
      title_background: "#e26447",
      card_background: "#750000",
      date: "07 April 2026, Tue",
      time: "7:30 pm IST",
      team1: "RR",
      team1_logo: "/assets/page/ipl/team-logo/rr.png",
      team2: "MI",
      team2_logo: "/assets/page/ipl/team-logo/mi.png",
      stadium: "ACA Stadium, Guwahati"
    },
    {
      match_no: "MATCH-14",
      title_background: "#936d0f",
      card_background: "#0a4246",
      date: "08 April 2026, Wed",
      time: "7:30 pm IST",
      team1: "DC",
      team1_logo: "/assets/page/ipl/team-logo/dc.png",
      team2: "GT",
      team2_logo: "/assets/page/ipl/team-logo/gt.png",
      stadium: "Arun Jaitley Stadium, Delhi"
    },
    {
      match_no: "MATCH-15",
      title_background: "#ab8c7c",
      card_background: "#382d63",
      date: "09 April 2026, Thu",
      time: "7:30 pm IST",
      team1: "KKR",
      team1_logo: "/assets/page/ipl/team-logo/kkr.png",
      team2: "LSG",
      team2_logo: "/assets/page/ipl/team-logo/lsg.png",
      stadium: "Eden Gardens, Kolkata"
    },
    {
      match_no: "MATCH-16",
      title_background: "#237032",
      card_background: "#203e60",
      date: "10 April 2026, Fri",
      time: "7:30 pm IST",
      team1: "RR",
      team1_logo: "/assets/page/ipl/team-logo/rr.png",
      team2: "RCB",
      team2_logo: "/assets/page/ipl/team-logo/rcb.png",
      stadium: "ACA Stadium, Guwahati"
    },
    {
      match_no: "MATCH-17",
      title_background: "#af2e5d",
      card_background: "#633513",
      date: "11 April 2026, Sat",
      time: "3:30 pm IST",
      team1: "PBKS",
      team1_logo: "/assets/page/ipl/team-logo/pbk.png",
      team2: "SRH",
      team2_logo: "/assets/page/ipl/team-logo/srh.png",
      stadium: "PCA Stadium, New Chandigarh"
    },
    {
      match_no: "MATCH-18",
      title_background: "#a8823f",
      card_background: "#492039",
      date: "11 April 2026, Sat",
      time: "7:30 pm IST",
      team1: "CSK",
      team1_logo: "/assets/page/ipl/team-logo/csk.png",
      team2: "DC",
      team2_logo: "/assets/page/ipl/team-logo/dc.png",
      stadium: "MA Chidambaram Stadium, Chennai"
    },
    {
      match_no: "MATCH-19",
      title_background: "#9e1818",
      card_background: "#33304d",
      date: "12 April 2026, Sun",
      time: "3:30 pm IST",
      team1: "LSG",
      team1_logo: "/assets/page/ipl/team-logo/lsg.png",
      team2: "GT",
      team2_logo: "/assets/page/ipl/team-logo/gt.png",
      stadium: "BRSABV Ekana Cricket Stadium, Lucknow"
    },
    {
      match_no: "MATCH-20",
      title_background: "#a39b31",
      card_background: "#441e49",
      date: "12 April 2026, Sun",
      time: "7:30 pm IST",
      team1: "MI",
      team1_logo: "/assets/page/ipl/team-logo/mi.png",
      team2: "RCB",
      team2_logo: "/assets/page/ipl/team-logo/rcb.png",
      stadium: "Wankhede Stadium, Mumbai"
    },



    {
      match_no: "MATCH-34",
      title_background: "#9e1818",
      card_background: "#33304d",
      date: "24 April 2026, Fri",
      time: "7:30 pm IST",
      team1: "RCB",
      team1_logo: "/assets/page/ipl/team-logo/rcb.png",
      team2: "GT",
      team2_logo: "/assets/page/ipl/team-logo/gt.png",
      stadium: "M Chinnaswamy Stadium, Bengaluru"
    },
    {
      match_no: "MATCH-35",
      title_background: "#a39b31",
      card_background: "#441e49",
      date: "25 April 2026, Sat",
      time: "3:30 pm IST",
      team1: "DC",
      team1_logo: "/assets/page/ipl/team-logo/dc.png",
      team2: "PBKS",
      team2_logo: "/assets/page/ipl/team-logo/pbk.png",
      stadium: "Arun Jaitley Stadium, Delhi"
    },
    {
      match_no: "MATCH-36",
      title_background: "#237032",
      card_background: "#203e60",
      date: "25 April 2026, Sat",
      time: "7:30 pm IST",
      team1: "RR",
      team1_logo: "/assets/page/ipl/team-logo/rr.png",
      team2: "SRH",
      team2_logo: "/assets/page/ipl/team-logo/srh.png",
      stadium: "Sawai Mansingh Stadium, Jaipur"
    },
    {
      match_no: "MATCH-37",
      title_background: "#e26447",
      card_background: "#750000",
      date: "26 April 2026, Sun",
      time: "3:30 pm IST",
      team1: "CSK",
      team1_logo: "/assets/page/ipl/team-logo/csk.png",
      team2: "GT",
      team2_logo: "/assets/page/ipl/team-logo/gt.png",
      stadium: "MA Chidambaram Stadium, Chennai"
    },
    {
      match_no: "MATCH-38",
      title_background: "#936d0f",
      card_background: "#0a4256",
      date: "26 April 2026, Sun",
      time: "7:30 pm IST",
      team1: "LSG",
      team1_logo: "/assets/page/ipl/team-logo/lsg.png",
      team2: "KKR",
      team2_logo: "/assets/page/ipl/team-logo/kkr.png",
      stadium: "BRSABV Ekana Cricket Stadium, Lucknow"
    },
    {
      match_no: "MATCH-39",
      title_background: "#1b8c7c",
      card_background: "#382d63",
      date: "27 April 2026, Mon",
      time: "7:30 pm IST",
      team1: "DC",
      team1_logo: "/assets/page/ipl/team-logo/dc.png",
      team2: "RCB",
      team2_logo: "/assets/page/ipl/team-logo/rcb.png",
      stadium: "Arun Jaitley Stadium, Delhi"
    },
    {
      match_no: "MATCH-40",
      title_background: "#237032",
      card_background: "#203e60",
      date: "28 April 2026, Tue",
      time: "7:30 pm IST",
      team1: "PBKS",
      team1_logo: "/assets/page/ipl/team-logo/pbk.png",
      team2: "RR",
      team2_logo: "/assets/page/ipl/team-logo/rr.png",
      stadium: "New International Cricket Stadium, New Chandigarh"
    },
    {
      match_no: "MATCH-41",
      title_background: "#af2e5d",
      card_background: "#633513",
      date: "29 April 2026, Wed",
      time: "7:30 pm IST",
      team1: "MI",
      team1_logo: "/assets/page/ipl/team-logo/mi.png",
      team2: "SRH",
      team2_logo: "/assets/page/ipl/team-logo/srh.png",
      stadium: "Wankhede Stadium, Mumbai"
    },
    {
      match_no: "MATCH-42",
      title_background: "#a8823f",
      card_background: "#492039",
      date: "30 April 2026, Thu",
      time: "7:30 pm IST",
      team1: "GT",
      team1_logo: "/assets/page/ipl/team-logo/gt.png",
      team2: "RCB",
      team2_logo: "/assets/page/ipl/team-logo/rcb.png",
      stadium: "Narendra Modi Stadium, Ahmedabad"
    },


    {
      match_no: "MATCH-43",
      title_background: "#9e1818",
      card_background: "#33304d",
      date: "01 May 2026, Fri",
      time: "7:30 pm IST",
      team1: "RR",
      team1_logo: "/assets/page/ipl/team-logo/rr.png",
      team2: "DC",
      team2_logo: "/assets/page/ipl/team-logo/dc.png",
      stadium: "Sawai Mansingh Stadium, Jaipur"
    },
    {
      match_no: "MATCH-44",
      title_background: "#a39b31",
      card_background: "#441e49",
      date: "02 May 2026, Sat",
      time: "7:30 pm IST",
      team1: "CSK",
      team1_logo: "/assets/page/ipl/team-logo/csk.png",
      team2: "MI",
      team2_logo: "/assets/page/ipl/team-logo/mi.png",
      stadium: "MA Chidambaram Stadium, Chennai"
    },
    {
      match_no: "MATCH-45",
      title_background: "#af2e5d",
      card_background: "#203e60",
      date: "03 May 2026, Sun",
      time: "3:30 pm IST",
      team1: "SRH",
      team1_logo: "/assets/page/ipl/team-logo/srh.png",
      team2: "KKR",
      team2_logo: "/assets/page/ipl/team-logo/kkr.png",
      stadium: "Rajiv Gandhi International Stadium, Hyderabad"
    },
    {
      match_no: "MATCH-46",
      title_background: "#e26447",
      card_background: "#750000",
      date: "03 May 2026, Sun",
      time: "7:30 pm IST",
      team1: "GT",
      team1_logo: "/assets/page/ipl/team-logo/gt.png",
      team2: "PBKS",
      team2_logo: "/assets/page/ipl/team-logo/pbk.png",
      stadium: "Narendra Modi Stadium, Ahmedabad"
    },
    {
      match_no: "MATCH-47",
      title_background: "#936d0f",
      card_background: "#0a4256",
      date: "04 May 2026, Mon",
      time: "7:30 pm IST",
      team1: "MI",
      team1_logo: "/assets/page/ipl/team-logo/mi.png",
      team2: "LSG",
      team2_logo: "/assets/page/ipl/team-logo/lsg.png",
      stadium: "Wankhede Stadium, Mumbai"
    },
    {
      match_no: "MATCH-48",
      title_background: "#1b8c7c",
      card_background: "#382d63",
      date: "05 May 2026, Tue",
      time: "7:30 pm IST",
      team1: "DC",
      team1_logo: "/assets/page/ipl/team-logo/dc.png",
      team2: "CSK",
      team2_logo: "/assets/page/ipl/team-logo/csk.png",
      stadium: "Arun Jaitley Stadium, Delhi"
    },
    {
      match_no: "MATCH-49",
      title_background: "#237032",
      card_background: "#203e60",
      date: "06 May 2026, Wed",
      time: "7:30 pm IST",
      team1: "SRH",
      team1_logo: "/assets/page/ipl/team-logo/srh.png",
      team2: "PBKS",
      team2_logo: "/assets/page/ipl/team-logo/pbk.png",
      stadium: "Rajiv Gandhi International Stadium, Hyderabad"
    },
    {
      match_no: "MATCH-50",
      title_background: "#af2e5d",
      card_background: "#633513",
      date: "07 May 2026, Thu",
      time: "7:30 pm IST",
      team1: "LSG",
      team1_logo: "/assets/page/ipl/team-logo/lsg.png",
      team2: "RCB",
      team2_logo: "/assets/page/ipl/team-logo/rcb.png",
      stadium: "BRSABV Ekana Cricket Stadium, Lucknow"
    },
    {
      match_no: "MATCH-51",
      title_background: "#a8823f",
      card_background: "#492039",
      date: "08 May 2026, Fri",
      time: "7:30 pm IST",
      team1: "DC",
      team1_logo: "/assets/page/ipl/team-logo/dc.png",
      team2: "KKR",
      team2_logo: "/assets/page/ipl/team-logo/kkr.png",
      stadium: "Arun Jaitley Stadium, Delhi"
    },
    {
      match_no: "MATCH-52",
      title_background: "#9e1818",
      card_background: "#33304d",
      date: "09 May 2026, Sat",
      time: "7:30 pm IST",
      team1: "RR",
      team1_logo: "/assets/page/ipl/team-logo/rr.png",
      team2: "GT",
      team2_logo: "/assets/page/ipl/team-logo/gt.png",
      stadium: "Sawai Mansingh Stadium, Jaipur"
    },
    {
      match_no: "MATCH-53",
      title_background: "#a39b31",
      card_background: "#441e49",
      date: "10 May 2026, Sun",
      time: "3:30 pm IST",
      team1: "CSK",
      team1_logo: "/assets/page/ipl/team-logo/csk.png",
      team2: "LSG",
      team2_logo: "/assets/page/ipl/team-logo/lsg.png",
      stadium: "MA Chidambaram Stadium, Chennai"
    },
    {
      match_no: "MATCH-54",
      title_background: "#af2e5d",
      card_background: "#203e60",
      date: "10 May 2026, Sat",
      time: "7:30 pm IST",
      team1: "RCB",
      team1_logo: "/assets/page/ipl/team-logo/rcb.png",
      team2: "MI",
      team2_logo: "/assets/page/ipl/team-logo/mi.png",
      stadium: "SVNS International Cricket Stadium, Raipur"
    },
    {
      match_no: "MATCH-55",
      title_background: "#237032",
      card_background: "#633513",
      date: "11 May 2026, Mon",
      time: "7:30 pm IST",
      team1: "PBKS",
      team1_logo: "/assets/page/ipl/team-logo/pbk.png",
      team2: "DC",
      team2_logo: "/assets/page/ipl/team-logo/dc.png",
      stadium: "HPCA Stadium, Dharamshala"
    },


    {
      match_no: "MATCH-56",
      title_background: "#e26447",
      card_background: "#750000",
      date: "12 May 2026, Tue",
      time: "7:30 pm IST",
      team1: "GT",
      team1_logo: "/assets/page/ipl/team-logo/gt.png",
      team2: "SRH",
      team2_logo: "/assets/page/ipl/team-logo/srh.png",
      stadium: "Narendra Modi Stadium, Ahmedabad"
    },
    {
      match_no: "MATCH-57",
      title_background: "#1b8c7c",
      card_background: "#382d63",
      date: "13 May 2026, Wed",
      time: "7:30 pm IST",
      team1: "RCB",
      team1_logo: "/assets/page/ipl/team-logo/rcb.png",
      team2: "KKR",
      team2_logo: "/assets/page/ipl/team-logo/kkr.png",
      stadium: "SVNS International Cricket Stadium, Raipur"
    },
    {
      match_no: "MATCH-58",
      title_background: "#e26447",
      card_background: "#750000",
      date: "14 May 2026, Thu",
      time: "7:30 pm IST",
      team1: "PBKS",
      team1_logo: "/assets/page/ipl/team-logo/pbk.png",
      team2: "MI",
      team2_logo: "/assets/page/ipl/team-logo/mi.png",
      stadium: "HPCA Stadium, Dharamshala"
    },
    {
      match_no: "MATCH-59",
      title_background: "#936d0f",
      card_background: "#0a4256",
      date: "15 May 2026, Fri",
      time: "7:30 pm IST",
      team1: "LSG",
      team1_logo: "/assets/page/ipl/team-logo/lsg.png",
      team2: "CSK",
      team2_logo: "/assets/page/ipl/team-logo/csk.png",
      stadium: "BRSABV Ekana Cricket Stadium, Lucknow"
    },
    {
      match_no: "MATCH-60",
      title_background: "#9e1818",
      card_background: "#33304d",
      date: "16 May 2026, Sat",
      time: "7:30 pm IST",
      team1: "KKR",
      team1_logo: "/assets/page/ipl/team-logo/kkr.png",
      team2: "GT",
      team2_logo: "/assets/page/ipl/team-logo/gt.png",
      stadium: "Eden Gardens, Kolkata"
    },
    {
      match_no: "MATCH-61",
      title_background: "#a39b31",
      card_background: "#441e49",
      date: "17 May 2026, Sun",
      time: "3:30 pm IST",
      team1: "PBKS",
      team1_logo: "/assets/page/ipl/team-logo/pbk.png",
      team2: "RCB",
      team2_logo: "/assets/page/ipl/team-logo/rcb.png",
      stadium: "HPCA Stadium, Dharamshala"
    },
    {
      match_no: "MATCH-62",
      title_background: "#af2e5d",
      card_background: "#633513",
      date: "17 May 2026, Sun",
      time: "7:30 pm IST",
      team1: "DC",
      team1_logo: "/assets/page/ipl/team-logo/dc.png",
      team2: "RR",
      team2_logo: "/assets/page/ipl/team-logo/rr.png",
      stadium: "Arun Jaitley Stadium, Delhi"
    },
    {
      match_no: "MATCH-63",
      title_background: "#a8823f",
      card_background: "#492039",
      date: "18 May 2026, Mon",
      time: "7:30 pm IST",
      team1: "CSK",
      team1_logo: "/assets/page/ipl/team-logo/csk.png",
      team2: "SRH",
      team2_logo: "/assets/page/ipl/team-logo/srh.png",
      stadium: "MA Chidambaram Stadium, Chennai"
    },
    {
      match_no: "MATCH-64",
      title_background: "#e26447",
      card_background: "#750000",
      date: "19 May 2026, Tue",
      time: "7:30 pm IST",
      team1: "RR",
      team1_logo: "/assets/page/ipl/team-logo/rr.png",
      team2: "LSG",
      team2_logo: "/assets/page/ipl/team-logo/lsg.png",
      stadium: "Sawai Mansingh Stadium, Jaipur"
    },
    {
      match_no: "MATCH-65",
      title_background: "#936d0f",
      card_background: "#0a4256",
      date: "20 May 2026, Wed",
      time: "7:30 pm IST",
      team1: "KKR",
      team1_logo: "/assets/page/ipl/team-logo/kkr.png",
      team2: "MI",
      team2_logo: "/assets/page/ipl/team-logo/mi.png",
      stadium: "Eden Gardens, Kolkata"
    },
    {
      match_no: "MATCH-66",
      title_background: "#a39b31",
      card_background: "#441e49",
      date: "21 May 2026, Thu",
      time: "7:30 pm IST",
      team1: "GT",
      team1_logo: "/assets/page/ipl/team-logo/gt.png",
      team2: "CSK",
      team2_logo: "/assets/page/ipl/team-logo/csk.png",
      stadium: "Narendra Modi Stadium, Ahmedabad"
    },
    {
      match_no: "MATCH-67",
      title_background: "#237032",
      card_background: "#203e60",
      date: "22 May 2026, Fri",
      time: "7:30 pm IST",
      team1: "SRH",
      team1_logo: "/assets/page/ipl/team-logo/srh.png",
      team2: "RCB",
      team2_logo: "/assets/page/ipl/team-logo/rcb.png",
      stadium: "Rajiv Gandhi International Stadium, Hyderabad"
    },
    {
      match_no: "MATCH-68",
      title_background: "#af2e5d",
      card_background: "#633513",
      date: "23 May 2026, Sat",
      time: "7:30 pm IST",
      team1: "LSG",
      team1_logo: "/assets/page/ipl/team-logo/lsg.png",
      team2: "PBKS",
      team2_logo: "/assets/page/ipl/team-logo/pbk.png",
      stadium: "BRSABV Ekana Cricket Stadium, Lucknow"
    },
    {
      match_no: "MATCH-69",
      title_background: "#a8823f",
      card_background: "#492039",
      date: "24 May 2026, Sun",
      time: "3:30 pm IST",
      team1: "MI",
      team1_logo: "/assets/page/ipl/team-logo/mi.png",
      team2: "RR",
      team2_logo: "/assets/page/ipl/team-logo/rr.png",
      stadium: "Wankhede Stadium, Mumbai"
    },
    {
      match_no: "MATCH-70",
      title_background: "#e26447",
      card_background: "#750000",
      date: "24 May 2026, Sun",
      time: "7:30 pm IST",
      team1: "KKR",
      team1_logo: "/assets/page/ipl/team-logo/kkr.png",
      team2: "DC",
      team2_logo: "/assets/page/ipl/team-logo/dc.png",
      stadium: "Eden Gardens, Kolkata"
    },
  ];
}