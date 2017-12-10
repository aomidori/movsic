import { Component } from '@angular/core';

/**
 * Generated class for the MovieCommentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'movie-comment',
  templateUrl: 'movie-comment.html'
})
export class MovieCommentComponent {

  text: string;

  constructor() {
    console.log('Hello MovieCommentComponent Component');
    this.text = 'Hello World';
  }

}
