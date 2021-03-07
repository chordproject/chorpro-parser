import { Line } from "../Line";
import { Section, SectionType } from "./Section";

export class Tabs extends Section {
  /**
   * Getter value
   * @return {string }
   */
  public get value(): string | null {
    return this._value;
  }
  private _value: string | null = null;

  /**
   * Tabs' constructor
   * @param lines The lines
   */
  constructor(value: string | null = null) {
    super(SectionType.Tabs);
  }

  /**
   * Add a tabs' line
   * @param line The tab line
   */
  public addLine(line: Line) {
    this.lines.push(line);
  }
}
