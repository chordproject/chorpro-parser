import { ChordLyricsPair } from "./chordLyricsPair";
import { Line, LineType } from "./Line";

export class LyricsLine extends Line {
  /**
   * Getter pairs
   * @return The line's chord/lyrics pairs
   */
  public get pairs(): ChordLyricsPair[] {
    return this._pairs;
  }
  private _pairs: ChordLyricsPair[] = [];

  constructor(pairs: ChordLyricsPair[] = []) {
    super(LineType.Lyrics);
    this._pairs = pairs;
  }

  /**
   * Add the chord/lyrics pair to the line
   * @param line The line
   */
  public addPair(pair: ChordLyricsPair) {
    this._pairs.push(pair);
  }
}
