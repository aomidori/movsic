import { Component } from '@angular/core';

/**
 * Generated class for the SearchDropdownComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search-dropdown',
  templateUrl: 'search-dropdown.html'
})
export class SearchDropdownComponent {

  text: string;

  constructor() {
    console.log('Hello SearchDropdownComponent Component');
    this.text = 'Hello World';
  }

}
