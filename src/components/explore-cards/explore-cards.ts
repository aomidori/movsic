import { Component } from '@angular/core';

/**
 * Generated class for the ExploreCardsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'explore-cards',
  templateUrl: 'explore-cards.html'
})
export class ExploreCardsComponent {

  text: string;

  constructor() {
    console.log('Hello ExploreCardsComponent Component');
    this.text = 'Hello World';
  }

}
