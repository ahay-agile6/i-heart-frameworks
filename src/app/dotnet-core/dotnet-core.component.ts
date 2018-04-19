import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { OktaAuthWrapper } from '../auth/okta.auth.wrapper';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OAuthService } from 'angular-oauth2-oidc';

interface Message {
  date: String,
  text: String
}

@Component({
  selector: 'app-dotnet-core',
  templateUrl: './dotnet-core.component.html',
  styleUrls: ['./dotnet-core.component.scss']
})
export class DotnetCoreComponent implements OnInit {
  messages: Array<Message> = [];
  constructor(
    private themeService: ThemeService,
    private oauthService: OAuthService,
    private http: Http
  ) { }

  async ngOnInit() {
    this.setTheme();

    // const accessToken = await this.oktaAuth.getAccessToken();
    const accessToken = await this.oauthService.getAccessToken
    const headers = new Headers({
      Authorization: 'Bearer ' + accessToken
    });
    // Make request
    this.http.get(
      'http://localhost:5001/api/messages',
      new RequestOptions({ headers: headers })
    )
    .map(res => res.json())
    .subscribe((messages: Array<Message>) => messages.forEach(message => this.messages.push(message)));
  }  

  setTheme() {
    this.themeService.setTheme('dotnet-core');
  }

}
