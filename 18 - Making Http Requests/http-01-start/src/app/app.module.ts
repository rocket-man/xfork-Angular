import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    {

      //angular identifes that all the classes we are defining here will be treated as interceptors
      //and that intercept method must be run when the requests leaves the application
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
      //to allow multple interceptors
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    }
    //The order of interceptors providers we give here, that order the interceptors will operate, 1st comes first
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
