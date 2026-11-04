import { Component, ChangeDetectionStrategy } from '@angular/core';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-sales-order-payment-success',
    templateUrl: './sales-order-payment-success.component.html',
    styleUrl: './sales-order-payment-success.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SalesOrderPaymentSuccessComponent {

  app_svg_icon_list = APP_SVG_ICON_LIST;

}
