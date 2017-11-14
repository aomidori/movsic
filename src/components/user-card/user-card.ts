import { Component } from '@angular/core';

/**
 * Generated class for the UserCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-card',
  templateUrl: 'user-card.html'
})
export class UserCardComponent {

  text: string;

  constructor() {
    console.log('Hello UserCardComponent Component');
    this.text = 'Hello World';
  }

}
