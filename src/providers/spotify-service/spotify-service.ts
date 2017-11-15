import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

/*
  Generated class for the SpotifyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpotifyServiceProvider {
  private searchUrl: string;
  private client_id = 'c2b7ccae1acf4d1ba0d4ce4aa0804ffc';
  private client_secret = '0f64d9ec5aa4450382e9b80bc47a1db5';
  private redirect_uri='http://localhost:8100/callback';
  private access_token:string;
  private encoded = btoa(this.client_id + ':' + this.client_secret);

  private authUrl = 'https://accounts.spotify.com/authorize?';
  private tokenUrl = 'https://accounts.spotify.com/api/token';

  constructor(private _http:Http) {

  }

  /*getToken(){
    this.authUrl+= 'response_type=token';
    this.authUrl+= '&client_id='+this.client_id;
    this.authUrl+= '&redirect_uri='+this.redirect_uri+' ';

    console.log('get '+this.authUrl);
    return this._http.get(this.authUrl)
      .map(res=>res.json());
  }*/
  getToken(){
    let params = ('grant_type=client_credentials');
    let headers = new Headers({'Authorization':'Basic '+this.encoded});
    headers.append('Content-Type' , 'application/x-www-form-urlencoded');
    //this.tokenUrl = 'https://accounts.spotify.com/api/token?grant_type=client_credentials';
    console.log(headers);
    return this._http.post(this.tokenUrl, params , {headers : headers})
        .map(res=>res.json());
  }

  searchMusic(str: string, type='artist', token:string){
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);

    this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+'&market=US';

    return this._http.get(this.searchUrl, {headers: headers})
        .map((res: Response) => res.json());
  }

}
