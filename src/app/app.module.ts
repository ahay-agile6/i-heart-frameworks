import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ThemeService } from './services/theme.service';
import { DotnetCoreComponent } from './dotnet-core/dotnet-core.component';
import { AuthComponent } from './auth/auth.component';
import { Okta } from './services/okta.service';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { OAuthModule } from 'angular-oauth2-oidc';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OktaAuthWrapper } from './auth/okta.auth.wrapper';

@NgModule({
  declarations: [
    AppComponent,
    DotnetCoreComponent,
    AuthComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    OAuthModule.forRoot()    
  ],
  providers: [
    ThemeService,
    Okta,
    LoginGuard,
    AuthGuard,
    OktaAuthWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
