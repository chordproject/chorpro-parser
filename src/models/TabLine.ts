import { Line, LineType } from "./Line";

export class TabLine extends Line {
  /**
   * Getter value
   * @return {string}
   */
  public get value(): string {
    return this._value;
  }
  private _value: string;

  constructor(value: string) {
    super(LineType.Tabs);
    this._value = value;
  }
}
