import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecognitionPage } from './recognition';

@NgModule({
  declarations: [
    RecognitionPage,
  ],
  imports: [
    IonicPageModule.forChild(RecognitionPage),
  ],
})
export class RecognitionPageModule {}
