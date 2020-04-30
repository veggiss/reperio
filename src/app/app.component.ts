import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {FirebaseService} from "./services/firebase/firebase.service";
import {getUserGuid} from "./services/globals";
import {NavigationEnd, Router} from "@angular/router";
import moment from 'moment';
import localization from 'moment/locale/nb';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public firebaseService: FirebaseService,
    public router: Router,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.firebaseService.initiateGuid();
      moment.updateLocale('nb', localization);
    });
  }
}
