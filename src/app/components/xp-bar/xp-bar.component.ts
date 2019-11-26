import { Component, OnInit } from '@angular/core';
import { PLAYER_STATS } from '../../services/globals'

@Component({
  selector: 'app-xp-bar',
  templateUrl: './xp-bar.component.html',
  styleUrls: ['./xp-bar.component.scss'],
})
export class XpBarComponent implements OnInit {
  public PLAYER_STATS: any = PLAYER_STATS;

  constructor() { }

  ngOnInit() {}

}
