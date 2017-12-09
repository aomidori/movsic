import { Component, ElementRef, Renderer, ViewChild } from '@angular/core';
import { ToastController, AlertController, Events, Tabs } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ExplorePage} from '../explore/explore';
import { MessagePage } from '../message/message';
import { MyprofilePage} from '../myprofile/myprofile';

import { AngularFireAuth} from 'angularfire2/auth';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // @ViewChild('myTabs') tabRef: Tabs;
  // mb: any;
  tab1Root = HomePage;
  tab2Root = ExplorePage;
  tab3Root = MessagePage;
  tab4Root = MyprofilePage;
  // tab1Root: any = HomePage;
  // tab2Root: any = ExplorePage;
  // tab3Root: any = MessagePage;
  // tab4Root: any = MyprofilePage;
  valueforngif = true;

  constructor(
    private afAuth: AngularFireAuth, private toast: ToastController,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private event: Events,
    public alertCtrl: AlertController,
    // public keyboard : Keyboard,
    ) {

  }
  // ionViewDidEnter(){
  //   this.keyboard.onKeyboardShow().subscribe(()=>this.valueforngif=false);
  //   this.keyboard.onKeyboardHide().subscribe(()=>this.valueforngif=true);
  // }
  // queryElement(elem:HTMLElement,q:string):HTMLElement{
  //   return <HTMLElement>elem.querySelector(q);
  // }
  // ionViewDidLoad(){
  //   let tabs = this.queryElement(this.elementRef.nativeElement,'.tabbar');
  //   this.event.subscribe('hideTabs',()=>{
  //     this.renderer.setElementStyle(tabs,'display','none');
  //     let SelectTab = this.tabRef.getSelected()._elementRef.nativeElement;
  //     let content = this.queryElement(SelectTab,'.scroll-content');
  //     this.mb = content.style['margin-bottom'];
  //     this.renderer.setElementStyle(content,'margin-bottom','0');
  //   });
  //   this.event.subscribe('showTabs',()=>{
  //     this.renderer.setElementStyle(tabs,'display','');
  //     let SelectTab = this.tabRef.getSelected()._elementRef.nativeElement;
  //     let content = this.queryElement(SelectTab,'.scroll-content');
  //     this.renderer.setElementStyle(content,'margin-bottom',this.mb);
  //   });
  // }
  ionViewWillLoad(){
    this.afAuth.authState.subscribe( res =>{
      console.log(res);
      if(res.displayName){
        this.toast.create({
          message: 'Welcome '+res.displayName,
          duration: 2000
        }).present();
      }else{
        this.toast.create({
          message: 'No authentication details',
          duration: 2000
        }).present();
      }
    });
  }

}
