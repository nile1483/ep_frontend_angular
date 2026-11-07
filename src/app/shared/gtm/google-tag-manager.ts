import { Inject, Injectable, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';

// Local replacement for the parts of angular-google-tag-manager@1.13.0 this app uses
// (GoogleTagManagerModule.forRoot({ id }) and GoogleTagManagerService.pushTag). The script
// loading and dataLayer logic follows the library's implementation so GTM behaves the same.

export interface GoogleTagManagerConfig {
  id: string | null;
  gtm_auth?: string;
  gtm_preview?: string;
  gtm_resource_path?: string;
}

export const GoogleTagManagerConfigService = new InjectionToken<GoogleTagManagerConfig>('google-tag-manager-config');

@NgModule()
export class GoogleTagManagerModule {
  static forRoot(config: GoogleTagManagerConfig): ModuleWithProviders<GoogleTagManagerModule> {
    return {
      ngModule: GoogleTagManagerModule,
      providers: [{ provide: GoogleTagManagerConfigService, useValue: config }],
    };
  }
}

@Injectable({ providedIn: 'root' })
export class GoogleTagManagerService {
  private isLoaded = false;
  private config: GoogleTagManagerConfig;

  constructor(@Optional() @Inject(GoogleTagManagerConfigService) config: GoogleTagManagerConfig | null) {
    this.config = { ...(config ?? { id: null }) };
  }

  pushTag(item: object): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.checkForId()) {
        return resolve();
      }
      if (!this.isLoaded) {
        this.addGtmToDom()
          .then(() => {
            this.pushOnDataLayer(item);
            return resolve();
          })
          .catch(() => reject());
      } else {
        this.pushOnDataLayer(item);
        return resolve();
      }
    });
  }

  private checkForId(): boolean {
    if (!this.config.id) {
      throw new Error('Google tag manager ID not provided.');
    }
    return true;
  }

  private getDataLayer(): any[] {
    const win = window as any;
    win.dataLayer = win.dataLayer || [];
    return win.dataLayer;
  }

  private pushOnDataLayer(obj: object): void {
    this.getDataLayer().push(obj);
  }

  private addGtmToDom(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.isLoaded) {
        return resolve(this.isLoaded);
      }
      this.pushOnDataLayer({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });
      const gtmScript = document.createElement('script');
      gtmScript.id = 'GTMscript';
      gtmScript.async = true;
      gtmScript.src = this.applyGtmQueryParams(this.config.gtm_resource_path || 'https://www.googletagmanager.com/gtm.js');
      gtmScript.addEventListener('load', () => resolve((this.isLoaded = true)));
      gtmScript.addEventListener('error', () => reject(false));
      document.head.insertBefore(gtmScript, document.head.firstChild);
    });
  }

  private applyGtmQueryParams(url: string): string {
    if (url.indexOf('?') === -1) {
      url += '?';
    }
    const config = this.config as unknown as Record<string, unknown>;
    return url + Object.keys(config).filter((k) => config[k]).map((k) => `${k}=${config[k]}`).join('&');
  }
}
