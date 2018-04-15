import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ThemeService {
  private _darkTheme: Subject<boolean> = new Subject<boolean>();
  private _theme: Subject<String> = new Subject<String>();

  isDarkTheme = this._darkTheme.asObservable();
  theme = this._theme.asObservable();

  setDarkTheme(isDarkTheme: boolean) {
    this._darkTheme.next(isDarkTheme);
  }

  setTheme(theme) {
    this._theme.next(theme);
  }
}