import { Component } from '@angular/core';

/**
 * Generated class for the ReportErrorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'report-error',
  templateUrl: 'report-error.html'
})
export class ReportErrorComponent {

  text: string;

  constructor() {
    console.log('Hello ReportErrorComponent Component');
    this.text = 'Hello World';
  }

}
