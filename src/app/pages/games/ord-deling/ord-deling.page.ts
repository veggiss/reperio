import { Component, OnInit } from '@angular/core';
import {getOrddelingData, tween} from "../../../services/globals";
import {NavigationExtras, Router} from "@angular/router";
import {CountUp} from "countup.js";

@Component({
  selector: 'app-ord-deling',
  templateUrl: './ord-deling.page.html',
  styleUrls: ['./ord-deling.page.scss'],
})
export class OrdDelingPage implements OnInit {
  public container: HTMLElement;
  public sideLocked: string;
  public lastClickedElement: HTMLElement;
  public pointsElement: HTMLElement;
  public roundData: any = getOrddelingData();
  public image: string;
  public countUp: any;
  
  public allowInput = false;
  public round = 0;
  public points = 0;
  public maxRounds = this.roundData.length;
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.container = document.getElementById("main-container");
    this.pointsElement = document.getElementById('ord-deling-points');
    this.countUp = new CountUp('ord-deling-points', 0);
    
    this.startRound();
  }
  
  clearSelection() {
    document.querySelectorAll('ion-button').forEach(e => e.color = "light");
  }
  
  startRound() {
    this.container.style.visibility = "visible";
    this.lastClickedElement = null;
    this.clearSelection();
    this.image = '../../../../assets/img/games/images/' + this.roundData[this.round].image;
    
    tween(this.container, "slideInRight", "fast", null, () => {
      this.sideLocked = null;
      this.allowInput = true;
    });
  }
  
  endRound() {
    tween(this.container, "slideOutLeft", "fast", "out", () => {
      this.container.style.visibility = "hidden";
      this.round++;

      if (this.round >= this.maxRounds) {
        let data: NavigationExtras = {
          state: {
            points: 50,
            correctAnswers: 5,
            rounds: this.maxRounds,
            category: 'skrive'
          }
        };

        this.router.navigate([`/score-page`], data);
      } else {
        this.startRound();
      }
    });
  }

  answer(event, side) {
    if (this.allowInput) {      
      if (this.sideLocked) {
        if (side === this.sideLocked) {
          this.clearSelection();
          event.target.color = "dark";
          this.lastClickedElement = event.target;
        } else {
          let guessedWord = this.sideLocked === "left" ? this.lastClickedElement.innerHTML + event.target.innerHTML : event.target.innerHTML + this.lastClickedElement.innerHTML;
          this.allowInput = false;
          this.sideLocked = null;
          console.log(guessedWord, this.sideLocked);
          
          if (guessedWord === this.roundData[this.round].answer) {
            this.lastClickedElement.color = "success";
            event.target.color = "success";
            this.points += 30;
            this.countUp.update(this.points);
            tween(this.pointsElement, "tada", "slow", null, null);

            tween(event.target, "pulse", "slow", null, null);
            tween(this.lastClickedElement, "pulse", "slow", null, () => {
              this.lastClickedElement = null;
              this.sideLocked = null;
              
              setTimeout(() => {
                this.endRound();
              }, 500);
            });
          } else {
            this.lastClickedElement.color = "danger";
            event.target.color = "danger";

            tween(event.target, "pulse", "slow", null, null);
            tween(this.lastClickedElement, "pulse", "slow", null, () => {
              this.clearSelection();
              this.lastClickedElement = null;
              this.allowInput = true;
            });
          }
        }
      } else {
        this.sideLocked = side;
        event.target.color = "dark";
        this.lastClickedElement = event.target;
      }
    }
  }
  
  

}
