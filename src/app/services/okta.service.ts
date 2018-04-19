import { Injectable } from '@angular/core';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Injectable()
export class Okta {
  widget;

  constructor() {
    this.widget = new OktaSignIn({
      baseUrl: 'https://dev-512848.oktapreview.com',
      clientId: '0oaeo4mzcoaHbclaY0h7',
      redirectUri: 'http://localhost:4200/implicit/callback',
      authParams: {
        issuer: 'default'
      }
    });
  }

  getWidget() {
    return this.widget;
  }
}