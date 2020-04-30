import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {convertToSingleDecimal} from "../../services/globals";

@Component({
  selector: 'app-stat-bar',
  templateUrl: './stat-bar.component.html',
  styleUrls: ['./stat-bar.component.scss'],
})
export class StatBarComponent implements OnInit {
  @ViewChild("pointer", {static: false, read: ElementRef } ) pointerElementRef: ElementRef;
  @ViewChild("leftArrow", {static: false, read: ElementRef } ) leftArrowElementRef: ElementRef;
  @ViewChild("rightArrow", {static: false, read: ElementRef } ) rightArrowElementRef: ElementRef;
  
  @Input() color: string;
  @Input() class: string;
  @Input() value: number;
  @Input() type: string;
  
  constructor() { }

  ngOnInit() {}

  getElements() {
    return {
      "pointer": this.pointerElementRef.nativeElement,
      "leftArrow": this.leftArrowElementRef.nativeElement,
      "rightArrow": this.rightArrowElementRef.nativeElement,
    }
  }
  
  getOriginalValue(percentage) {
    return convertToSingleDecimal(1 + (3 - 1) * (percentage / 100)).toFixed(1)
  }
}
