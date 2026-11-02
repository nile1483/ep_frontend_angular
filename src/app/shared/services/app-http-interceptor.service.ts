import { Inject, Injectable, Optional } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from './user.service';
import { StatusCodeResponseService } from '@app-shared-services';

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptorService implements HttpInterceptor {

  private readonly customTokenKey = 'Excellent-Token';
  private readonly fixedTokenValue = '39lEl5t2c8886n7nleE53x8n';

  constructor(
    private userService: UserService,
    @Optional() private statusCodeResponseService?: StatusCodeResponseService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Clone the request to add the custom header
    const modifiedReq = req.clone({
      setHeaders: {
        [this.customTokenKey]: this.fixedTokenValue,
      },
    });

    return next.handle(modifiedReq).pipe(

      catchError((response: HttpErrorResponse) => {
        let errorMessage = '';
        if (response.status == 401) {
          this.userService.setUserAuthenticated(false);
          this.userService.userData.next(false);
        }

        if (response.status == 402) {
          this.statusCodeResponseService?.setPermanentRedirect(response.error.url);
        }

        if (response.status == 404) {
          this.statusCodeResponseService?.setNotFound();
        }

        return throwError(response);
      })

    );
  }
}
