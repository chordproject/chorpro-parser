import { Chord } from "./chord";
import { Dot } from "./dot";

export class ChordDiagram {
  private readonly _chord: Chord;
  public get chord(): Chord {
    return this._chord;
  }

  private readonly _frets: number[];
  public get frets(): number[] {
    return this._frets;
  }

  private readonly _fingers: number[];
  public get fingers(): number[] {
    return this._fingers;
  }

  private readonly _variation: number;
  public get variation(): number {
    return this._variation;
  }

  constructor(
    chord: Chord,
    frets: number[],
    fingers: number[] = [],
    variation: number = 1
  ) {
    this._chord = chord;
    this._frets = frets;
    this._fingers = fingers;
    this._variation = variation;
  }
  /**
   * Parse the user defined chord to a chord diagram. Always transform frets into absolute value
   * @param text User defined chord
   * @returns Chord diagram (or null if wrong format)
   */
  public static parse(text: string): ChordDiagram | undefined {
    const pattern = /^\{define: (?<chord>([A-G][#bx]{0,2})(.*?)(?: |(?:\/([A-G][#bx]{0,2})))) *base-fret (?<basefret>[1-9][0-9]?) *frets(?<frets>( [0-9xNn]){6})( *fingers(?<fingers>( [0-5]){6}))?\}$/;
    const match = text.match(pattern);
    if (!match || match.length < 1 || !match.groups) {
      return undefined;
    }

    //Get the params from the user defined chord
    const chordMatch = match.groups["chord"];
    const baseFret = parseInt(match.groups["basefret"], 10);
    const fingers = match.groups["fingers"]?.trim().split(" ").map(Number);
    const fretsMatch = match.groups["frets"]?.trim().split(" ");

    const frets: number[] = [];
    fretsMatch.forEach((fret) => {
      const value = parseInt(fret, 10);
      let fretNumber = isNaN(value) ? -1 : value; // if not a number, set -1 (muted)
      if (baseFret > 1 && fretNumber > 0) {
        fretNumber += baseFret - 1; // set absolute fret number
      }
      frets.push(fretNumber);
    });

    const chord = Chord.parse(chordMatch);

    // only fingers is optional
    if (!chord || !frets || isNaN(baseFret)) {
      return undefined;
    }

    return new ChordDiagram(chord, frets, fingers);
  }

  /**
   * Get the dots
   */
  public get dots(): Dot[] {
    var dots: Dot[] = [];
    for (let index = 0; index < this._frets.length; index++) {
      const fret = this._frets[index];
      const finger =
        this._fingers && this._fingers.length > 0 ? this._fingers[index] : 0;
      dots.push(new Dot(this._frets.length - index, fret, finger));
    }
    return dots;
  }

  /**
   * Wether or not the diagram contains a barre
   */
  public hasBarre(){
    return this.barre() > 0;
  }

  /**
   * The fret number if the diagram contains a barre.
   * In case of no barre, returns 0
   */
  public barre():number{
    const usedFrets = this.frets.filter(f => f != 0);
    const indexFingers = this.fingers.filter(f => f === 1);
    if(usedFrets.length < this.frets.length || indexFingers.length <= 1){
      return 0;
    }
    
    return this.fretRange()[0];
  }

  /**
   * Return the min and the max fret number of the diagram
   */
  public fretRange(): [number, number] {
    const playedFrets = this._frets.filter(f => f !== -1);
    const min: number = Math.min(...playedFrets);
    const max: number = Math.max(...playedFrets);
    return [min, max];
  }
}
