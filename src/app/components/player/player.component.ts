import { Component, OnInit } from '@angular/core';
import {Line} from "../../models/line";
import { interval, Subscription } from 'rxjs';
import {Word} from "../../models/word";
import {Midi} from "@tonejs/midi";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  delay = 5;
  nextLinePosition = 0;
  currentLinePosition = 0;
  // durationFactor = 1600;
  durationFactor = 1;

  line0: Line = {endTick: 0, startTick: 0, words: [], position: 0};
  line1: Line = {endTick: 0, startTick: 0, words: [], position: 0};

  lines: Line[] = [
    {
      words: [
        {
          // Empty note
          ticks: this.delay + 1,
          duration: 1,
          transitionDuration: 0,
          value: ''
        },
        {
          ticks: this.delay + 1,
          duration: 1,
          transitionDuration: 0,
          value: 'I'
        },
        {
          ticks: this.delay + 1,
          duration: 1,
          transitionDuration: 0,
          value: 'n'
        },
        {
          ticks: this.delay + 1,
          duration: 1,
          transitionDuration: 0,
          value: 't'
        },
        {
          ticks: this.delay + 1,
          duration: 1,
          transitionDuration: 0,
          value: 'r o'
        },
        {
          ticks: this.delay + 1,
          duration: 1,
          transitionDuration: 0,
          value: '1234'
        },
        {
          ticks: this.delay + 1,
          duration: 1,
          transitionDuration: 0,
          value: 'Кошка'
        },
        {
          ticks: this.delay + 2,
          duration: 5,
          transitionDuration: 0,
          value: 'хочет,'
        },
        {
          ticks: this.delay + 7,
          duration: 1,
          transitionDuration: 0,
          value: 'курить,'
        },
        {
          ticks: this.delay + 7,
          duration: 1,
          transitionDuration: 0,
          value: 'курить,'
        },
      ],
      startTick: 0,
      endTick: 0,
      position: 0,
    },
    {
      words: [
        {
          ticks: this.delay + 8,
          duration: 1,
          transitionDuration: 0,
          value: 'У кошки намокли'
        },
        {
          ticks: this.delay + 15,
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
          ticks: this.delay + 16,
          duration: 1,
          transitionDuration: 0,
          value: 'Кошка'
        },
        {
          ticks: this.delay + 17,
          duration: 7,
          transitionDuration: 0,
          value: 'хочет'
        },
        {
          ticks: this.delay + 24,
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
          ticks: this.delay + 27,
          duration: 5,
          transitionDuration: 0,
          value: 'Ей,'
        },
        {
          ticks: this.delay + 38,
          duration: 7,
          transitionDuration: 0,
          value: 'как и собаке'
        },
        {
          ticks: this.delay + 45,
          duration: 0.1,
          transitionDuration: 0,
          value: ', хоть'
        },
        {
          ticks: this.delay + 46,
          duration: 0.5,
          transitionDuration: 0,
          value: 'кто-то'
        },
        {
          ticks: this.delay + 47,
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
  // @ts-ignore
  private startTime: Date;
  ticksInOneBar = 1920;
  mainCycleStepTicks = this.ticksInOneBar / (256 * 2);

  constructor() { }

  ngOnInit(): void {
    this.setLinesData();
    //emit value in sequence every 10 second
    const oneSecond = 1000;
    // const source = interval(1 * oneSecond);

    /*

    120 bits per second

    bar = 1, 4 beats = 1 bar, 60seconds = bpm(1minute)

    1bar * 4beats =4
    4/100bpm ====0.04
    0.04*60(seconds it take to comeplete 1 minute)=2.4seconds

    2.4 seconds to play 1 bar


    this is based on 4/4 measure


    * */



    const BPM = 120;

    const x = oneSecond / BPM;

    const stepSeconds = this.ticksToSeconds(this.mainCycleStepTicks);

    // const source = interval(oneSecond/4);
    const source = interval(stepSeconds * oneSecond);
    this.setStartTime();
    this.subscription = source.subscribe(val => {
      this.doMainCycle()
    });


    // test
    // let tempo = 120;
    // let quarterNoteTime = 60/tempo*1000;
    //
    // setTimeout (() => {
    //   this.doMainCycle();
    //   console.log('test');
    // }, quarterNoteTime);

    this.getFileFromUrl();
  }

  setLinesData() {
    this.setTransitionDurations();
    this.setLinesTicks();
    this.setLinesPositions();
  }

  playSong(): void {
    for (this.tickCounter = 0; this.tickCounter < 999999; this.tickCounter++) {
    }
  }

  setStartTime() {
    this.startTime = new Date();
  }

  doMainCycle() {
    let currentTimeTemp = new Date();
    if (this.tickCounter === 1920) {
      let xTest = this.ticksToSeconds(this.tickCounter);

      let diff = currentTimeTemp.getTime() - this.startTime.getTime();
      let time = diff / 1000;
      console.log(time);
    }

    // this.tickCounter++;
    this.tickCounter = this.tickCounter + (this.mainCycleStepTicks);

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
    // return duration * this.durationFactor;
    return this.ticksToSeconds(duration) * 1000 * 1.5;
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
    let result = words[0].ticks;

    words.forEach(item => {
      if (item.ticks < result) {
        result = item.ticks;
      }
    });

    return result;
  }

  private getMaxTick(words: Word[]) {
    let result = 0;

    words.forEach(item => {
      if (item.ticks + item.duration > result) {
        result = item.ticks + item.duration;
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
  }

  previewFile($event: Event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log('csv content', e.target.result);

      let ab = e.target.result as ArrayBuffer;
      let midi = new Midi(ab);

      this.loadWordsTicksFromMidi(midi);
      this.resetTicksCounter();
    };

    // @ts-ignore
    reader.readAsArrayBuffer($event.target.files[0]);
  }

  loadWordsTicksFromMidi(midi: Midi) {
    let midiNoteCounter = 0;
    let track = midi.tracks[0];

    this.lines.forEach(item => {
      item.words.forEach(word => {
        if(midiNoteCounter < track.notes.length) {
          word.ticks = track.notes[midiNoteCounter].ticks;
          word.duration = track.notes[midiNoteCounter].durationTicks;
          word.transitionDuration = track.notes[midiNoteCounter].duration;
          word.pitch = track.notes[midiNoteCounter].pitch;
          word.octave = track.notes[midiNoteCounter].octave;

          console.log(track.notes[midiNoteCounter].time);
        } else {
          word.ticks = 90000;
        }
        midiNoteCounter++;
      });
    });
  }

  ticksToSeconds(ticks: number): number {
    const ppq = 480;
    const beats = ticks / ppq;
    return (60 / 120) * beats;
  }


  secondsToTicks(ticks: number): number {
    return 0;
  }

  resetTicksCounter() {
    this.tickCounter = 0;
    this.setLinesData();
    this.setStartTime();
  }

  async getFileFromUrl() {
    let url = 'assets/test.mid';
    let response = await fetch(url);

    let ab = await response.arrayBuffer();

    let midi = new Midi(ab);

    this.loadWordsTicksFromMidi(midi);

    this.resetTicksCounter();
  }
}
