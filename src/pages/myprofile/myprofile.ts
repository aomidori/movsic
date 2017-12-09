import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserCardComponent } from '../../components/user-card/user-card';
import { AcrServiceProvider } from "../../providers/acr-service/acr-service";
import {
  MediaCapture, MediaFile, CaptureError,
  CaptureAudioOptions
} from '@ionic-native/media-capture';


@IonicPage()
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {
  private filePath: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private mediaCapture: MediaCapture,
              // private iden: Identify.identity
              public acrService: AcrServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofilePage');
  }

  record(){
    let options: CaptureAudioOptions = { limit: 1,duration:12 };
    this.mediaCapture.captureAudio(options).then(
      (data: MediaFile[]) => {
        // console.log(data[0]['fullPath'],'this is data');
        // console.log(data[0]['name'],'this is name');
        // console.log(data[0]['size'],'this is size');
        this.filePath = data[0]['fullPath'];
        console.log(this.acrService.identifySong(data[0]['fullPath'],data[0]['name']),'identify')
        // this.acrService.identifySong(data[0]['fullPath'],data[0]['name'],data[0]['size'])
        // console.log(identify(data[0]['fullPath']))
      },
      (err: CaptureError) => console.error(err,'this is error')
    );
  }
  // _identify(){
  //   console.log(this.acrService.identifySong(this.filePath,data[0]['name']))
  // }

}
