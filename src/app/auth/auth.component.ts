import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Okta } from '../services/okta.service';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { OktaAuthWrapper } from './okta.auth.wrapper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  user;
  oktaSignIn;
  username;
  password;

  constructor(
    private okta: Okta, 
    private changeDetectorRef: ChangeDetectorRef, 
    private oauthService: OAuthService, 
    httpClient: HttpClient, 
    private oktaAuthWrapper: OktaAuthWrapper,
    private router: Router
  ) {
    //this.oktaSignIn = okta.getWidget();
    this.oauthService.redirectUri = window.location.origin;
    this.oauthService.postLogoutRedirectUri = window.location.origin + '/login';
    this.oauthService.clientId = '0oaeo4mzcoaHbclaY0h7';
    this.oauthService.scope = 'openid profile email';
    this.oauthService.issuer = 'https://dev-512848.oktapreview.com/oauth2/default';
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.tryLogin();
    });
  }

  showLogin() {
    this.oktaSignIn.renderEl({el: '#okta-login-container'}, (response) => {
      if (response.status === 'SUCCESS') {
        this.user = response.claims.email;
        this.oktaSignIn.remove();
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  ngOnInit() {
    if (!this.oauthService.hasValidIdToken()) {
      this.router.navigate(['/login']);
    }
    // this.oktaSignIn.session.get((response) => {
    //   if (response.status !== 'INACTIVE') {
    //     this.user = response.login;
    //     this.changeDetectorRef.detectChanges();
    //   } else {
    //     this.showLogin();
    //   }
    // });
  }

  // logout() {
  //   this.oktaSignIn.signOut(() => {
  //     this.user = undefined;
  //     this.changeDetectorRef.detectChanges();
  //     this.showLogin();
  //   });
  // }

  login() {
    this.oauthService.initImplicitFlow();
  }

  loginWithPassword() {
    this.oktaAuthWrapper.login(this.username, this.password)
      .then(_ => { 
        this.router.navigate(['/']);
        console.debug('logged in');
      })
      .catch(err => console.error('error logging in', err));
  }

  logout() {
    this.oauthService.logOut();
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

}
