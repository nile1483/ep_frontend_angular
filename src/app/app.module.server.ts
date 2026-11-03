import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  // Angular 21 bootstraps NgModules zoneless by default; keep SSR on Zone.js like the browser (main.ts).
  providers: [provideZoneChangeDetection()],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
