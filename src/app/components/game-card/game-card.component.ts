import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
	@Input() item:any;

	constructor(private router : Router) {}

	ngOnInit() {}

	go(id) {
		this.router.navigate(['game-info', id]);
	}
}
