export class Dot {
  private _string: number;
  /**
   * Get the string number.
   * String numbering goes from the bottom to the top and start at 1 (eg: e=1, B=2, G=3, D=4, A=5, E=6)
   */
  public get string(): number {
    return this._string;
  }

  private _fret: number;
  /**
   * Get the fret number.
   * 0 for open string, -1 for muted string.
   */
  public get fret(): number {
    return this._fret;
  }

  private _finger: number;
  /**
   * Get the finger number.
   * For no finger, the finger number is set to 0.
   */
  public get finger(): number {
    return this._finger;
  }

  /**
   * Dot constructor
   * @param string String number
   * @param fret Fret number (-1 for muted)
   * @param finger Finger number (0 if no finger)
   */
  constructor(string: number, fret: number, finger: number = 0) {
    this._string = string;
    this._fret = fret;
    this._finger = finger;
  }
}
