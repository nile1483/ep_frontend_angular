import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, Inject, Injectable, PLATFORM_ID } from '@angular/core';

type DataLayer = Array<Record<string, unknown>>;

@Injectable({
  providedIn: 'root',
})
export class GoogleTagManagerService {
  private readonly containerId = 'GTM-MT5BHP';
  private loadPromise?: Promise<void>;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) { }

  pushTag(tag: Record<string, unknown>): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve();
    }

    return this.load().then(() => {
      this.dataLayer.push(tag);
    });
  }

  private load(): Promise<void> {
    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.dataLayer.push({
      'gtm.start': Date.now(),
      event: 'gtm.js',
    });

    this.loadPromise = new Promise<void>((resolve, reject) => {
      const existingScript = this.document.getElementById('GTMscript') as HTMLScriptElement | null;
      if (existingScript) {
        resolve();
        return;
      }

      const script = this.document.createElement('script');
      script.id = 'GTMscript';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(this.containerId)}`;
      script.addEventListener('load', () => resolve(), { once: true });
      script.addEventListener('error', () => {
        this.loadPromise = undefined;
        reject(new Error('Unable to load Google Tag Manager.'));
      }, { once: true });
      this.document.head.insertBefore(script, this.document.head.firstChild);
    });

    return this.loadPromise;
  }

  private get dataLayer(): DataLayer {
    const browserWindow = this.document.defaultView as (Window & { dataLayer?: DataLayer });
    browserWindow.dataLayer ??= [];
    return browserWindow.dataLayer;
  }
}
