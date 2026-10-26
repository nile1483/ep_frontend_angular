import { Component, ChangeDetectionStrategy } from '@angular/core';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-sales-order-payment-fail',
    templateUrl: './sales-order-payment-fail.component.html',
    styleUrl: './sales-order-payment-fail.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SalesOrderPaymentFailComponent {

  app_svg_icon_list = APP_SVG_ICON_LIST;

}
