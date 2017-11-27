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


  extractMovieName(name: string){
    name = name.toLowerCase();
    if(name.indexOf('(')>0) name = name.substr(0,name.indexOf('('));
    if(name.indexOf('/')>0) name = name.substr(0,name.indexOf('/'));
    if(name.indexOf('-')>0) name = name.substr(0,name.indexOf('-'));

    name = name.replace('original motion picture soundtracks', '');
    name = name.replace('original soundtracks', '');
    name = name.replace('original motion picture soundtrack', '');
    name = name.replace('original soundtrack', '');
    name = name.replace('original film soundtrack', '');
    name = name.replace('soundtrack', '');
    name = name.replace('soundtracks', '');
    name = name.replace('o.s.t','');
    name = name.replace('/', '');
    name = name.replace('-', '');
    name = name.replace('(', '');
    name = name.replace(')','');
    name = name.trim();
    return name;
  }





}
