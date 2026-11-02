import { Component } from '@angular/core';
import { ShoppingCartService } from '@app-media-services';
import { CommonService } from 'src/app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppURL } from 'src/app/app-url';

@Component({
  selector: 'app-sales-invoice-download',
  templateUrl: './sales-invoice-download.component.html',
  styleUrl: './sales-invoice-download.component.css'
})
export class SalesInvoiceDownloadComponent {

  token: string = '';
  salesInvoiceDownloadUrl: string = AppURL.salesInvoiceDownloadUrl;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'] ?? false;
      this.download();
    });
  }

  download() {
    // window.open(this.salesInvoiceDownloadUrl + '/' + this.token);
    window.location.href = `${this.salesInvoiceDownloadUrl}/${this.token}`;
  }

}