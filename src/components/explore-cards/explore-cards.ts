import { Component } from '@angular/core';
import { App, ViewController, NavController } from 'ionic-angular';
import { MoviePage } from '../../pages/movie/movie';
import { RecomPage } from '../../pages/recom/recom';

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
  movielink = MoviePage;
  recomPage = RecomPage;
  constructor(public nav: NavController) {
  }

  public goToMovie(){
    this.nav.push(MoviePage);
  }

}
