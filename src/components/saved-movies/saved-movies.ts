import { Component } from '@angular/core';

/**
 * Generated class for the SavedMoviesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'saved-movies',
  templateUrl: 'saved-movies.html'
})
export class SavedMoviesComponent {

  text: string;

  constructor() {
    console.log('Hello SavedMoviesComponent Component');
  }

}
