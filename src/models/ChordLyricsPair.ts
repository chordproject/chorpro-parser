import { Chord } from "./Chord";

export class ChordLyricsPair {
  /**
   * Getter chord
   * @return The chord
   */
  public get chord(): Chord | null {
    return this._chord;
  }

  /**
   * Getter lyrics
   * @return The lyrics
   */
  public get lyrics(): string {
    return this._lyrics;
  }

  /**
   * Getter text
   * @return The text
   */
  public get text(): string | null {
    return this._text;
  }

  private _chord: Chord | null;
  private _lyrics: string;
  private _text: string | null;

  /**
   * ChordLyricsPair's constructor
   * @param lyrics Lyrics
   * @param chord Chord
   */
  constructor(
    lyrics: string,
    chord: Chord | null = null,
    text: string | null = null
  ) {
    this._lyrics = lyrics;
    this._chord = chord;
    this._text = text;
  }

  public hasChord(): boolean {
    return this._chord !== null;
  }

  public hasText(): boolean {
    return this._text !== null;
  }

  public static parse(line: string): ChordLyricsPair[] {
    const pairs: ChordLyricsPair[] = [];
    const regex = /\[(?<value>.*?)\]/g;

    // line without chords
    if (!regex.test(line)) {
      pairs.push(new ChordLyricsPair(line));
      return pairs;
    }

    // line with chords
    let match;
    regex.lastIndex = 0; // restart from the begining
    let lastIndex = 0;
    let lastChord: string | null = null;

    while ((match = regex.exec(line))) {
      const lyrics = line.substring(lastIndex, match.index);
      if (lyrics) {
        pairs.push(this.createChordLyricsPair(lyrics, lastChord));
      }

      lastChord = match.groups!["value"];
      lastIndex = regex.lastIndex;
    }

    const lyrics = line.substring(lastIndex, line.length);

    if (lyrics) {
      pairs.push(this.createChordLyricsPair(lyrics, lastChord));
    }

    return pairs;
  }

  private static createChordLyricsPair(
    lyrics: string,
    chord: string | null
  ): ChordLyricsPair {
    let mychord = null;
    let text = null;

    if (chord?.startsWith("*")) {
      text = chord.substring(1, chord.length);
    } else {
      mychord = chord ? Chord.parse(chord) : null;
    }

    return new ChordLyricsPair(lyrics, mychord, text);
  }
}
