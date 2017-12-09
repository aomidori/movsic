import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  private alertCtrl: AlertController
			  ) {
  }
  
  presentAlert() {
    let alert = this.alertCtrl.create({
 	  title: 'Report Received',
	  subTitle: 'We have got your report! Thanks for your kind help. We will look into it.',
	  buttons: ['OK']
	});
	alert.present();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

}
