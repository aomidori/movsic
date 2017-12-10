import { Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Artist } from '../../models/artist';
import { ArtistPage } from '../../pages/artist/artist';

@Component({
  selector: 'saved-artists',
  templateUrl: 'saved-artists.html'
})
export class SavedArtistsComponent {
  currentUserId: string;
  savedArtistsData: Observable<{}>;
  savedArtists: Artist[];
  num: int;

  constructor(
    private _dbService: FirebaseProvider,
    public nav: NavController, public navParams: NavParams,
  ) {
    this.currentUserId = this._dbService.getCurrentUserId();
    this.savedArtistsData = this._dbService.getSavedArtists(this.currentUserId);
    // Will change later, this is just for my profile so use currentuser


  }
  ngOnInit(){
    console.log("ngOnInit: savedArtists");
    this.getSavedList();
  }

  async getSavedList(){
	this.num = 0;
    this.savedArtists = [];
    let result = await this.savedArtistsData.subscribe(res=>{
      this.savedArtists = [];
      if(res){
        for (let id of Object.keys(res)){
          this._dbService.getArtist(id).subscribe(artistInfo =>{
            this.savedArtists.push(artistInfo);
			this.num = this.num+1;
          })
        }
		this.num = this.savedArtists.length;
      }
    })
  }

  public goToArtist(id: string){
    this.nav.push(ArtistPage, {artistId: id});
  }

}
