import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, Injector, Optional, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import type { Request } from 'express';

import { UserService } from './user.service';
import { StatusCodeResponseService } from '@app-shared-services';
import { SERVER_API_ORIGIN, SERVER_REQUEST } from '../tokens/server-request.token';

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptorService implements HttpInterceptor {

  private readonly customTokenKey = 'Excellent-Token';
  private readonly fixedTokenValue = '39lEl5t2c8886n7nleE53x8n';
  private readonly fallbackApiOrigin = 'https://www.excellentpublicity.com';

  constructor(
    private injector: Injector,
    @Inject(PLATFORM_ID) private readonly platformId: object,
    @Optional() @Inject(SERVER_REQUEST) private readonly serverRequest: Request | null,
    @Optional() @Inject(SERVER_API_ORIGIN) private readonly configuredApiOrigin: string | null,
    @Optional() private statusCodeResponseService?: StatusCodeResponseService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the custom header
    const modifiedReq = req.clone({
      url: this.resolveApiUrl(req.url),
      setHeaders: {
        [this.customTokenKey]: this.fixedTokenValue,
      },
    });

    return next.handle(modifiedReq).pipe(

      catchError((response: HttpErrorResponse) => {
        let errorMessage = '';
        if (response.status == 401) {
          const userService = this.injector.get(UserService);
          userService.setUserAuthenticated(false);
          userService.userData.next(false);
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

  private resolveApiUrl(url: string): string {
    const isApiRequest = url === '/api' || url.startsWith('/api/');

    // Browsers must keep the relative URL so Nginx (or the Angular dev proxy)
    // receives the API request on the same host as the application.
    if (!isApiRequest || !isPlatformServer(this.platformId)) {
      return url;
    }

    return new URL(url, this.getServerApiOrigin()).toString();
  }

  private getServerApiOrigin(): string {
    const configuredOrigin = this.toOrigin(this.configuredApiOrigin);
    if (configuredOrigin) {
      return configuredOrigin;
    }

    const requestOrigin = this.getIncomingRequestOrigin();
    if (requestOrigin && !this.isLoopbackHostname(new URL(requestOrigin).hostname)) {
      return requestOrigin;
    }

    // A direct/local SSR request cannot call its own /api route because that
    // would re-enter Angular SSR. Use the public API host as a safe fallback.
    return this.fallbackApiOrigin;
  }

  private getIncomingRequestOrigin(): string | null {
    if (!this.serverRequest) {
      return null;
    }

    const protocol = this.firstHeaderValue('x-forwarded-proto') || this.serverRequest.protocol;
    const host = this.firstHeaderValue('x-forwarded-host') || this.serverRequest.get('host');

    if (!host || (protocol !== 'http' && protocol !== 'https')) {
      return null;
    }

    const origin = this.toOrigin(`${protocol}://${host}`);
    if (!origin) {
      return null;
    }

    const forwardedPort = this.firstHeaderValue('x-forwarded-port');
    if (!forwardedPort || !/^\d+$/.test(forwardedPort)) {
      return origin;
    }

    const parsedOrigin = new URL(origin);
    if (!parsedOrigin.port) {
      parsedOrigin.port = forwardedPort;
    }

    return parsedOrigin.origin;
  }

  private firstHeaderValue(headerName: string): string | undefined {
    const value = this.serverRequest?.headers[headerName];
    const firstValue = Array.isArray(value) ? value[0] : value;
    return firstValue?.split(',')[0]?.trim() || undefined;
  }

  private toOrigin(value: string | null | undefined): string | null {
    if (!value) {
      return null;
    }

    try {
      const parsedValue = new URL(value);
      return parsedValue.protocol === 'http:' || parsedValue.protocol === 'https:'
        ? parsedValue.origin
        : null;
    } catch {
      return null;
    }
  }

  private isLoopbackHostname(hostname: string): boolean {
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
  }
}
