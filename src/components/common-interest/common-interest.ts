import { Component } from '@angular/core';

/**
 * Generated class for the CommonInterestComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'common-interest',
  templateUrl: 'common-interest.html'
})
export class CommonInterestComponent {

  text: string;

  constructor() {
    console.log('Hello CommonInterestComponent Component');
    this.text = 'Hello World';
  }

}
