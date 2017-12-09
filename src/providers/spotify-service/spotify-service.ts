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

  //private authUrl = 'https://accounts.spotify.com/authorize?';
  private tokenUrl = 'https://accounts.spotify.com/api/token';

  private ArtistUrl: string;
  private AlbumsUrl:string;
  private AlbumUrl:string;

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
    //headers.append('Content-Type', 'application/json');
    //this.tokenUrl = 'https://accounts.spotify.com/api/token?grant_type=client_credentials';
    //console.log(headers);
    return this._http.post(this.tokenUrl, params , {headers : headers})
        .map(res=>res.json());
  }

  setToken(token:string){
    this.access_token = token;
  }
  refreshToken(){
    return this.getToken()
      .subscribe(res=>{
        this.setToken(res.access_token);
      });
  }

  searchMusic(str: string, type='artist', token:string){
    //console.log("search "+ str);
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);

    this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=50&type='+type+'&market=SE';
    return this._http.get(this.searchUrl, {headers: headers})
        .map((res: Response) => res.json())
  }

  /*
   *  get artists          -------------------------------
  */

  getArtist(id:string, token:string){
    let headers = new Headers({'Authorization':'Bearer '+token});
    this.ArtistUrl = 'https://api.spotify.com/v1/artists/'+ id;
    return this._http.get(this.ArtistUrl, {headers: headers})
      .map((res:Response) => res.json())

  }
  getArtistAlbums(id:string, token:string){
    let headers = new Headers({'Authorization':'Bearer '+token});

    var url = 'https://api.spotify.com/v1/artists/'+id+'/albums?market=SE&limit=50';
    return this._http.get(url , {headers : headers})
        .map((res: Response) => res.json())
  }
  getRelatedArtists(id:string, token:string){
    let headers = new Headers({'Authorization':'Bearer '+token});

    var url = 'https://api.spotify.com/v1/artists/'+id+'/related-artists';
    return this._http.get(url , {headers : headers})
        .map((res: Response) => res.json())
  }

  /*
   *  get albums       -------------------------------
  */

  getAlbum(id:string, token:string){
    let headers = new Headers({'Authorization':'Bearer '+token});

    this.AlbumUrl = 'https://api.spotify.com/v1/albums/'+id;

    return this._http.get(this.AlbumUrl , {headers : headers})
        .map((res: Response) => res.json())

  }
  getAlbumArtists(id: string, token: string){
    let headers = new Headers({'Authorization':'Bearer '+token});

    this.AlbumUrl = 'https://api.spotify.com/v1/albums/'+id;
    return this._http.get(this.AlbumUrl , {headers : headers})
        .map((res: Response) => res.json().artists)

  }

  getAlbumTracks(id:string, token:string){
    let headers = new Headers({'Authorization':'Bearer '+token});

    this.AlbumUrl = 'https://api.spotify.com/v1/albums/'+id+'/tracks';
    return this._http.get(this.AlbumUrl , {headers : headers})
        .map((res: Response) => res.json())
  }


}
