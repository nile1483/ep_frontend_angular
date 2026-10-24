import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { HomeService } from '@app-shared-services';
import { SERVICE_LIST_WITH_SVG_ICON, APP_SVG_ICON_LIST, SVG_ICON_FOR_MEDIA } from '@app-shared-constants';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';

// import Swiper core and required components 
import SwiperCore, { SwiperOptions, Pagination, Autoplay } from 'swiper';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
// install Swiper components
SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  webURL: string = AppURL.webURL;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['home'];
  trendingMediaList: any[] = [];
  selectedCurrency: any;

  config: SwiperOptions = {
    slidesPerView: 'auto',
    // autoplay: true,
    autoplay: {
      delay: 2000, // Autoplay delay in milliseconds (2 seconds in this example)
      pauseOnMouseEnter: true,
      disableOnInteraction: false
    },
    speed: 2000,
    loop: true,
    spaceBetween: 10,
    navigation: { nextEl: '.tranding-next', prevEl: '.tranding-previous' },
    pagination: { el: '.tranding-pagination', clickable: true, dynamicBullets: true, dynamicMainBullets: 1 },
    breakpoints: {
      300: { slidesPerView: 1, spaceBetween: 20 }, // when window width is >= 480px
      576: { slidesPerView: 2, spaceBetween: 30 }, // when window width is >= 640px
      768: { slidesPerView: 3, spaceBetween: 40 }, // when window width is >= 640px
      992: { slidesPerView: 3, spaceBetween: 40 }, // when window width is >= 640px
      1200: { slidesPerView: 4, spaceBetween: 40 }
    },
  };

  constructor(private homeService: HomeService,
    private commonService: CommonService,
    public dialogNote: MatDialog
  ) { }

  ngOnInit(): void {
    //Currency
    this.selectedCurrency = this.commonService.getSelectedCurrency();
    this.commonService.getCurrency().subscribe(currency => {
      this.selectedCurrency = this.commonService.getSelectedCurrency();
    });

    this.setMetaData();
    this.getTrendingMediaList();

  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}`;
    //og data          
    metaInfo.og_url = `${this.webURL}`;
    metaInfo.og_image = `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);

    //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Company', 'Company');
  }

  getTrendingMediaList() {
    this.homeService.getTrendingMediaList().subscribe(result => {
      if (result.status == true) {
        this.trendingMediaList = result.data;
      }

    })
  }


  // clickHereToReadMoreDialog(): void {
  //   const dialogRef = this.dialogNote.open(HomePageNoteDialog, {
  //     width: '700px',
  //     data: {},
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //   });
  // }




  faqList = [
    {
      "question": "What is a media planning and buying agency?",
      "answer": "<strong>Media planning and buying agency in India</strong> involves selecting and acquiring ad placements that effectively reach your target audience on their preferred channels. A well-executed strategy in this area can empower brands and enhance customer relationships. There are many companies that offer <strong>media planning and buying services in India,</strong> but we assure you that Excellent Publicity is your best bet!",
    },
    {
      "question": "What is an advertising agency?",
      "answer": "An ad agency, also known as a <strong>creative agency,</strong> specializes in developing, organizing, and managing advertising campaigns and related marketing activities for clients. It can be an independent entity or an internal department that offers an external perspective on selling the client's offerings. The <strong>advertising firm</strong> may also handle broader marketing strategies and branding initiatives, encompassing promotions and sales. Excellent Publicity is one of the <strong>best advertising agencies</strong> across the globe. We are based in India and provide the best advertising solutions across the country.",
    },
    {
      "question": "Why should you advertise with Excellent Publicity?",
      "answer": "Excellent publicity - a <strong>digital advertising agency, </strong> the best advertising solutions at the best rates possible. It does not stop at providing the best pricing, we provide 360-degree advertising solutions, with a hand in corporate gifting as well. From <strong>digital advertising </strong> ooh advertising, we provide everything! We are divided in four verticals namely, Digital - Outdoor - Gifting and all these verticals work actively to provide everything that a brand requires.",
    },
    {
      "question": "Which is the best ad agency in India?",
      "answer": "Excellent Publicity is undoubtedly the best <strong>online ad agency</strong> in India. We are amongst the <strong>top advertising agencies in India</strong> and we provide 360- degree advertising solutions at the best price. You name it and we can do it, which is why we recognise ourselves as <strong> the most popular ad agency in India.</strong>",
    },
    {
      "question": "How can I stay updated with the latest news and trends in advertising?",
      "answer": "To remain well-informed about <strong>latest digital trends,</strong> it is advisable to explore the blogs and speeches of influential figures. Additionally, subscribing to relevant email newsletters, marketing podcasts, or premium business platforms can be highly beneficial.",
    },
    {
      "question": "Which types of advertising services does Excellent Publicity offer?",
      "answer": "Excellent Publicity offers a wide range of <strong>advertising services</strong> to cater to various needs. Some of the services we provide include print <strong> media advertising, outdoor advertising, radio advertising, digital marketing, </strong> event promotions. We aim to provide comprehensive solutions for effective brand communication and visibility. Excellent Publicity is the best <strong>advertising agency in India</strong> providing quality advertising solutions.",
    },
    {
      "question": "Can Excellent Publicity handle both online and offline advertising campaigns?",
      "answer": "Yes, Excellent Publicity is capable of handling both <strong>online and offline marketing</strong> and <strong>online and offline advertising</strong> campaigns. Excellent publicity as an <strong>advertising agency</strong> has expertise in various advertising channels and mediums, including digital marketing for online campaigns and print media, outdoor advertising, and event promotions for offline campaigns. Our comprehensive approach allows them to tailor strategies that suit the specific requirements of each client and effectively reach their target audience through multiple channels.",
    },
    {
      "question": "What sets Excellent Publicity apart from other advertising agencies?",
      "answer": "What sets Excellent Publicity apart from other <strong>marketing and advertising firms</strong> are its diverse range of <strong>advertising services</strong> encompassing both online and offline channels, allowing clients to benefit from comprehensive solutions. Our team of experienced professionals infuses creativity and expertise into every campaign, ensuring effective communication and impactful results. Excellent Publicity - <strong>the brand advertising agency,</strong> prioritizes understanding client objectives, tailoring strategies accordingly, and delivering measurable outcomes, providing a personalized approach. Our commitment to excellence, customer satisfaction, and continuous innovation establishes their unique position in the competitive advertising industry.",
    },
    {
      "buttonname": "Book Magazine Ad",
      "buttonlink": "https://www.excellentpublicity.com/magazine",
      "question": "Which is the Best Magazine Advertising Agency In India?",
      "answer": "Excellent Publicity has established itself as the premier <strong>magazine advertising agency in India</strong> due to several key factors. With a robust network and partnerships across diverse industries, we provide a wide range of magazine options to effectively reach varied target audiences. Our knowledgeable team of experts creates tailored and impactful campaigns, leveraging their expertise in the magazine advertising landscape. Furthermore, our commitment to exceptional <strong>advertising services</strong> and a track record of successful campaigns further cement their position as the <strong>top advertising agency in India. </strong>",
    },
    {
      "buttonname": "Book Television Ad",
      "buttonlink": "https://www.excellentpublicity.com/television",
      "question": "Which is the Best Television Advertising Agency In India?",
      "answer": "Excellent Publicity is recognized as one of the <strong>top advertising agencies in India.</strong> It is also popularly known as the best <strong>television advertising agency</strong> in India for several reasons. Firstly, we have a strong network and partnerships with leading television channels, allowing them to secure prime advertising slots for their clients. Secondly, our team has extensive experience in crafting compelling television advertisements that effectively capture the attention of the target audience. Lastly, we at Excellent Publicity ensure strategic planning, precise targeting, and optimal budget utilization, resulting in successful television campaigns that drive brand visibility and maximize ROI.",
    },
    {
      "buttonname": "Book Newspaper Ad",
      "buttonlink": "https://www.excellentpublicity.com/newspaper",
      "question": "Which is the Best Newspaper Advertising Agency In India?",
      "answer": "Excellent Publicity is considered to be one of the <strong>top newspaper advertising agencies</strong> in India due to several factors. Firstly, we have a vast network and strong relationships with leading newspapers across the country making Excellent Publicity the <strong>best newspaper ad agency.</strong> We ensure wide coverage and maximum reach. Secondly, our team of experts possesses in-depth knowledge of the newspaper industry, enabling them to craft effective advertising campaigns that resonate with the target audience. Additionally, Excellent Publicity offers competitive pricing, excellent customer service, and a track record of successful newspaper advertising campaigns, further solidifying their position as the top choice in the <strong>newspaper Ad agency in India.</strong> ",
    },
    {
      "buttonname": "Book Cinema Ad",
      "buttonlink": "https://www.excellentpublicity.com/cinema",
      "question": "Best Cinema Advertising Agency In India",
      "answer": "Excellent Publicity is regarded as the <strong>best cinema advertising agency in India</strong> for several reasons. Firstly, they have a vast network and strong relationships with cinemas across the country, allowing them to offer extensive coverage and reach. Secondly, their team understands the dynamics of cinema advertising, creating impactful campaigns that resonate with the audience. Lastly, Excellent Publicity provides comprehensive services, including creative ideation, strategic planning, and seamless execution, ensuring a seamless and successful cinema advertising experience for clients.",
    },
    {
      "buttonname": "Book Outdoor Ad",
      "buttonlink": "https://www.excellentpublicity.com/outdoor",
      "question": "Which is the best outdoor advertising agency in India?",
      "answer": "Excellent Publicity is recognized as the <strong>best outdoor advertising agency in India</strong> due to several reasons. Firstly, we have a wide network and extensive coverage in major cities, ensuring maximum visibility for <strong>outdoor advertising</strong> campaigns. Secondly, we offer innovative and creative outdoor advertising solutions that effectively capture the attention of the target audience. Lastly, our experience and expertise in outdoor advertising, coupled with their commitment to delivering successful campaigns, make them the preferred choice for clients looking for exceptional outdoor advertising services in India.",
    },
    {
      "buttonname": "Book Radio Ad",
      "buttonlink": "https://www.excellentpublicity.com/radio",
      "question": "Which Is The Best Radio Advertising Agency in India?",
      "answer": "Excellent Publicity has established itself as the best <strong>radio advertising agency in India </strong> several key factors. Firstly, we have extensive experience and expertise in crafting effective radio campaigns that resonate with the target audience. Secondly, we have a strong network and partnerships with various radio stations across the country, ensuring maximum reach and coverage. Lastly, our strategic approach, creative execution, and focus on delivering the best ,<strong>radio advertising services</strong> with measurable results have consistently garnered recognition and trust from clients, making us the preferred choice for radio advertising in India.",
    },
    {
      "buttonname": "Advertise at Airport",
      "buttonlink": "https://www.excellentpublicity.com/airport",
      "question": "Which is the best Airport Advertising Agency in India",
      "answer": "Excellent Publicity has earned the distinction of being the best <strong>airport advertising agency in India</strong> due to its exceptional expertise and track record in executing <strong>airport advertising services.</strong> We possess a deep understanding of airport environments, target demographics, and effective placement strategies. With our extensive network and innovative approach, Excellent Publicity delivers impactful <strong>airline advertising </strong> that reach a vast audience, making us the preferred choice for businesses seeking to maximize their brand exposure in airports across India."
    },
    {
      "buttonname": "Book Influencer Ad",
      "buttonlink": "https://www.excellentpublicity.com/influencer",
      "question": "Which is the best Influencer Advertising Agency in India?",
      "answer": "<p> Excellent Publicity is considered the best <strong>influencer marketing company in India </strong> to several reasons which are as follows:</p><ul> <li>Vast network of influential personalities across various industries for maximum impact.</li> <li>Successful track record of influencer campaigns generating significant brand awareness and engagement</li> <li>Expertise in influencer marketing, combined with strategic planning and creative execution.</li></ul>",
    },
    {
      "buttonname": "Book Mall Ad",
      "buttonlink": "https://www.excellentpublicity.com/mall",
      "question": "Which is the best mall branding and advertising agency In India?",
      "answer": "<p>Excellent Publicity is considered the best <strong>mall branding advertising agency in India </strong> the following reasons:</p> <ul> <li>Extensive experience and a successful track record in executing <strong>shopping mall advertising</strong></li> <li>Possess a deep understanding of the Indian market and consumer behavior.</li> <li>Develop targeted and effective strategies based on this understanding.</li> <li>Innovative and creative approach in their advertising solutions.</li> <li>Ability to deliver measurable results.</li> <li>Solid reputation as the top choice for <strong>advertising in malls</strong> in India. </li> </ul>",
    },
    {
      "buttonname": "Sports Marketing",
      "buttonlink": "https://www.excellentpublicity.com/sportsmarketing",
      "question": "Best Sports Branding And Marketing Agency In India",
      "answer": "<p>Excellent Publicity is considered to be one of <strong>the top sports marketing agencies in India</strong> due to several key factors :</p> <ul> <li>Deep understanding of the sports industry and its unique branding requirements.</li> <li>Team with extensive experience and expertise in creating compelling <strong>sports branding</strong> campaigns that resonate with the target audience</li> <li>Offer innovative and customized solutions, utilizing various advertising channels to maximize brand visibility and engagement in the sports sector.</li> <li>Proven track record of successful sports branding campaigns and a commitment to delivering exceptional results, establishing their reputation as the best sports branding advertising agency in India.</li> </ul> <p>Excellent Publicity is the best<strong> sports branding agency in India.</strong></p>",
    },

  ];



  showRepx = false;

  @HostListener('window:scroll', [])
  onScroll(): void {

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight <= 0) return;

    const scrollPercent = (scrollTop / docHeight) * 100;

    // ✅ Toggle behavior
    this.showRepx = scrollPercent > 15;
  }

}




@Component({
  selector: 'home-page-note-dialog',
  templateUrl: 'home-page-note-dialog.html',
})

export class HomePageNoteDialog {

  constructor(
    public dialogRef: MatDialogRef<HomePageNoteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  dialogClose(): void {
    this.dialogRef.close();
  }

}