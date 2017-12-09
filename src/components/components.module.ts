import { NgModule } from '@angular/core';
import { ArtistRecommendComponent } from './artist-recommend/artist-recommend';
import { SoundtrackRecommendComponent } from './soundtrack-recommend/soundtrack-recommend';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SearchComponent } from './search/search';
import { SavedArtistsComponent } from './saved-artists/saved-artists';
import { SavedMoviesComponent } from './saved-movies/saved-movies';
import { UserCardComponent } from './user-card/user-card';
import { CommonInterestComponent } from './common-interest/common-interest';
import { ExploreCardsComponent } from './explore-cards/explore-cards';
import { MessagesComponent } from './messages/messages';
import { ExploreRecomComponent } from './explore-recom/explore-recom';
import { ReportErrorComponent } from './report-error/report-error';

@NgModule({
	declarations: [
		ArtistRecommendComponent,
    SoundtrackRecommendComponent,
    SearchComponent,
    SavedArtistsComponent,
    SavedMoviesComponent,
    UserCardComponent,
    CommonInterestComponent,
    ExploreCardsComponent,
    MessagesComponent,
    ExploreRecomComponent,
    ReportErrorComponent
	],
	imports: [
    IonicModule.forRoot(ArtistRecommendComponent),
		IonicModule.forRoot(SoundtrackRecommendComponent)
	],
	exports: [
		ArtistRecommendComponent,
    SoundtrackRecommendComponent,
    SearchComponent,
    SavedArtistsComponent,
    SavedMoviesComponent,
    UserCardComponent,
    CommonInterestComponent,
    ExploreCardsComponent,
    MessagesComponent,
    ExploreRecomComponent,
    ReportErrorComponent
	]
})
export class ComponentsModule {}
