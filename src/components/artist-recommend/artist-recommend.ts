import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello ArtistRecommendComponent Component');
    this.text = 'Hello World';
  }

}
