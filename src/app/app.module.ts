import { APP_ID, NgModule, TransferState } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { StatusCodeResponseService } from '@app-shared-services';
import { AppHttpInterceptorService } from '@app-shared-services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ManualPaymentComponent } from './applications/manual-payment/manual-payment.component';
import { ManualPaymentSuccessComponent } from './applications/manual-payment-success/manual-payment-success.component';
import { ManualPaymentFailComponent } from './applications/manual-payment-fail/manual-payment-fail.component';
import { ClientRateMyServiceComponent } from './applications/client-rate-my-service/client-rate-my-service.component';
import { VendorRateMyServiceComponent } from './applications/vendor-rate-my-service/vendor-rate-my-service.component';
import { CourierConfirmationReceivedComponent } from './applications/courier-confirmation-received/courier-confirmation-received.component';
import { CourierConfirmationNotReceivedComponent } from './applications/courier-confirmation-not-received/courier-confirmation-not-received.component';
import { SalesInvoiceDownloadComponent } from './applications/sales-invoice-download/sales-invoice-download.component';
import { SalesOrderPaymentComponent } from './applications/sales-order-payment/sales-order-payment.component';
import { SalesOrderPaymentFailComponent } from './applications/sales-order-payment-fail/sales-order-payment-fail.component';
import { SalesOrderPaymentSuccessComponent } from './applications/sales-order-payment-success/sales-order-payment-success.component';

@NgModule({ declarations: [
        AppComponent,
        ManualPaymentComponent,
        ManualPaymentSuccessComponent,
        ManualPaymentFailComponent,
        ClientRateMyServiceComponent,
        VendorRateMyServiceComponent,
        CourierConfirmationReceivedComponent,
        CourierConfirmationNotReceivedComponent,
        SalesInvoiceDownloadComponent,
        SalesOrderPaymentComponent,
        SalesOrderPaymentFailComponent,
        SalesOrderPaymentSuccessComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        GoogleTagManagerModule.forRoot({
            id: 'GTM-MT5BHP',
        })], providers: [
        { provide: APP_ID, useValue: 'serverApp' },
        provideClientHydration(),
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptorService, multi: true },
        { provide: TransferState },
        StatusCodeResponseService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
