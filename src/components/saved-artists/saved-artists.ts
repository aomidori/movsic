import { Component } from '@angular/core';

/**
 * Generated class for the SavedArtistsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'saved-artists',
  templateUrl: 'saved-artists.html'
})
export class SavedArtistsComponent {

  text: string;

  constructor() {
    console.log('Hello SavedArtistsComponent Component');
    this.text = 'Hello World';
  }

}
