import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {tween, difficulty, getMatchImage} from "../../../services/globals";
import { CountUp } from 'countup.js';
import Speech from 'speak-tts';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-finn-ordet',
  templateUrl: './finn-ordet.page.html',
  styleUrls: ['./finn-ordet.page.scss']
})

export class FinnOrdetPage implements OnInit {  
  public maxRounds: number = 1;
  public questionImageElement: HTMLElement;
  public questionImageSrc: string = "";
  public alternativeBtns: any = [];
  public container: HTMLElement;
  public allowInput: boolean = false;
  public answeredCorrect: boolean = true;
  public maxTimeTaken: number = 30;
  public pointsElement: HTMLElement;
  public speech: any;
  public countUp: any;
  public timeStamp: number;
  public category: string = 'lese';
  
  public points: number;
  public correctAnswers;
  public round: number;
  public roundData: any;

  constructor(private router: Router) {}

  async ngOnInit() {
    //let orientation = window.screen.orientation;
    //await orientation.lock("portrait");

    /*this.speech = new Speech();
    this.speech.setLanguage('nb-NO');
    await this.speech.init({'rate': 0.75});*/

    //TODO: Change these to using local id #variable
    this.container = document.getElementById("main-container");
    this.pointsElement = document.getElementById("finn-ordet-points");
    this.questionImageElement = document.getElementById("question-image");
    [1, 2, 3, 4].forEach((i) => {
      let alternativeBtn = document.getElementById('alternative' + i);
      this.alternativeBtns.push(alternativeBtn);
    });

    this.countUp = new CountUp('finn-ordet-points', 0);
  }

  async ionViewWillEnter() {
    this.points = 0;
    this.correctAnswers = 0;
    this.round = 0;    
    this.roundData = getMatchImage("mat", [], difficulty, this.maxRounds);
    this.countUp.reset();
    
    await this.loadImages();
    
    this.startRound();
  }
  
  loadImages() {
    return new Promise((resolve, reject) => {
      let imagesLoaded = 0;
      
      for (const round of this.roundData) {
        this.loadImage(`./assets/img/games/images/mat/${round.src}`).then(res => {
          round.image = res;
          
          imagesLoaded++;
          if (imagesLoaded == this.maxRounds) resolve();
        }).catch(() => reject("Error loading images"));
      }
    });
  }
  
  addPoints(points, timeBonus) {
    this.points += Math.round((points * difficulty) + timeBonus);
    this.countUp.update(this.points);
    tween(this.pointsElement, "tada", "slow", null, null);
  }
  
  startRound() {
    this.container.style.visibility = "visible";
    this.answeredCorrect = true;
    this.questionImageSrc = this.roundData[this.round].image.src;
    this.alternativeBtns.forEach((btn, i) => {
      btn.color = "light";
      btn.innerHTML = this.roundData[this.round].alternatives[i].toUpperCase();
    });

    tween(this.container, "slideInRight", "fast", null, () => {
      this.timeStamp = Date.now();
      this.allowInput = true
    });    
  }
  
  endRound() {
    tween(this.container, "slideOutLeft", "fast", "out", () => {
      this.container.style.visibility = "hidden";
      this.round++;
      
      if (this.round >= this.maxRounds) {
        let data: NavigationExtras = {
          state: {
            points: this.points,
            correctAnswers: this.correctAnswers,
            rounds: this.maxRounds,
            category: 'lese'
          }
        };
        
        this.router.navigate([`/score-page`], data);
      } else {
        this.startRound();
      }
    });
  }

  loadImage(url) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      
      img.addEventListener('load', e => resolve(img));
      img.addEventListener('error', () => {
        reject(new Error(`Failed to load image's URL: ${url}`));
      });
      
      img.src = url;
    });
  }
  
  answer(evt) {    
    if (this.allowInput) {
      let target = evt.target;
      let answer = target.innerHTML;

      /*this.speech.cancel();
      
      this.speech.speak(<SpeechSynthesisUtterance>{
        text: answer,
      });*/
      
      if (answer.toUpperCase() == this.roundData[this.round].answer.toUpperCase()) {
        target.color = "success";
        this.allowInput = false;
        
        if (this.answeredCorrect) {
          this.correctAnswers++;
          
          let timeTaken = (Date.now() - this.timeStamp) / 1000;
          let timeBonus = Math.round(timeTaken < this.maxTimeTaken ? this.maxTimeTaken - timeTaken : 0);
          
          this.addPoints(30, timeBonus);
        } else {
          this.addPoints(10, 0);
        }

        tween(target, "pulse", "slow", null, () => {
          setTimeout(() => {
            this.endRound();
          }, 500);
        });
      } else {
        target.color = "danger";
        this.answeredCorrect = false;
        tween(target, "pulse", "faster", null, null);
      }
    }
  }
}
