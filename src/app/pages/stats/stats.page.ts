
import {Component, OnInit, ViewChild} from '@angular/core';
import {
  convertToSingleDecimal,
  GAME_HISTORY, getAveragePercent,
  getReperioRate,
  getStatPercent,
  PLAYER_STATS, STATS_AVERAGE,
  STATS_LIST
} from "../../services/globals";
import { Chart } from 'chart.js';
import {ModalController} from "@ionic/angular";
import {FinnOrdetHistoryPage} from "../modals/finn-ordet-history/finn-ordet-history.page";
import moment from 'moment';
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.page.html',
  styleUrls: ['stats.page.scss']
})
export class StatsPage implements OnInit {
  @ViewChild('barChart', null) barChart;
  @ViewChild('lineChart', null) lineChart;
  @ViewChild('dateSelection', null) dateSelection;
  
  public barChartData: any;
  public lineChartData: any;
  public selectedOption: string;
  public subSelectedOption: string;
  private subscription: Subscription;
  
  public statPercent = getStatPercent;
  public statsList = STATS_LIST;
  public player = PLAYER_STATS;
  public statsKeys = Object.keys(PLAYER_STATS.stats);
  public lesePercent = getAveragePercent(STATS_AVERAGE.lese);
  public forstoelsePercent = getAveragePercent(STATS_AVERAGE.forsoelse);
  public gameList: any = ['finn-ordet', 'sant-usant', 'finn-bildet', 'ord-par'];
  public gameHistory: any = {
    'finn-ordet': [],
    'sant-usant': [],
    'finn-bildet': [],
    'ord-par': []
  };
  
  constructor(public modalController: ModalController, private router: Router) {
    Chart.defaults.global.legend.display = false;
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          let ctx = chart.chart.ctx;

          //Get options from the center object in options
          let centerConfig = chart.config.options.elements.center;
          let fontStyle = centerConfig.fontStyle || 'Arial';
          let txt = centerConfig.text;
          let color = centerConfig.color || '#000';
          let sidePadding = centerConfig.sidePadding || 20;
          let sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
          //Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          let stringWidth = ctx.measureText(txt).width;
          let elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          let widthRatio = elementWidth / stringWidth;
          let newFontSize = Math.floor(30 * widthRatio);
          let elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          let fontSizeToUse = Math.min(newFontSize, elementHeight);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          let centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          let centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 1.89);
          ctx.font = fontSizeToUse+"px " + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });

    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && (event.url === '/tabs/stats')) {
        this.updateHistoryList(this.dateSelection.value);
      }
    });
  }
  
  ngOnInit(): void {
    this.createBarChart();
    this.createLineChart();
    moment.locale('no');
  }

  async presentModal(data) {
    const modal = await this.modalController.create({
      component: FinnOrdetHistoryPage,
      componentProps: {
        'gameData': data
      }
    });
    
    return await modal.present();
  }

  ionViewWillEnter() {
    this.lesePercent = getAveragePercent(['verb', 'adjektiv', 'substantiv']);
    this.forstoelsePercent = getAveragePercent(['benevning', 'semantikk', 'hurtighet', 'auditiv']);

    this.updateBarChart();
  }
  
  getGameHistoryLabels() {
    return Object.keys(this.gameHistory).filter(key => this.gameHistory[key].length > 0);
  }
  
  getSelectionList() {
    return [...this.getGameHistoryLabels()]
  }
  
  updateHistoryList(day) {    
    let d = new Date();
    d.setHours(0,0,0,0);
    if (day == 'week') d.setDate(d.getDate() - 7);
    else if (day == 'month') d.setDate(d.getDate() - 30);
    else if (day == 'all') d.setTime(0);

    this.gameHistory['finn-ordet'] = GAME_HISTORY[1].filter(game => game.date > d.getTime()).sort((a, b) => a.date - b.date);
    this.gameHistory['sant-usant'] = GAME_HISTORY[2].filter(game => game.date > d.getTime()).sort((a, b) => a.date - b.date);
    this.gameHistory['finn-bildet'] = GAME_HISTORY[3].filter(game => game.date > d.getTime()).sort((a, b) => a.date - b.date);
    this.gameHistory['ord-par'] = GAME_HISTORY[4].filter(game => game.date > d.getTime()).sort((a, b) => a.date - b.date);
    
    this.updateLineChart();
  }
  
  updateBarChart() {
    this.barChartData.options.elements.center.text = getReperioRate();
    let grammatikkList = ['verb', 'adjektiv', 'substantiv'].map(stat => PLAYER_STATS.stats[stat]);
    let grammatikkAverage = convertToSingleDecimal(grammatikkList.reduce((n, v) => n + v) / 3);

    this.barChartData.data = {
      datasets: [{
        data: [grammatikkAverage, ...['benevning', 'semantikk', 'hurtighet', 'auditiv'].map(stat => PLAYER_STATS.stats[stat])],
        backgroundColor: [STATS_LIST['verb'].hex, ...['benevning', 'semantikk', 'hurtighet', 'auditiv'].map(stat => STATS_LIST[stat].hex)]
      }],
      labels: ['Lese', 'Benevning', 'Semantikk', 'Hurtighet', 'Auditiv']
    };

    this.barChartData.update();
  }
  
  updateLineChart() {    
    if (this.selectedOption) {
      this.lineChartData.data = {
        labels: this.gameHistory[this.selectedOption.toLowerCase()].map(game => this.getDate(game.date)/*moment(game.date).format('DD.MMM')*/),
        datasets: [this.getDataSet()]
      };
  
      this.lineChartData.update();
    }
  }
  
  getDataSet() {
    if (this.subSelectedOption == 'SVARTID') {
      this.lineChartData.options.scales.yAxes = [{
        ticks: {
          min: 0,
          max: 30,
          callback: function(value, index, values) {
            return value + 'sek';
          }
        }
      }];
      
      let data = this.gameHistory[this.selectedOption.toLowerCase()].map(game => {
        return {
          x: game.date,
          y: this.getAverageTimeTaken(game)
        }
      });
      
      return {
        label: "Gjennomsnittlig svartid",
        borderColor: "#a554bc",
        backgroundColor: 'rgba(0,0,0,0.0)',
        pointBackgroundColor: "#ffffff",
        pointRadius: 4,
        borderWidth: 2,
        data: data
      }
    } else if (this.subSelectedOption == 'VANSKELIGHETSGRAD') {
      this.lineChartData.options.scales.yAxes = [{
        ticks: {
          min: 1,
          max: 3
        }
      }];
      
      let data = this.gameHistory[this.selectedOption.toLowerCase()].map(game => {
        return {
          x: game.date,
          y: game.data.difficulty
        }
      });
      
      return {
        label: "Vanskelighetsgrad",
        borderColor: "#39BCA3",
        backgroundColor: 'rgba(0,0,0,0.0)',
        pointBackgroundColor: "#ffffff",
        pointRadius: 4,
        borderWidth: 2,
        data: data
      }
    } else if (this.subSelectedOption == 'RIKTIGE SVAR') {
      this.lineChartData.options.scales.yAxes = [{
        ticks: {
          min: 0,
          max: 100,
          callback: function(value) {
            return value + '%';
          }
        }
      }];
      
      let data = this.gameHistory[this.selectedOption.toLowerCase()].map(game => {
        return {
          x: game.date,
          y: Math.round((game.data.correctAnswers / game.data.rounds) * 100)
        }
      });
      
      return {
        label: "Riktige svar",
        borderColor: "#bcaf27",
        backgroundColor: 'rgba(0,0,0,0.0)',
        pointBackgroundColor: "#ffffff",
        pointRadius: 4,
        borderWidth: 2,
        data: data
      }
    } else {
      return {};
    }
  }
  
  getAverageTimeTaken(game) {
    let averageTime;
    let roundList = [];
    
    Object.values(game.data.gameHistory).forEach(round => {
      let guessList = [];
      Object.values(round).forEach(guess => guessList.push(guess.timeTaken));
      roundList.push((guessList.reduce((a, b) => a + b)) / guessList.length);
    });
    
    averageTime = (roundList.reduce((a, b) => a + b)) / roundList.length;
    
    return averageTime > 30 ? 30 : convertToSingleDecimal(averageTime);
  }

  createBarChart() {
    this.barChartData = new Chart(this.barChart.nativeElement, {
      type: 'doughnut',
      options: {
        elements: {
          center: {
            text: getReperioRate(),
            sidePadding: 40
          }
        },
        aspectRatio: 1
      }
    });
  }
  
  createLineChart() {
    this.lineChartData = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      options: {
        onClick: (a, b) => {
          if (b[0]) {
            let data = this.gameHistory[this.selectedOption.toLowerCase()][b[0]._index];
            if (data) {
              this.presentModal(data);
            }
          }
        }, 
        legend: {
          display: false,
          position: "top"
        },
        scales: {
          xAxes: [{
            ticks: {
              display: false,
            }
          }]
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 0,
            bottom: 0
          }
        }
      }
    });
  }
  
  getDate(date) {
    return moment(date).calendar();
  }
}
