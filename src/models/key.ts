import { MusicAccidental, MusicNote } from "./MusicNote";

export class Key {
  private _note: MusicNote;
  public get note(): MusicNote {
    return this._note;
  }

  private _mode: KeyMode;
  public get mode(): KeyMode {
    return this._mode;
  }

  constructor(note: MusicNote, mode: KeyMode = KeyMode.Major) {
    this._note = note;
    this._mode = mode;
  }

  public static parse(text: string): Key | undefined {
    if (!text) {
      return undefined;
    }

    const regex = /^(?<note>[A-G](#{1,2}|b{1,2}|x)?)(?<mode>m?)$/;
    const matches = text.trim().match(regex);

    if (!matches || !matches.groups) {
      return undefined;
    }

    const note = MusicNote.parse(matches.groups["note"]);
    if (note == undefined) {
      return undefined;
    }
    const mode = matches.groups["mode"] === "m" ? KeyMode.Minor : KeyMode.Major;
    return new Key(note, mode);
  }

  /**
   * Get the string description of the key
   */
  public toString(): string {
    return this._note.toString() + (this._mode == KeyMode.Major ? "" : "m");
  }
}

export enum KeyMode {
  Major,
  Minor,
}
