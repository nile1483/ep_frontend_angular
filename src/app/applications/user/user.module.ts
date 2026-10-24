import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module'; 

import { UserRoutingModule } from './user-routing.module';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';

import { BillingComponent } from './billing/billing.component';

import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';

import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderSuccessComponent } from './order-success/order-success.component';

@NgModule({
  declarations: [
    CartComponent,
    ProfileComponent,    
    CampaignListComponent,
    CampaignDetailComponent,
    BillingComponent,
    OrderListComponent,
    OrderDetailComponent,
    OrderSuccessComponent    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
