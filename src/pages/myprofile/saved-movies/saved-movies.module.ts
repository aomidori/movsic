import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavedMoviesPage } from './saved-movies';

@NgModule({
  declarations: [
    SavedMoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(SavedMoviesPage),
  ],
})
export class SavedMoviesPageModule {}
