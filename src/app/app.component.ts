import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ThemeService } from './services/theme.service';
import { Observable } from 'rxjs/Observable';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  changeDetectorRef: any;
  options: FormGroup;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  isDarkTheme: Observable<boolean>;
  theme: Observable<String>;
  frameworkLinks = [];

  constructor(
    fb: FormBuilder, 
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher, 
    private themeService: ThemeService,
    public oauthService: OAuthService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener); 

    this.options = fb.group({
      'fixed': true,
      'top': 0,
      'bottom': 0,
    });

    this.isDarkTheme = this.themeService.isDarkTheme;
    this.theme = this.themeService.theme;

    this.frameworkLinks = environment.frameworks;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  setTheme(theme: String) {
    this.themeService.setTheme(theme);
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

  logout() {
    this.oauthService.logOut();
  }

}
