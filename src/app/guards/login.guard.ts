import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
// import {Angular2TokenService} from 'angular2-token';
import { Location } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private oauthService: OAuthService, private location: Location, 
              private router: Router) {}

  canActivate() {
    if (!this.oauthService.hasValidIdToken()) {
        return true;
    }
  
    this.router.navigate(['/']);
    return false;
  }

}