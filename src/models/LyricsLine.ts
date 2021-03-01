import { ChordLyricsPair } from "./chordLyricsPair";

class LyricsLine {
  /**
   * Getter pairs
   * @return The line's chord/lyrics pairs
   */
  public get pairs(): ChordLyricsPair[] {
    return this._pairs;
  }
  private _pairs: ChordLyricsPair[] = [];

  constructor(pairs: ChordLyricsPair[] = []) {
    this._pairs = pairs;
  }

  /**
   * Add the chord/lyrics pair to the line
   */
  public addPair(pair: ChordLyricsPair) {
    this._pairs.push(pair);
  }
}
