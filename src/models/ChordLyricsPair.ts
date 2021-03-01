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


  public static parse(text:string): [boolean, ChordLyricsPair]{
    const regex = /\[(?<value>.*?)\]/;
    const match = text.match(regex);
    if(!match || !match.groups){
      return [true, new ChordLyricsPair(text)];
    }
    const chord = match.groups["value"];
    const lyrics = text.substring(chord.length+2, text.length);
    return this.createChordLyricsPair(lyrics, chord);
  }

  /**
   * Parse the line and return an array of ChordLyricsPair with parsing success
   * @param line The line to parse
   */
  public static parseLine(line: string): [boolean,ChordLyricsPair][] {
    const pairs: [boolean, ChordLyricsPair][] = [];
    const regex = /\[(?<value>.*?)\]/g;

    // line without chords
    if (!regex.test(line)) {
      pairs.push([true, new ChordLyricsPair(line)]);
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
  ): [boolean, ChordLyricsPair] {
    let myChord = null;
    let text = null;

    if (chord?.startsWith("*")) {
      text = chord.substring(1, chord.length);
    } else {
      myChord = chord ? Chord.parse(chord) : null;
    }

    const pair = new ChordLyricsPair(lyrics, myChord, text);
    const success = myChord !== undefined;
    if(!success){
      pair._text = chord;
    }
    return [success, pair];
  }
}
