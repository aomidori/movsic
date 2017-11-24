import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OmdbServiceProvider {
  private API_key = '98f5d014';
  private searchUrl: string;

  constructor(private _http: Http) {
  }

  //searchmovie with title
  searchMovie(title: string){
    this.searchUrl = 'http://www.omdbapi.com/?apikey='+this.API_key;
    this.searchUrl = this.searchUrl+'&s='+title+'&type=movie';
    return this._http.get(this.searchUrl)
      .map(res=>res.json());
  }

  getMovie(id: string){
    this.searchUrl = 'http://www.omdbapi.com/?apikey='+this.API_key;
    this.searchUrl = this.searchUrl+'&i='+id+'&type=movie&plot=short';
    return this._http.get(this.searchUrl)
      .map(res=>res.json());
  }




}
