import { NgModule, ErrorHandler, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';

import { FIREBASE_CONFIG} from './app.firebase.config'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
//import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';


import { ComponentsModule } from '../components/components.module';

/*
 *   Pages import
 *               */

import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { ExplorePage } from '../pages/explore/explore';
import { MessagePage } from '../pages/message/message';
import { MyprofilePage } from '../pages/myprofile/myprofile';
import { TabsPage } from '../pages/tabs/tabs';
import { MoviePage } from '../pages/movie/movie';
import { ArtistPage} from '../pages/artist/artist';
import { RecomPage } from '../pages/recom/recom';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SpotifyServiceProvider } from '../providers/spotify-service/spotify-service';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { OmdbServiceProvider } from '../providers/omdb-service/omdb-service';

@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    LoginPage,
    AboutPage,
    HomePage, ExplorePage, MessagePage, MyprofilePage,
    TabsPage,
    MoviePage, ArtistPage,
	RecomPage
  ],
  imports: [
    BrowserModule, HttpModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
    }),
    //IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    LoginPage,
    AboutPage,
    HomePage, ExplorePage, MessagePage, MyprofilePage,
    TabsPage,
    MoviePage, ArtistPage,
	RecomPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpotifyServiceProvider,
    FirebaseProvider,
    InAppBrowser,
    OmdbServiceProvider
  ]
})
export class AppModule {}
