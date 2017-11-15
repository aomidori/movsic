import { NgModule, ErrorHandler, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
//import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';


import { ComponentsModule } from '../components/components.module';

import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { ExplorePage } from '../pages/explore/explore';
import { MessagePage } from '../pages/message/message';
import { MyprofilePage } from '../pages/myprofile/myprofile';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { SpotifyServiceProvider } from '../providers/spotify-service/spotify-service';
import { FirebaseProvider } from '../providers/firebase/firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBlicRsKMEVzeLmTx1EHzoPMAHuR8ZZbQc",
    authDomain: "movsic-kth2017.firebaseapp.com",
    databaseURL: "https://movsic-kth2017.firebaseio.com",
    projectId: "movsic-kth2017",
    storageBucket: "movsic-kth2017.appspot.com",
    messagingSenderId: "781103385356"
}

@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    LoginPage,
    AboutPage,
    HomePage, ExplorePage, MessagePage, MyprofilePage,
    TabsPage
  ],
  imports: [
    BrowserModule, HttpModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    //IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    LoginPage,
    AboutPage,
    HomePage, ExplorePage, MessagePage, MyprofilePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    SpotifyServiceProvider,
    FirebaseProvider
  ]
})
export class AppModule {}
