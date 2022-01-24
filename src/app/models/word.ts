/**
 * Слово
 */
export interface Word {
  ticks: number;
  duration: number;
  transitionDuration: number;
  value: string;
  octave?: number;
  pitch?: string;
}
