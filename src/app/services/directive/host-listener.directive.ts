import {Directive, HostListener, Input} from '@angular/core';
import {FirebaseService} from "../firebase/firebase.service";

@Directive({
  selector: '[eventTracker]'
})
export class HostListenerDirective {

  @Input('eventTracker') action:any;

  @HostListener('click', ['$event']) onClick($event) {
    this.firebaseService.logUserEvent(this.action.name, this.action.event);
  }
  
  constructor(public firebaseService: FirebaseService) { }

}
