import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
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
  private redirect_uri:string;
  private access_token:string;
  private encoded = btoa(this.client_id + ':' + this.client_secret);

  private authUrl:string;

  constructor(private _http:Http) {

  }

  getToken(){
    let params = ('grant_type=client_credentials');
    let headers = new Headers();
    headers.append( 'Authorization', 'Basic ' + this.encoded);
    //headers.append('Content-Type' , 'application/x-www-form-urlencoded');
    return this._http.post('https://accounts.spotify.com/api/token', params , {headers : headers})
        .map(res=>res.json());
  }

  searchMusic(str: string, type='artist', token:string){
    let headers = new Headers();
    token = this.encoded;
    headers.append('Authorization' , 'Bearer ' + token);

    this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+ '&market=US';
    
    return this._http.get(this.searchUrl, {headers: headers})
        .map(res => res.json());
  }

}
