import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./applications/home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./applications/company/company.module').then(m => m.CompanyModule)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./applications/user/user.module').then(m => m.UserModule)
      }
    ]
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'blog',
        loadChildren: () => import('./applications/blog/blog.module').then(m => m.BlogModule)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'news',
        loadChildren: () => import('./applications/blog/blog.module').then(m => m.BlogModule)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'casestudy',
        loadChildren: () => import('./applications/blog/blog.module').then(m => m.BlogModule)
      }
    ]
  },

  {
    path: '',
    // component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./applications/page/page.module').then(m => m.PageModule)
      }
    ]
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'tools',
        loadChildren: () => import('./applications/tools/tools.module').then(m => m.ToolsModule)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'radio',
        loadChildren: () => import('./applications/media/radio/radio.module').then(m => m.RadioModule)
      },
      {
        path: 'cinema',
        loadChildren: () => import('./applications/media/cinema/cinema.module').then(m => m.CinemaModule)
      },
      {
        path: 'transit',
        loadChildren: () => import('./applications/media/transit/transit.module').then(m => m.TransitModule)
      },
      {
        path: 'outdoor',
        loadChildren: () => import('./applications/media/outdoor/outdoor.module').then(m => m.OutdoorModule)
      },
      {
        path: 'nontraditional',
        loadChildren: () => import('./applications/media/nontraditional/nontraditional.module').then(m => m.NontraditionalModule)
      },
      {
        path: 'newspaper',
        loadChildren: () => import('./applications/media/newspaper/newspaper.module').then(m => m.NewspaperModule)
      },
      {
        path: 'magazine',
        loadChildren: () => import('./applications/media/magazine/magazine.module').then(m => m.MagazineModule)
      },
      {
        path: 'television',
        loadChildren: () => import('./applications/media/television/television.module').then(m => m.TelevisionModule)
      },
      {
        path: 'mall',
        loadChildren: () => import('./applications/media/mall/mall.module').then(m => m.MallModule)
      },
      {
        path: 'digital',
        loadChildren: () => import('./applications/media/digital/digital.module').then(m => m.DigitalModule)
      },
      {
        path: 'digitalpr',
        loadChildren: () => import('./applications/media/digitalpr/digitalpr.module').then(m => m.DigitalprModule)
      },
      {
        path: 'influencer',
        loadChildren: () => import('./applications/media/influencer/influencer.module').then(m => m.InfluencerModule)
      },
      {
        path: 'inflight',
        loadChildren: () => import('./applications/media/inflight/inflight.module').then(m => m.InflightModule)
      },
      {
        path: 'corporategifting',
        loadChildren: () => import('./applications/media/corporate-gifting/corporate-gifting.module').then(m => m.CorporateGiftingModule)
      },
      {
        path: 'btl',
        loadChildren: () => import('./applications/media/btl/btl.module').then(m => m.BtlModule)
      },
      {
        path: 'sportsmarketing',
        loadChildren: () => import('./applications/media/sports/sports.module').then(m => m.SportsModule)
      },
      {
        path: 'activation',
        loadChildren: () => import('./applications/media/activation/activation.module').then(m => m.ActivationModule)
      },
      {
        path: 'airport',
        loadChildren: () => import('./applications/media/airport/airport.module').then(m => m.AirportModule)
      },
      {
        path: 'ai-tools',
        loadChildren: () => import('./applications/media/aitools/aitools.module').then(m => m.AitoolsModule)
      },
      {
        path: 'in-film-advertising-and-cobranding',
        loadChildren: () => import('./applications/media/infilm/infilm.module').then(m => m.InfilmModule)
      },
      {
        path: 'monitoring-tools',
        loadChildren: () => import('./applications/media/monitoringtools/monitoringtools.module').then(m => m.MonitoringtoolsModule)
      },
      {
        path: 'events-and-sponsorship',
        loadChildren: () => import('./applications/media/eventsponsorship/eventsponsorship.module').then(m => m.EventsponsorshipModule)
      }

    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./applications/other-services/other-services.module').then(m => m.OtherServicesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled', initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
