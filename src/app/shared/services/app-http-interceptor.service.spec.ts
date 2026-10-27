import { Injector } from '@angular/core';
import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import type { Request } from 'express';
import { of } from 'rxjs';

import { AppHttpInterceptorService } from './app-http-interceptor.service';

describe('AppHttpInterceptorService API routing', () => {
  const createExpressRequest = (
    protocol: string,
    headers: Record<string, string>,
  ): Request => ({
    protocol,
    headers,
    get: (name: string) => headers[name.toLowerCase()],
  }) as unknown as Request;

  const interceptUrl = (
    platformId: 'browser' | 'server',
    serverRequest: Request | null,
    configuredApiOrigin: string | null = null,
  ): string => {
    const interceptor = new AppHttpInterceptorService(
      {} as Injector,
      platformId as unknown as object,
      serverRequest,
      configuredApiOrigin,
      undefined,
    );
    let interceptedRequest: HttpRequest<unknown> | undefined;
    const next = {
      handle: (request: HttpRequest<unknown>) => {
        interceptedRequest = request;
        return of(new HttpResponse());
      },
    } as HttpHandler;

    interceptor.intercept(new HttpRequest('GET', '/api/v1/frontend/footer'), next).subscribe();

    return interceptedRequest?.url || '';
  };

  it('keeps browser API requests relative for the current host', () => {
    expect(interceptUrl('browser', null)).toBe('/api/v1/frontend/footer');
  });

  it('uses the forwarded production origin during SSR', () => {
    const request = createExpressRequest('http', {
      host: '127.0.0.1:4000',
      'x-forwarded-host': 'frontend.allexcellentpublicity.com',
      'x-forwarded-proto': 'https',
      'x-forwarded-port': '443',
    });

    expect(interceptUrl('server', request)).toBe(
      'https://frontend.allexcellentpublicity.com/api/v1/frontend/footer',
    );
  });

  it('uses the explicit SSR API origin override when configured', () => {
    const request = createExpressRequest('https', {
      host: 'frontend.allexcellentpublicity.com',
    });

    expect(interceptUrl('server', request, 'https://api.example.test/base-path')).toBe(
      'https://api.example.test/api/v1/frontend/footer',
    );
  });

  it('uses the fallback for direct loopback SSR requests', () => {
    const request = createExpressRequest('http', {
      host: '127.0.0.1:4000',
    });

    expect(interceptUrl('server', request)).toBe(
      'https://www.excellentpublicity.com/api/v1/frontend/footer',
    );
  });
});
