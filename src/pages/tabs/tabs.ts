import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ExplorePage} from '../explore/explore';
import { MessagePage } from '../message/message';
import { MyprofilePage} from '../myprofile/myprofile';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ExplorePage;
  tab3Root = MessagePage;
  tab4Root = MyprofilePage;


  constructor() {

  }
}
