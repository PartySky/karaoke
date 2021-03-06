import { Component, OnInit } from '@angular/core';
import {Line} from "../../models/line";
import { interval, Subscription } from 'rxjs';
import {Word} from "../../models/word";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  delay = 5;
  nextLinePosition = 0;
  currentLinePosition = 0;
  durationFactor = 1600;

  line0: Line = {endTick: 0, startTick: 0, words: [], position: 0};
  line1: Line = {endTick: 0, startTick: 0, words: [], position: 0};

  lines: Line[] = [
    {
      words: [
        {
          tick: this.delay + 1,
          duration: 1,
          transitionDuration: 0,
          value: 'Кошка'
        },
        {
          tick: this.delay + 2,
          duration: 5,
          transitionDuration: 0,
          value: 'хочет курить,'
        },
        {
          tick: this.delay + 7,
          duration: 1,
          transitionDuration: 0,
          value: ''
        },
      ],
      startTick: 0,
      endTick: 0,
      position: 0,
    },
    {
      words: [
        {
          tick: this.delay + 8,
          duration: 1,
          transitionDuration: 0,
          value: 'У'
        },
        {
          tick: this.delay + 9,
          duration: 7,
          transitionDuration: 0,
          value: 'кошки'
        },
        {
          tick: this.delay + 15,
          duration: 0.1,
          transitionDuration: 0,
          value: 'намокли'
        },
        {
          tick: this.delay + 15,
          duration: 0.5,
          transitionDuration: 0,
          value: 'уши'
        }
      ],

      startTick: 0,
      endTick: 0,
      position: 0,
    },
    {
      words: [
        {
          tick: this.delay + 16,
          duration: 1,
          transitionDuration: 0,
          value: 'Кошка'
        },
        {
          tick: this.delay + 17,
          duration: 7,
          transitionDuration: 0,
          value: 'хочет'
        },
        {
          tick: this.delay + 24,
          duration: 0.1,
          transitionDuration: 0,
          value: 'скулить'
        },
      ],

      startTick: 0,
      endTick: 0,
      position: 0,
    },
    {
      words: [
        {
          tick: this.delay + 27,
          duration: 5,
          transitionDuration: 0,
          value: 'Ей'
        },
        {
          tick: this.delay + 38,
          duration: 7,
          transitionDuration: 0,
          value: ', как'
        },
        {
          tick: this.delay + 45,
          duration: 0.1,
          transitionDuration: 0,
          value: 'и собаке,'
        },
        {
          tick: this.delay + 46,
          duration: 0.5,
          transitionDuration: 0,
          value: 'хоть кто-то'
        },
        {
          tick: this.delay + 47,
          duration: 5,
          transitionDuration: 0,
          value: 'да нужен.'
        },
      ],

      startTick: 0,
      endTick: 0,
      position: 0,
    }
  ];
  tickCounter = 0;
  lineCounter = 0;
  // @ts-ignore
  private subscription: Subscription;
  private maxLinePosition = 1;

  constructor() { }

  ngOnInit(): void {
    this.setTransitionDurations();
    this.setLinesTicks();
    this.setLinesPositions();
    //emit value in sequence every 10 second
    const source = interval(1 * 1000);
    this.subscription = source.subscribe(val => {
      this.doMainCycle()
    });
  }

  playSong(): void {
    for (this.tickCounter = 0; this.tickCounter < 999999; this.tickCounter++) {
debugger;
    }
  }

  doMainCycle() {
    this.tickCounter++;
    const currentLinesTemp: Line[] = [];
    this.line0 = {endTick: 0, position: 0, startTick: 0, words: []};
    this.line1 = {endTick: 0, position: 0, startTick: 0, words: []};
    let lineIndexCounter = 0;
    let currentLineIndex = 0;

    this.lines.forEach(item => {
      if (currentLinesTemp.length === 0 &&
        this.tickCounter >= item.startTick && this.tickCounter < item.endTick) {
        currentLinesTemp.push(item);

        currentLineIndex = lineIndexCounter;
      }
      lineIndexCounter++;
    });

    let nextLine: Line = {endTick: 0, position: 0, startTick: 0, words: []};

    if (!currentLinesTemp || !currentLinesTemp.length) {
      let nextLinesTemp = this.lines.filter(item => {
        return item.startTick > this.tickCounter;
      });
      if (nextLinesTemp.length) {
        nextLine = nextLinesTemp[0];
      }
    } else if (currentLineIndex + 1 < this.lines.length) {
      nextLine = this.lines[currentLineIndex + 1];
    }

    if (nextLine.position === 0) {
      this.line0 = nextLine;
    } else {
      this.line1 = nextLine;
    }

    if(currentLinesTemp && currentLinesTemp.length) {
      if (currentLinesTemp[0].position === 0) {
        this.line0 = currentLinesTemp[0];
      } else {
        this.line1 = currentLinesTemp[0];
      }
    }
  }

  private setTransitionDurations(): void {
    this.lines.forEach(item => {
      item.words.forEach(word => {
        word.transitionDuration = this.getTransitionDuration(word.duration);
      })
    });
  }

  private getTransitionDuration(duration: number) {
    // return (duration * 2 + 0.1) * 750;
    return duration * this.durationFactor;
  }

  private setLinesTicks() {
    let numberCounter = 0;
    this.lines.forEach(item => {
      item.startTick = this.getMinTick(item.words);
      item.endTick = this.getMaxTick(item.words);
      numberCounter++;
    });
  }

  private getMinTick(words: Word[]) {
    let result = words[0].tick;

    words.forEach(item => {
      if (item.tick < result) {
        result = item.tick;
      }
    });

    return result;
  }

  private getMaxTick(words: Word[]) {
    let result = 0;

    words.forEach(item => {
      if (item.tick + item.duration > result) {
        result = item.tick + item.duration;
      }
    });

    return result;
  }

  getNextLinePosition(nextLinePosition: number) {
    let result = 0;
    result = nextLinePosition >= this.maxLinePosition ? 0 : this.nextLinePosition + 1;
    return result;
  }

  private setLinesPositions() {
    let i = 0

    this.lines.forEach(item => {
      item.position = i;
      i = this.getNextLinePosition(i);
    });
    debugger;
  }
}
