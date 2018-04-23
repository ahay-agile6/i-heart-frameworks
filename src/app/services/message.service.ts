import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class MessageService {

  constructor(
    private http: Http,
    private oauthService: OAuthService
  ) { }

  getMessages(apiBase) {
    const accessToken = this.oauthService.getAccessToken();
    const headers = new Headers({
      Authorization: 'Bearer ' + accessToken
    });
    // Make request
    return this.http.get(
      apiBase + '/api/messages',
      new RequestOptions({ headers: headers })
    )
    .map(res => {
      return res.json();
    });
  }

}
