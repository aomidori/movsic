import { Component } from '@angular/core';
import { App, ViewController, NavController } from 'ionic-angular';
import { ArtistPage } from '../../pages/artist/artist';

/**
 * Generated class for the ArtistRecommendComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'artist-recommend',
  templateUrl: 'artist-recommend.html'
})
export class ArtistRecommendComponent {

  artistPage = ArtistPage;

  constructor(public nav: NavController) {
  }
  public goToArtist(){
    this.nav.push(ArtistPage);
  }

}
