import { Component, Inject, PLATFORM_ID, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-schedule-a-call',
    templateUrl: './schedule-a-call.component.html',
    styleUrl: './schedule-a-call.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ScheduleACallComponent {

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      // Calendly CSS
      const link = this.renderer.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      this.renderer.appendChild(document.head, link);

      // Calendly Script
      const script = this.renderer.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      this.renderer.appendChild(document.body, script);
    }
  }
}
