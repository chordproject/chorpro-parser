import { IClonable } from "../IClonable";
import { LyricsSectionBase, LyricsType } from "./LyricsSectionBase";
import { Section } from "./Section";

export class LyricsSection extends LyricsSectionBase {

  public clone(): Section {
    let section = new LyricsSection(this.type, this._name, this._value);
    this._lines.forEach(line => {
      section.addLine(line.clone());
    });
    return section;
  }

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
