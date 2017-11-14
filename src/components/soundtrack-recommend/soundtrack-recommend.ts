import { Component } from '@angular/core';

/**
 * Generated class for the SoundtrackRecommendComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'soundtrack-recommend',
  templateUrl: 'soundtrack-recommend.html'
})
export class SoundtrackRecommendComponent {

  text: string;

  constructor() {
    console.log('Hello SoundtrackRecommendComponent Component');
  }

}
