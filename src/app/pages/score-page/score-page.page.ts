import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  tween,
  correctDifficulty,
  addToHighscores,
  HIGHSCORES,
  DIFFICULTY,
  addGameHistory,
  GAME_HISTORY,
  getDifficultyPercent,
  getStatPercent,
  STATS_LIST,
  PLAYER_STATS,
  addPlayerStats,
  getAveragePercent, STATS_AVERAGE, updateGoals
} from "../../services/globals";
import {XpBarComponent} from "../../components/xp-bar/xp-bar.component";
import {CountUp} from "countup.js";
import {StatBarComponent} from "../../components/stat-bar/stat-bar.component";
import {FirebaseService} from "../../services/firebase/firebase.service";

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.page.html',
  styleUrls: ['./score-page.page.scss']
})

export class ScorePagePage implements OnInit {
  @ViewChild(XpBarComponent, null) xpBar: XpBarComponent;
  @ViewChild('difficultyBar', null) difficultyBar: StatBarComponent;
  @ViewChild('forstoelseBar', null) forstoelseBar: StatBarComponent;
  @ViewChild('leseBar', null) leseBar: StatBarComponent;
  
  public countUp: any;
  public rounds;
  public winPercent;
  
  public statPercent: any = getStatPercent;
  public statsList = STATS_LIST;
  public statsKeys: any = [];
  public highscores: any = [0, 0, 0];
  public history: boolean = true;
  public difficultyPercent = 50;
  public lesePercent = getAveragePercent(STATS_AVERAGE.lese);
  public forstoelsePercent = getAveragePercent(STATS_AVERAGE.forsoelse);
  public data: any = {
    id: 1,
    points: 0,
    correctAnswers: 0,
    rounds: 1,
    statPoints: {}
  };

  constructor(private route: ActivatedRoute, private router: Router, public firebaseService: FirebaseService) {    
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        let data = this.router.getCurrentNavigation().extras.state;
        
        if (data) {          
          if (data.history) {
            this.data = data.data;
          } else {
            this.history = false;
            this.data = data;
          }

          this.difficultyPercent = getDifficultyPercent(this.data.id);
          this.statsKeys = Object.keys(this.data.statPoints);
        }
      } else {
        //this.router.navigate([`/`]);
      }
    });
  }
  
  ngOnInit() {
    this.winPercent = Math.round((this.data.correctAnswers / this.data.rounds) * 100);
    this.highscores = HIGHSCORES[this.data.id];
    this.rounds = this.data.rounds;
    
    if (this.history) document.getElementById('score-page-points-label').innerText = this.data.points;
  }

  ionViewDidEnter() {    
    if (this.data) {      
      if (!this.history) {
        this.countUp = new CountUp('score-page-points-label', 0);
        this.countUp.update(this.data.points);
        this.highscores = [...HIGHSCORES[this.data.id]];
        let newRecord = addToHighscores(this.data.points, this.data.id);

        Array.from(document.getElementsByClassName('fadeIn')).forEach(element => {
          tween(element, "fadeInUp", "fast", null, null);
        });

        tween(document.getElementById('score-page-points'), "tada", 'slow', null, () => {
          let leveledUp = correctDifficulty(this.data.correctAnswers, this.data.rounds, this.data.category, this.data.points, this.data.id);
          let xpBarElements = this.xpBar.getElements();

          if (leveledUp.main) tween(xpBarElements.main, 'heartBeat', 'slow', null, null);

          if (newRecord != undefined) {
            this.highscores = HIGHSCORES[this.data.id];
            let highscoreElement = document.getElementById('highscore' + newRecord);
            let highscoreArrowElement = highscoreElement.querySelector('.arrow');

            highscoreArrowElement.setAttribute('style', 'opacity: 1;');

            tween(highscoreArrowElement, "fadeInLeft", "fast", null, null);
            tween(highscoreElement, "flash", "fast", null, null);
          }
          
          this.statsKeys.forEach(stat => {
            if (PLAYER_STATS.stats[stat]) addPlayerStats(stat, this.data.statPoints[stat]);
          });
          
          this.correctStatBars();
        });
      }
    }
  }
  
  correctStatBars() {
    let newLesePercent = getAveragePercent(STATS_AVERAGE.lese);
    let newDifficultyPercent = getDifficultyPercent(this.data.id);
    let newForstoelsePercent = getAveragePercent(STATS_AVERAGE.forsoelse);
    
    [{newValue: newLesePercent, currentValue: this.lesePercent, bar: this.leseBar}, 
      {newValue: newForstoelsePercent, currentValue: this.forstoelsePercent, bar: this.forstoelseBar},
      {newValue: newDifficultyPercent, currentValue: this.difficultyPercent, bar: this.difficultyBar}].forEach(o => {
        if (o.newValue != o.currentValue) {
          tween(o.bar.getElements().pointer, 'flash', 'fast', null, null);
          
          if (o.newValue > o.currentValue) o.bar.getElements().rightArrow.style.opacity = 1;
          else if (o.newValue < o.currentValue) o.bar.getElements().leftArrow.style.opacity = 1;
      }
    });
    
    this.lesePercent = newLesePercent;
    this.difficultyPercent = newDifficultyPercent;
    this.forstoelsePercent = newForstoelsePercent;
    
    this.data.difficulty = DIFFICULTY[this.data.id];

    addGameHistory(this.data);
    updateGoals(this.data);
    this.firebaseService.addGameHistory(this.data);
  }
}
