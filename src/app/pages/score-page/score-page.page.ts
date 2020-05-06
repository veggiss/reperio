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
  toggleSoundMuted,
  getAveragePercent,
  STATS_AVERAGE,
  getSoundMuted,
  printFunction,
  GAMES_LIST,
  GOALS_LIST,
  getDailyGoalsDone,
  updateScrollBar
} from "../../services/globals";
import {XpBarComponent} from "../../components/xp-bar/xp-bar.component";
import {CountUp} from "countup.js";
import {StatBarComponent} from "../../components/stat-bar/stat-bar.component";
import {FirebaseService} from "../../services/firebase/firebase.service";
import {SmartAudioService} from "../../services/providers/smart-audio.service";
import {ToastController} from "@ionic/angular";

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
  @ViewChild('ionContent', null) ionContent;
  
  public countUp: any;
  public rounds;

  public getSoundMuted: any = getSoundMuted;
  public toggleSoundMuted: any = toggleSoundMuted;
  public statPercent: any = getStatPercent;
  public statsList = STATS_LIST;
  public statsKeys: any = [];
  public highscores: any = [0, 0, 0];
  public history: boolean = true;
  public difficultyPercent = 50;
  public lesePercent = getAveragePercent(STATS_AVERAGE.lese);
  public forstoelsePercent = getAveragePercent(STATS_AVERAGE.forsoelse);
  public playbackRate = 0.5;
  public data: any = {
    id: 1,
    points: 0,
    correctAnswers: 0,
    rounds: 1,
    statPoints: {}
  };

  constructor(private route: ActivatedRoute, private router: Router, public firebaseService: FirebaseService, private smartAudio: SmartAudioService, public toastController: ToastController) {    
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
    this.smartAudio.preload('countup_points', '../../../../assets/audio/fx/countup_points.mp3');
    this.smartAudio.preload('level_up', '../../../../assets/audio/fx/level_up.mp3');
    this.highscores = HIGHSCORES[this.data.id];
    this.rounds = this.data.rounds;
    this.playbackRate = 0.5;
    
    
    if (this.history) document.getElementById('score-page-points-label').innerText = this.data.points;
  }

  playAudio(key, noReset?, cloneNode?, rate?) {
    if (!getSoundMuted()) this.smartAudio.play(key, noReset, cloneNode, rate);
  }

  ionViewDidEnter() {
    updateScrollBar(this.ionContent.el);
    
    if (this.data) {      
      if (!this.history) {
        this.countUp = new CountUp('score-page-points-label', 0);
        
        let playrate = 0.75;
        this.countUp.updateCallback = () => this.playAudio('countup_tick', true, true, playrate += 0.05);
        
        this.countUp.printValue = printFunction;
        //this.playAudio('countup_points');
        this.countUp.update(this.data.points);
        this.highscores = [...HIGHSCORES[this.data.id]];
        let newRecord = addToHighscores(this.data.points, this.data.id);
        let dailyGoalsDone = getDailyGoalsDone();
        let unlockedGame = false;

        Array.from(document.getElementsByClassName('fadeIn')).forEach(element => {
          tween(element, "fadeInUp", "fast", null, null);
        });

        tween(document.getElementById('score-page-points'), "tada", 'slow', null, () => {
          let leveledUp = correctDifficulty(this.data.correctAnswers, this.data.rounds, this.data.category, this.data.points, this.data.id);
          let xpBarElements = this.xpBar.getElements();

          if (leveledUp) {
            let newGame = GAMES_LIST.filter(game => game.levelReq == PLAYER_STATS.level);
            if (newGame.length > 0) {
              unlockedGame = true;
              this.showNewGameToast(newGame[0]);
            }
            
            tween(xpBarElements.main, 'heartBeat', 'slow', null, null);
            this.playAudio('level_up');
          }

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
          
          // Correct bar and add history
          this.correctStatBars();
          
          // Check if daily goals are met after adding game history
          if (dailyGoalsDone < getDailyGoalsDone()) {
            this.showDailyGoalsToast(unlockedGame);
          }
        });
      }
    }
  }

  async ionViewWillLeave() {
    let dismiss = await this.toastController.getTop();
    if (dismiss) this.toastController.dismiss();
  }

  async showNewGameToast(item) {
    const toast = await this.toastController.create({
      message: `<b>NYTT SPILL: ${item.title}</b>`,
      color: 'dark',
      position: 'bottom',
      cssClass: ['toast-class', 'toast-bottom'],
      buttons: [
        {
          text: 'GÅ TIL SPILL',
          handler: () => {
            this.router.navigate(['game-info', item.id]);
          }
        }, {
          side: 'end',
          icon: 'close-circle-outline',
          role: 'cancel'
        }
      ]
    });
    
    toast.present();
  }

  async showDailyGoalsToast(top) {
    let classes = top ? ['toast-class', 'toast-top'] : ['toast-class', 'toast-bottom'];
    
    const toast = await this.toastController.create({
      message: `<b>DAGLIGE MÅL FULLFØRT: ${getDailyGoalsDone()} AV ${GOALS_LIST.list.length}</b>`,
      color: 'dark',
      position: 'bottom',
      cssClass: classes,
      buttons: [{
          side: 'end',
          icon: 'close-circle-outline',
          role: 'cancel'
        }
      ]
    });
    
    toast.present();
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
    this.firebaseService.addGameHistory(this.data);
  }
}
