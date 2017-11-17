import { Component } from '@angular/core';

/**
 * Generated class for the MessagesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'messages',
  templateUrl: 'messages.html'
})
export class MessagesComponent {

  text: string;

  constructor() {
    console.log('Hello MessagesComponent Component');
    this.text = 'Hello World';
  }

}
