import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { PLAYER_STATS } from '../../services/globals'

@Component({
  selector: 'app-xp-bar',
  templateUrl: './xp-bar.component.html',
  styleUrls: ['./xp-bar.component.scss'],
})
export class XpBarComponent implements OnInit {
  public PLAYER_STATS: any = PLAYER_STATS;
  public levelElement: any;
  @ViewChild("level", {static: false, read: ElementRef } ) levelElementRef: ElementRef;
  @ViewChild("lese", {static: false, read: ElementRef } ) leseElementRef: ElementRef;
  @ViewChild("skrive", {static: false, read: ElementRef } ) skriveElementRef: ElementRef;
  @ViewChild("tale", {static: false, read: ElementRef } ) taleElementRef: ElementRef;
  @ViewChild("hjernetrim", {static: false, read: ElementRef } ) hjernetrimElementRef: ElementRef;
  @Input() color: string;

  constructor() { }

  ngOnInit() {
    this.levelElement = document.querySelector("#level-main");
  }
  
  getElements() {
    return {
      "main": this.levelElementRef.nativeElement,
      "lese": this.leseElementRef.nativeElement,
      "skrive": this.skriveElementRef.nativeElement,
      "tale": this.taleElementRef.nativeElement,
      "hjernetrim": this.hjernetrimElementRef.nativeElement
    }
  }

}
