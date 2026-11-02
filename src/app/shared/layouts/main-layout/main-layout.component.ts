import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CookieService, UserService } from '@app-shared-services';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingCartService } from '@app-media-services';
import { UntypedFormControl } from '@angular/forms';
import { HomeService } from '@app-shared-services';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@app-shared-services';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class MainLayoutComponent implements OnInit {

  ipAddress = '';
  countryCode = '';

  app_svg_icon_list = APP_SVG_ICON_LIST;
  status: boolean = false;
  animateSearchBarVariable: string = 'false';
  isActiveSearch: boolean = false;
  placeHolder: string = "Search Media for Advertising";
  shoppingCartObs!: Subscription;
  footerDataObs!: Subscription;
  userInfo: any = {};
  isAuthenticated: boolean = false;
  totalCartItem: any = null
  siteSearchControl = new UntypedFormControl();
  siteSearchResults: any[] = [];
  filteredOptions: any[] = [];
  siteSearchData: any[] = [];
  userDataObs!: Subscription;
  currencies: any = [];
  selectedCurrency: any = [];
  footerData: any = [];
  layout: any;
  isShowAppHeaderMenu: boolean = true;
  isShowAppFooterMenu: boolean = true;

  constructor(
    private userService: UserService,
    private homeService: HomeService,
    private commonService: CommonService,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    public dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private cookieService: CookieService,
  ) {

    this.siteSearchControl.valueChanges.subscribe(newValue => {
      if (newValue.length > 2) {
        this.searchSite(newValue);
      }
      else {
        this.filteredOptions = [];
      }
    });

    this.activeRoute.data.subscribe(data => {
      this.layout = data;
      if (this.layout.hasOwnProperty('isShowAppHeaderMenu')) {
        this.isShowAppHeaderMenu = this.layout.isShowAppHeaderMenu;
      }
      if (this.layout.hasOwnProperty('isShowAppFooterMenu')) {
        this.isShowAppFooterMenu = this.layout.isShowAppFooterMenu;
      }
    });
  }

  ngOnInit(): void {

    this.setUserInfo();
    this.setShoppingCartItemCount();
    this.footerData = this.commonService.footerData;

    // currency start
    this.currencies = this.commonService.footerData.currency;
    this.selectedCurrency = this.commonService.getSelectedCurrency();
    this.commonService.setCurrency(this.selectedCurrency);

    this.commonService.getCurrency().subscribe(currency => {
      this.selectedCurrency = this.commonService.getSelectedCurrency();
    });

    // currency end

    this.footerDataObs = this.commonService.subFooterData.subscribe((result: any) => {
      this.footerData = this.commonService.footerData;

      // currency start
      this.currencies = this.commonService.footerData.currency;
      this.selectedCurrency = this.commonService.getSelectedCurrency();
      this.commonService.setCurrency(this.selectedCurrency);
      // currency end

      this.cdr.detectChanges();
    });
    this.cdr.detectChanges();

    this.getDetectCountry();
  }


  getDetectCountry() {
    this.commonService.getDetectCountry().subscribe(result => {

      if (result.status == true) {
        this.commonService.setCurrency(result.data);
      }

    })
  }

  closeBootstrapModal() {
    this.commonService.closeLoginModal();
  }
  gotoUrl(item: any) {
    //let prmArray = item.link.split('/');
    //prmArray.unshift('/');
    this.commonService.gtmViewSearchResultsEvents(this.siteSearchControl.value, item.term, item.link, 'yes');
    this.siteSearchControl.setValue('');
    this.router.navigateByUrl(item.link);
  }

  goToSearchSitePage() {
    let suggestions = (this.filteredOptions.length > 0) ? 'yes' : 'no';
    let params = { q: this.siteSearchControl.value };
    this.commonService.gtmViewSearchResultsPageEvents(this.siteSearchControl.value, suggestions);
    this.router.navigate(['/', 'search'], { relativeTo: this.activeRoute, queryParams: params });
    this.siteSearchControl.setValue('');
  }

  searchSite(value: string) {
    let serviceData: any = [];
    serviceData['param'] = { q: value };

    this.homeService.searchSite(serviceData).subscribe((result: any) => {

      if (result.status == true) {
        this.filteredOptions = result.data;
      }
      else {
        this.filteredOptions = [];
      }
    });
  }

  setShoppingCartItemCount() {
    this.totalCartItem = this.shoppingCartService.totalCartItem;
    this.shoppingCartObs = this.shoppingCartService.shoppingCartSub.subscribe(data => {
      this.totalCartItem = this.shoppingCartService.totalCartItem;
    });

  }

  setUserInfo() {
    this.userInfo = this.userService.userInfo;

    this.isAuthenticated = this.userService.isAuthenticated;
    this.userDataObs = this.userService.userData.subscribe(data => {
      this.userInfo = data;
      this.isAuthenticated = this.userService.isAuthenticated;
      // this.getDetectCountry();
    });
  }

  openSidebar() {
    this.status = true;
  }
  //Sidebar close
  closeSidebar() {
    this.status = false;
  }

  onFocus() {
    this.animateSearchBarVariable = this.animateSearchBarVariable === 'false' ? 'true' : 'false';
    //this.isActiveSearch = true;
  }

  onSearchFocusOut() {
    //this.isActiveSearch = false;

    this.filteredOptions = [];
  }

  signout() {
    this.userService.userSignout().subscribe(data => {
      this.cookieService.delete('isAuthenticated');
      this.userService.updateUserData(false);
      this.commonService.openSnackBar('Sign Out Successfully');
      this.router.navigate(['/']);
    });

  }

  openLoginDialog(): void {
    this.userService.openUserLoginDialog('Header', null);
  }

  ngOnDestroy(): void {
    // this.shoppingCartObs.unsubscribe();
    // this.footerDataObs.unsubscribe();
    // this.userDataObs.unsubscribe();
  }



  changeCurrency(currency: any) {
    this.selectedCurrency = currency;
    this.commonService.setCurrency(this.selectedCurrency);
  }

}
