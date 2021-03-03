import { Component, OnInit } from '@angular/core';
import {Line} from "../../models/line";
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  lines: Line[] = [
    {
      words: [
        {
          tick: 1,
          duration: 5,
          transitionDuration: 0,
          value: 'You better do what you want'
        },
        {
          tick: 6,
          duration: 1,
          transitionDuration: 0,
          value: 'Two'
        },
        {
          tick: 7,
          duration: 1,
          transitionDuration: 0,
          value: 'Three'
        },
      ]
    },
    {
      words: [
        {
          tick: 8,
          duration: 1,
          transitionDuration: 0,
          value: 'You'
        },
        {
          tick: 9,
          duration: 7,
          transitionDuration: 0,
          value: 'better'
        },
        {
          tick: 15,
          duration: 1,
          transitionDuration: 0,
          value: 'do what you want'
        },
      ]
    }
  ];
  tickCounter = 0;
  lineCounter = 0;
  private sub: any;
  // @ts-ignore
  private subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.setTransitionDurations();
    //emit value in sequence every 10 second
    const source = interval(1 * 1000);
    this.subscription = source.subscribe(val => {
      this.do()
    });

    // this.playSong();
  }

  playSong(): void {
    for (this.tickCounter = 0; this.tickCounter < 999999; this.tickCounter++) {
debugger;
    }
  }

  do() {
    this.tickCounter++;
  }

  private setTransitionDurations(): void {
    this.lines.forEach(item => {
      item.words.forEach(word => {
        word.transitionDuration = this.getTransitionDuration(word.duration);
      })
    });
  }

  private getTransitionDuration(duration: number) {
    return (duration * 2 + 0.1) * 250;
  }
}
