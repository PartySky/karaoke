import {Component, Input, OnInit} from '@angular/core';
import {Line} from "../../models/line";
import {Word} from "../../models/word";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input()
  tickCounter: number = 0;
  @Input()
  lines: Line[] = [];
  scaleFactor = 100;
  isEditorShown = true;

  constructor() { }

  ngOnInit(): void {
  }

  getCursorPosition() {
    return this.tickCounter * this.scaleFactor;
  }

  getNotePosition(word: Word) {
    return word.tick * this.scaleFactor;
  }

  getNoteWidth(word: Word) {
    return word.duration * this.scaleFactor;
  }

  toggleEditor() {
    this.isEditorShown = !this.isEditorShown;
  }

  zoomIn() {
    this.scaleFactor = this.scaleFactor * 1.2;
  }

  zoomOut() {
    this.scaleFactor = this.scaleFactor / 1.2;
  }
}
