import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { SmartAudioService } from './services/providers/smart-audio.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {AngularFireModule} from "@angular/fire";
import {AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService} from "@angular/fire/analytics";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SmartAudioService,
    NativeAudio,
    ScreenTrackingService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
