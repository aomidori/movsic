import { Component } from '@angular/core';

/**
 * Generated class for the ExploreRecomComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'explore-recom',
  templateUrl: 'explore-recom.html'
})
export class ExploreRecomComponent {

  text: string;

  constructor() {
    console.log('Hello ExploreRecomComponent Component');
    this.text = 'Hello World';
  }

}
