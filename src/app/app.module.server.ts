import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [provideZoneChangeDetection()],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
