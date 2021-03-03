import { Component, OnInit } from '@angular/core';
import {Line} from "../../models/line";
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  delay = 5;
  lines: Line[] = [
    {
      words: [
        {
          tick: this.delay + 1,
          duration: 1,
          transitionDuration: 0,
          value: 'Gonna'
        },
        {
          tick: this.delay + 2,
          duration: 5,
          transitionDuration: 0,
          value: 'rock'
        },
        {
          tick: this.delay + 7,
          duration: 1,
          transitionDuration: 0,
          value: ''
        },
      ]
    },
    {
      words: [
        {
          tick: this.delay + 8,
          duration: 1,
          transitionDuration: 0,
          value: 'The'
        },
        {
          tick: this.delay + 9,
          duration: 7,
          transitionDuration: 0,
          value: 'music'
        },
        {
          tick: this.delay + 15,
          duration: 0.1,
          transitionDuration: 0,
          value: 'is'
        },
        {
          tick: this.delay + 15,
          duration: 0.5,
          transitionDuration: 0,
          value: 'my'
        },
        {
          tick: this.delay + 15,
          duration: 1,
          transitionDuration: 0,
          value: 'soul'
        },
        // {
        //   tick: this.delay + 15,
        //   duration: 1,
        //   transitionDuration: 0,
        //   value: 'I keep'
        // },
        // {
        //   tick: this.delay + 15,
        //   duration: 1,
        //   transitionDuration: 0,
        //   value: 'the'
        // },
        // {
        //   tick: this.delay + 15,
        //   duration: 1,
        //   transitionDuration: 0,
        //   value: 'sound'
        // },
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
