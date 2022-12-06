import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
//modules are combining comp, directives, services. pipes etc


//We wont import the RecipiesModule and other feature modules,
//as we would then be trying to load the Module both lazily and eagerly


//Services can be provided in 1. root(accessible in app module) -->rootInjector

//2. any other component (accessible in the component tree)
//--> children override with their own instances, component-specific injector

//Eager loaded modules //service available applicaion-wise      -->root-injector


//Lazy loaded modules //Service available in loaded module / gets its own instance(in case it is provided in app module as well?)
//-->child-injector
