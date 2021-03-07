import { LyricsBase, LyricsType } from "./LyricsBase";

export class Lyrics extends LyricsBase {
  private _name: string;

  private _value: string | null;

  /**
   * Getter name
   * @return Section's name
   */
  public get name(): string | null {
    return this._name;
  }

  /**
   * Getter value
   * @return Section's value
   */
  public get value(): string | null {
    return this._value;
  }

  /**
   * Lyrics' constructor
   * @param type Section's type
   * @param name Section's name
   * @param value Section's value
   */
  constructor(type: LyricsType, name: string, value: string | null = null) {
    super(type);
    this._name = name;
    this._value = value;
  }
}
