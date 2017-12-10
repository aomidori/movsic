import { Component } from '@angular/core';

/**
 * Generated class for the MovieTrackComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'movie-track',
  templateUrl: 'movie-track.html'
})
export class MovieTrackComponent {

  text: string;

  constructor() {
    console.log('Hello MovieTrackComponent Component');
    this.text = 'Hello World';
  }

}
