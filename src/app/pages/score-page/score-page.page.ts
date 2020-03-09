import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {tween, correctDifficulty, addToHighscores, HIGHSCORES} from "../../services/globals";
import {XpBarComponent} from "../../components/xp-bar/xp-bar.component";
import {CountUp} from "countup.js";

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.page.html',
  styleUrls: ['./score-page.page.scss']
})

export class ScorePagePage {
  @ViewChild(XpBarComponent, null) xpBar: XpBarComponent;
  public highscores: any = [0, 0, 0];
  public countUp: any;
  public data: any = {
    points: 0,
    correctAnswers: 5,
    rounds: 10,
    category: 'lese'
  };

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state;
      } else {
        //this.router.navigate([`/`]);
      }
    });
  }

  ionViewDidEnter() {    
    if (this.data) {
      this.countUp = new CountUp('score-page-points-label', 0);
      this.countUp.update(this.data.points);
      
      let newRecord = addToHighscores(this.data.points, 1);
      this.highscores = HIGHSCORES[1];
      let animationElements = document.getElementsByClassName('fadeIn');

      Array.from(animationElements).forEach((element, i, arr) => {
        tween(element, "fadeInUp", "fast", null, null);
      });
      
      tween(document.getElementById('score-page-points'), "tada", 'slow', null, () => {
        let leveledUp = correctDifficulty(this.data.correctAnswers, this.data.rounds, this.data.category, this.data.points);
        let xpBarElements = this.xpBar.getElements();
        
        if (leveledUp.main) tween(xpBarElements.main, 'heartBeat', 'slow', null, null);
        if (leveledUp.category) tween(xpBarElements[leveledUp.categoryType], 'heartBeat', 'slow', null, null);
      });

      if (newRecord != undefined) {
        let highscoreElement = document.getElementById('highscore' + newRecord);
        tween(highscoreElement, "flash", "fast", null, null);
      }
    }
  }
}
