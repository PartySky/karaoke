/**
 * Строка
 */
import {Word} from "./word";

export interface Line {
  words: Word[];
  startTick: number;
  endTick: number;
  position: number;
}
