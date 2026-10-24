import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../../shared/layouts/main-layout/main-layout.component';
import { TestingPageComponent } from '../../applications/page/testing-page/testing-page.component';

const regionList = ['mena'];

const routes: Routes = [
  {
    path: 'testing',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: TestingPageComponent,
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'media',
        loadChildren: () => import('../../applications/page/landing-page/landing-page.module').then(m => m.LandingPageModule)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'services',
        loadChildren: () => import('../../applications/page/seo-page/seo-page.module').then(m => m.SeoPageModule)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'advertising',
        loadChildren: () => import('../../applications/page/advertising-page/advertising-page.module').then(m => m.AdvertisingPageModule)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    data: { isShowAppHeaderMenu: false, isShowAppFooterMenu: false },
    matcher: (url) => {
      if (url.length >= 3 && regionList.includes(url[0].path)) {
        return {
          consumed: url.slice(0, 1),
          posParams: {
            region: url[0],
            segment: url[1],
            slug: url[2]
          }
        };
      }
      return null;
    },
    children: [
      {
        path: ':region/:segment/:slug',
        loadChildren: () => import('../../applications/page/country-page/country-page.module').then(m => m.CountryPageModule),
      }

    ]
  },


  {
    path: 'ipl-advertising',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/ipl-page/ipl.module').then(m => m.IPLModule)
      }
    ]
  },
  {
    path: 'agency-partnership-program',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/channel-partner-page/channel-partner-page.module').then(m => m.ChannelPartnerPageModule)
      }
    ]
  },
  {
    path: 'worldcup',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/world-cup-page/world-cup-page.module').then(m => m.WorldCupPageModule)
      }
    ]
  },
  {
    path: 'corporate-gifting',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/corporate-gifting-static/corporate-gifting-static.module').then(m => m.CorporateGiftingStaticModule)
      }
    ]
  },
  {
    path: 'mediapage',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/media-page/media-page.module').then(m => m.MediaPageModule)
      }
    ]
  },
  {
    path: 'seo-service',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/seo-service-page/seo-service-page.module').then(m => m.SeoServicePageModule)
      }
    ]
  },
  {
    path: 'garba-sponsorships',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/garba-page/garba-page.module').then(m => m.GarbaPageModule)
      }
    ]
  },
  // {
  //   path: 'in-film-advertising-and-cobranding',
  //   component: MainLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('../../applications/page/infilm-outfilm/infilm-outfilm.module').then(m => m.InfilmOutfilmModule)
  //     }
  //   ]
  // },

  {
    path: 'press-coverage',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/press-release-page/press-release-page.module').then(m => m.PressReleasePageModule)
      }
    ]
  },

  {
    path: 'budget-estimator',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/budget-estimator-page/budget-estimator-page.module').then(m => m.BudgetEstimatorPageModule)
      }
    ]
  },

  {
    path: 'free-startup-consultation',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/pro-bono-page/pro-bono-page.module').then(m => m.ProBonoPageModule)
      }
    ]
  },

  // {
  //   path: 'whatsapp-community-elements',
  //   component: MainLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('../../applications/page/whatsapp-community-elements/whatsapp-community-elements-page.module').then(m => m.WhatsappCommunityElementsModule)
  //     }
  //   ]
  // },

  {
    path: 'community',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/community-page/community-page.module').then(m => m.CommunityPageModule)
      }
    ]
  },

  {
    path: 'cricket-advertising',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/cricket-advertising/cricket-advertising.module').then(m => m.CricketAdvertisingModule)
      }
    ]
  },

  {
    path: 'industry-insights',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/industry-insights/industry-insights-page.module').then(m => m.IndustryInsightsPageModule)
      }
    ]
  },

  {
    path: 'media-insights',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/media-insights/media-insights-page.module').then(m => m.MediaInsightsPageModule)
      }
    ]
  },

  {
    path: 'calculators',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/calculator/calculator-page.module').then(m => m.CalculatorPageModule)
      }
    ]
  },

  {
    path: 'salesdeck',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/sales-deck-page/sales-deck-page.module').then(m => m.SalesDeckPageModule)
      }
    ]
  },

  {
    path: 'newsletter',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../applications/page/newsletter-page/newsletter-page.module').then(m => m.NewsletterPageModule)
      }
    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
