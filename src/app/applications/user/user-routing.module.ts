import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
import { BillingComponent } from './billing/billing.component';
import { OrderSuccessComponent } from './order-success/order-success.component';

import { ManualPaymentComponent } from '../../applications/manual-payment/manual-payment.component';
import { ManualPaymentSuccessComponent } from '../../applications/manual-payment-success/manual-payment-success.component';
import { ManualPaymentFailComponent } from '../../applications/manual-payment-fail/manual-payment-fail.component';

import { SalesOrderPaymentComponent } from '../../applications/sales-order-payment/sales-order-payment.component';
import { SalesOrderPaymentSuccessComponent } from '../../applications/sales-order-payment-success/sales-order-payment-success.component';
import { SalesOrderPaymentFailComponent } from '../../applications/sales-order-payment-fail/sales-order-payment-fail.component';

import { SalesInvoiceDownloadComponent } from '../sales-invoice-download/sales-invoice-download.component';


const routes: Routes = [
  { path: 'user/profile', component: ProfileComponent},
  
  { path: 'user/cart', component: CartComponent},

  { path: 'user/order', component: OrderListComponent},
  { path: 'user/order/success', component: OrderSuccessComponent},
  { path: 'user/order/:orderId', component: OrderDetailComponent},
  
  { path: 'user/campaign', component: CampaignListComponent},
  { path: 'user/campaign/:campaignId', component: CampaignDetailComponent},

  { path: 'user/billing/:campaignId', component: BillingComponent},

  { path: 'manualpayment', component: ManualPaymentComponent},
  { path: 'manualpaymentsuccess', component: ManualPaymentSuccessComponent},
  { path: 'manualpaymentfail', component: ManualPaymentFailComponent},

  { path: 'salesorderpayment', component: SalesOrderPaymentComponent},
  { path: 'salesorderpaymentsuccess', component: SalesOrderPaymentSuccessComponent},
  { path: 'salesorderpaymentfail', component: SalesOrderPaymentFailComponent},

  { path: 'salesinvoicedownload/:token', component: SalesInvoiceDownloadComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
