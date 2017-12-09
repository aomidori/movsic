import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { MovieSoundtrack } from '../../models/movie-soundtrack';
import { MoviePage } from '../../pages/movie/movie';

@Component({
  selector: 'saved-movies',
  templateUrl: 'saved-movies.html'
})
export class SavedMoviesComponent {
  currentUserId: string;
  savedMoviesData: Observable<{}>;
  savedMovieSoundtracks: MovieSoundtrack[];

  constructor(
    private _dbService: FirebaseProvider,
    public nav: NavController, public navParams: NavParams,
  ) {
    this.currentUserId = this._dbService.getCurrentUserId();
    this.savedMoviesData = this._dbService.getSavedMovies(this.currentUserId);

  }

  ngOnInit(){
    this.getSavedList();
    console.log("ngONnit: savedMovies");
  }

  async getSavedList(){
    this.savedMovieSoundtracks =[];
    let result = await this.savedMoviesData.subscribe(res=>{
      this.savedMovieSoundtracks = [];
      if(res){
        for (let id of Object.keys(res)){
          this._dbService.getMovieSoundtrack(id).subscribe(soundtrackInfo => {
            this.savedMovieSoundtracks.push(soundtrackInfo);
          })
        }
      }
    })
  }

}
