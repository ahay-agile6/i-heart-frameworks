import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ThemeService } from './services/theme.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options: FormGroup;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  isDarkTheme: Observable<boolean>;
  theme: Observable<String>;

  constructor(fb: FormBuilder, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private themeService: ThemeService) {
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
    console.log(this.theme)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  setTheme(theme: String) {
    console.log(theme)
    this.themeService.setTheme(theme);
  }
}
