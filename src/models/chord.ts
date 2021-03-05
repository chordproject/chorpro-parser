import { MusicNote } from "./MusicNote";

export class Chord {
  private _note: MusicNote;
  public get note(): MusicNote {
    return this._note;
  }

  private _type: string;
  public get type(): string {
    return this._type;
  }

  private _bass: MusicNote | null;
  public get bass(): MusicNote | null {
    return this._bass;
  }

  constructor(
    note: MusicNote,
    type: string = "",
    bass: MusicNote | null = null
  ) {
    this._note = note;
    this._type = type;
    this._bass = bass;
  }

  private static readonly chordRegex = /^(?<note>[A-G](#{1,2}|b{1,2}|x)?)(?<type>(?!\/).*?)?(?:$|(?:\/(?<bass>[A-G](#{1,2}|b{1,2}|x)?)))$/;

  public static parse(text: string): Chord | undefined {
    if (!text) {
      return undefined;
    }
    text = text.trim();

    const matches = text.match(Chord.chordRegex);
    if (!matches || !matches.groups) {
      return undefined;
    }
    const noteMatch = matches.groups["note"];
    const note = MusicNote.parse(noteMatch);
    if (note == undefined) {
      return undefined;
    }
    const type = matches.groups["type"];
    const bassMatch = matches.groups["bass"];
    const bass = MusicNote.parse(bassMatch);

    return new Chord(note, type, bass);
  }

  /**
   * Get the string description of the chord
   */
  public toString(): string {
    var name = this._note.toString() + this._type;
    if (this._bass) {
      name += "/" + this._bass.toString();
    }
    return name;
  }

  /**
   * Compare this chord with the given chord and return TRUE if they are identical
   * @param chord Chord to compare with
   * @returns TRUE if the chord is identical
   */
  public equals(chord: Chord | null | undefined): boolean {
    if(!chord){
      return false;
    }
    return chord.toString() === this.toString();
  }
}
