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
        loadChildren: () => import('./ipl-advertising-page/ipl-advertising-page.module').then(m => m.IplAdvertisingPageModule)
      }
    ]
  },
  {
    path: 'agency-partnership-program',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./agency-partnership-program-page/agency-partnership-program-page.module').then(m => m.AgencyPartnershipProgramPageModule)
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
        loadChildren: () => import('./garba-sponsorships-page/garba-sponsorships-page.module').then(m => m.GarbaSponsorshipsPageModule)
      }
    ]
  },
  {
    path: 'press-coverage',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./press-coverage-page/press-coverage-page.module').then(m => m.PressCoveragePageModule)
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
        loadChildren: () => import('./free-startup-consultation-page/free-startup-consultation-page.module').then(m => m.FreeStartupConsultationPageModule)
      }
    ]
  },

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
        loadChildren: () => import('./cricket-advertising-page/cricket-advertising-page.module').then(m => m.CricketAdvertisingPageModule)
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
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
