import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {
  GAME_HISTORY,
  getIsAfatiker,
  getUserGuid,
  GOALS_LIST,
  PLAYER_STATS,
  setRatingQuestion,
  setUserGuid
} from "../globals";
import {AngularFireAnalytics} from "@angular/fire/analytics";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public users: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, private analytics: AngularFireAnalytics) { 
    this.users = this.db.list('users');
  }
  
  async addGameHistory(data) {
    let GUID = getUserGuid();
    
    if (GUID) {
      let playerStatsRef = await this.db.database.ref(`/users/${GUID}/player_stats/`);
      let playerGoalsRef = await this.db.database.ref(`/users/${GUID}/player_goals/`);
      let gameHistoryRef = await this.db.database.ref(`/users/${GUID}/game_history/${data.id}/`);
      
      playerStatsRef.set(PLAYER_STATS);
      playerGoalsRef.child(`${GOALS_LIST.date}`).set(GOALS_LIST.list);
      gameHistoryRef.child('date').set(Date.now());
      gameHistoryRef.child(`data/${GAME_HISTORY[data.id].length - 1}`).set(data);
    } else {
      console.log("NO GUID SET AFTER INITIATION, SOMETHING'S PROBABLY WRONG!")
    }
  }
  
  logUserEvent(name, event) {
    this.analytics.logEvent(name, event);
  }
  
  async addUserRating(rate, gameId) {
    let GUID = getUserGuid();
    
    if (GUID && rate && gameId) {
      let playerRateRef = await this.db.database.ref(`/users/${GUID}/ratings/`);
      setRatingQuestion(gameId);

      playerRateRef.push({
        date: Date.now(),
        gameId: gameId,
        rate: rate
      });
    } else {
      console.log(GUID, rate, gameId, "SOME OF THESE ARE NOT VALID");
    }
  }
  
  async addConsent() {
    let GUID = getUserGuid();
    
    if (GUID) {
      let ref = await this.db.database.ref(`/users/${GUID}/`);
      ref.child('consent').set(Date.now());
    } else {
      console.log("COULD NOT GET GUID WHEN ADDING CONSENT");
    }
  }
  
  async disableAnalytics() {
    this.setAfatikerProp(false);
    
    await this.analytics.setAnalyticsCollectionEnabled(false);
    await this.analytics.setUserProperties({
      is_afatiker: 'false'
    });
  }
  
  async enableAnalytics() {
    this.setAfatikerProp(true);
    
    await this.analytics.setAnalyticsCollectionEnabled(true);
    await this.analytics.setUserProperties({
      isAfatiker: 'true'
    });
  }
  
  async setAfatikerProp(prop) {
    let GUID = getUserGuid();

    if (GUID) {
      let userAfatikerRef = await this.db.database.ref(`/users/${GUID}/`);
      userAfatikerRef.child('afatiker').set(prop);
    } else {
      console.log('COULD GET GUID SETTING PROP');
    }
  }
  
  async initiateAnalytics() {
    let isAfatiker = getIsAfatiker();
    
    if (isAfatiker) {
      this.enableAnalytics();
    } else {
      this.disableAnalytics();
    }
  }
  
  async initiateGuid() {
    if (!getUserGuid()) {
      let GUID = await this.db.createPushId();
      
      if (GUID) {
        setUserGuid(GUID);
        await this.analytics.setUserId(GUID);
      } else {
        console.log("COULD NOT FETCH NEW GUID");
      }
    }
  }
}
