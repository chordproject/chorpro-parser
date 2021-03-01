import { Line, LineType } from "./Line";

export enum LyricsType {
  Chorus = "chorus",
  Verse = "verse",
  Bridge = "bridge",
  Custom = "custom",
}

export class Lyrics extends Line {
  private _name: string;
  private _sectionType: LyricsType;
  private _value: string | null;
  private _lines: Line[] = [];

  /**
   * Getter name
   * @return Section's name
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Getter type
   * @return Section's type
   */
  public get sectionType(): LyricsType {
    return this._sectionType;
  }

  /**
   * Getter value
   * @return Section's value
   */
  public get value(): string | null {
    return this._value;
  }

  /**
   * Getter lines
   * @return Section's lines
   */
  public get lines(): Line[] {
    return this._lines;
  }

  /**
   * Lyrics' constructor
   * @param sectionType Section's type
   * @param name Section's name
   * @param value Section's value
   */
  constructor(sectionType: LyricsType, name: string, value: string | null = null) {
    super(LineType.Lyrics);
    this._sectionType = sectionType;
    this._name = name;
    this._value = value;
  }

  /**
   * Add a line to the lyrics section
   */
  public addLine(line:Line) {
      this._lines.push(line);
  }
}
