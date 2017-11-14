import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavedArtistsPage } from './saved-artists';

@NgModule({
  declarations: [
    SavedArtistsPage,
  ],
  imports: [
    IonicPageModule.forChild(SavedArtistsPage),
  ],
})
export class SavedArtistsPageModule {}
