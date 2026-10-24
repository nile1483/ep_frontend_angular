import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppURL } from 'src/app/app-url';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginDialogComponent } from '../components/user-login-dialog/user-login-dialog.component';
import { AddToPlanDialogComponent, DialogPriceOnRequestComponent } from '@app-media-shared-components';
import { CommonService } from './common.service';
import { Router } from '@angular/router';
import { Utilities } from '@app-shared-helpers';
import {  CookieService } from '@app-shared-services';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuthenticated: boolean = false;
  userData = new Subject<any>();
  userInfo: any = false;
  userDataObs!: Subscription;
  inquiryUrl = AppURL.inquiry;

  userDataURL = '/api/user';
  signupURL = AppURL.signUp_url;
  signinURL = AppURL.signIn_url;
  signInOtpURL = AppURL.signIn_otp_url;
  userUrl = AppURL.user_url;
  userProfileUrl = AppURL.user_profile_url;
  useraddressurl = AppURL.useraddressurl;
  signInResendOtpURL = AppURL.signIn_resendOtp_url;
  signOutURL = AppURL.signOut_url;
  authCheckURL = AppURL.authCheck_url;
  orderSuccessURL = AppURL.order_success_url;
  orderURL = AppURL.order_url;
  forbiddenDomainsURL = AppURL.forbidden_domains_url;

  forbiddenDomainsList : any = [];
  forbiddenDomainData = new Subject<any>();
  forbiddenDomainDataObs!: Subscription;
  forbiddenDomainInfo: any = false;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private cookieService: CookieService,
  ) {
    this.userDataObs = this.userData.subscribe(data => {
      if (data != false) {
        this.userInfo = data;
      }
    });
    
    this.setForbiddenEmailDomainDataList();
  } 
   
  setForbiddenEmailDomainDataList() {
    this.getForbiddenEmailDomainRequest().subscribe(response => {
      if (response.status === true) {
        this.forbiddenDomainsList = response.data;
      }
    });
  }


  getForbiddenEmailDomainRequest(): Observable<any> {
    const domainsURL = `${this.forbiddenDomainsURL}`;
    return this.http.get<any>(domainsURL)
      .pipe(
        tap(data => {
  
        }),
        catchError(this.handleError<any>('Forbidden Domains URL', { "status": false, "message": "Forbidden Domains URL Error" }))
      );
  }
  

  setUserAuthenticated(authenticated:boolean) {
    
    if (authenticated) { 
      this.cookieService.set('isAuthenticated', 'true',{ expires: 1,path:'/'});
    } else { 
      this.cookieService.delete('isAuthenticated');
    }

    let getCookie: unknown =this.cookieService.get('isAuthenticated');
    this.isAuthenticated = (getCookie == "true") ? true : false;
 } 
 
 get isUserAuthenticated() { 
  let getCookie: unknown = this.cookieService.get('isAuthenticated');
   
  this.isAuthenticated = (getCookie == "true") ? true : false; 
   return this.isAuthenticated;
}


  userAuthCheck(): Observable<any> {
    const authCheckURL = `${this.authCheckURL}`;
    return this.http.get<any>(authCheckURL)
      .pipe(
        tap(data => {

        }),
        catchError(this.handleError<any>('userAuthCheck', { "status": false, "message": "userAuthCheck Error" }))
      );
  }

  userSignout(): Observable<any> {
    const url = `${this.signOutURL}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Logout', { "status": false, "message": "Error Getting Logout" }))
      );
  }

  updateUserData(isAuth: boolean = true) {

    if(isAuth == false){
      this.setUserAuthenticated(isAuth);
      this.userData.next(false);
    }

    this.getUserData().subscribe(data => {
      if (!Utilities.isEmptyObj(data) && !('status' in data)) {
        this.setUserAuthenticated(isAuth);
        this.userData.next(data);
      }
      else {
        this.userData.next(false);
      }
    });
  }

  userRegistration(registrationData: any): Observable<any> {
    //this.loader.open();----------------
    const url = `${this.signupURL}`;
    return this.http.post<any>(url, registrationData)
      .pipe(
        tap(data => {
          // this.loader.close();
        }),
        catchError(this.handleError<any>('Login', { "status": false, "message": "Login Error" }))
      );
  }

  userVerification(user: any): Observable<any> {
    // this.loader.open();
    const url = `${this.signinURL}`;
    return this.http.post<any>(url, user)
      .pipe(
        tap(data => {
          // this.loader.close(); 
        }),
        catchError(this.handleError<any>('User Verification', { "status": false, "message": "User Verification Error" }))
      );
  }

  loginOtp(user: any): Observable<any> {
    //this.loader.open();
    const url = `${this.signInOtpURL}`;
    return this.http.post<any>(url, user['formData'])
      .pipe(
        tap(data => {
          // this.loader.close();
        }),
        catchError(this.handleError<any>('Login Otp', { "status": false, "message": "Login Otp Error" }))
      );
  }

  resendOtp(user: any): Observable<any> {
    // this.loader.open();
    const url = `${this.signInResendOtpURL}`;
    return this.http.post<any>(url, user['formData'])
      .pipe(
        tap(data => {
          // this.loader.close();
        }),
        catchError(this.handleError<any>('Resend Otp', { "status": false, "message": "Resend Otp Error" }))
      );
  }

  /* User Details */

  getUserData(): Observable<any> {
    // this.loader.open();
    const url = `${this.userUrl}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
          // this.loader.close(); 
        }),
        catchError(this.handleError<any>('Logout', { "status": false, "message": "Error Getting Logout" }))
      );
  }

  getProfile(): Observable<any> {
    // this.loader.open();
    const url = `${this.userProfileUrl}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
          // this.loader.close(); 
        }),
        catchError(this.handleError<any>('Logout', { "status": false, "message": "Error Getting Logout" }))
      );
  }

  getBillingAddress(): Observable<any> {
    // this.loader.open();
    const url = `${this.useraddressurl}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
          // this.loader.close(); 
        }),
        catchError(this.handleError<any>('Logout', { "status": false, "message": "Error Getting Logout" }))
      );
  }

  editAddress(data: any): Observable<any> {
    const url = `${this.useraddressurl}/${data['addressId']}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Address Edit', { "status": false, "message": "Address get Error" }))
      );
  }

  updateProfile(user: any): Observable<any> {
    // this.loader.open();
    const url = `${this.userProfileUrl}`;
    return this.http.put<any>(url, user)
      .pipe(
        tap(data => {
          // this.loader.close(); 
        }),
        catchError(this.handleError<any>('User Verification', { "status": false, "message": "User Verification Error" }))
      );
  }

  /**
  * @param placement Header, Product Listing, Product Detail etc...  * 
  * @param item  productName or null
  */
  openUserLoginDialog(placement: 'Header' | 'Product Listing' | 'Product Detail', productName: any): void {

    const dialogRef = this.dialog.open(UserLoginDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '700px',
      data: { productName, placement }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        //window.location.reload();
      }

    });
  }

  openAddToPlanDialog(mediaDetail: any, price: any): void {

    let mediaData: any = {};
    mediaData = Utilities.setAddToPlanData(mediaDetail, price);

    const dialogRef = this.dialog.open(AddToPlanDialogComponent, {
      data: mediaData,
      width: '700px',
      disableClose: true
    });
    
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.router.navigate(['/user/cart']);
      }

    });
  }


  openPriceOnRequestDialog(formData: any) {
    const dialogRef = this.dialog.open(DialogPriceOnRequestComponent, {
      data: formData,
      width: '400px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(isSendRequest => {

      if (isSendRequest == true) {

        this.inquiryPriceOnRequestCreate(formData).subscribe(result => {
          if (result.status == true) {
            this.commonService.openSnackBar(result.message);
          }
        })
      }
    });

  }

  inquiryPriceOnRequestCreate(formData: any): Observable<any> {
    const url = `${this.inquiryUrl}/priceonrequest`;
    return this.http.post<any>(url, formData)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Inquiry other service added', { "status": false, "message": "Inquiry other service error" }))
      );
  }
  /* User Orders */

  getOrderInfo(token: any): Observable<any> {
    const url = `${this.orderSuccessURL}/${token}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => { }),

        catchError(this.handleError<any>('Order summary Data', { "status": false, "message": "get Order summary Error" }))
      );
  }

  getUserOrderList(): Observable<any> {
    const url = `${this.orderURL}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => { }),
        catchError(this.handleError<any>('Order List', { "status": false, "message": "Error Order List" }))
      );
  }

  getUserOrderDetail(user: any): Observable<any> {
    const url = `${this.orderURL}/${user['orderId']}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => { }),
        catchError(this.handleError<any>('Order Detail', { "status": false, "message": "Error Order Detail" }))
      );
  }

  public getCountryCodes(): Observable<any> {
    return this.http.get<any>("./assets/json/country-codes.json")
      .pipe(
        tap(data => { }),
        catchError(this.handleError<any>('country codes', { "status": false, "message": "Error country codes" }))
      );

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //return of(result as T);
      return of(result as T);
    };

  }

  ngOnDestroy(): void {
    this.userDataObs.unsubscribe();
  }

}
