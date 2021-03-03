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
          duration: 1,
          value: 'You better do what you want'
        },
        {
          tick: 2,
          duration: 1,
          value: 'Two'
        },
        {
          tick: 3,
          duration: 1,
          value: 'Three'
        },
      ]
    },
    {
      words: [
        {
          tick: 4,
          duration: 1,
          value: 'You'
        },
        {
          tick: 5,
          duration: 1,
          value: 'better'
        },
        {
          tick: 6,
          duration: 1,
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

}
