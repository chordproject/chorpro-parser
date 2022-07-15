import { IClonable } from "./IClonable";
import { MusicNote } from "./MusicNote";

export class Key implements IClonable<Key> {
    note: MusicNote;
    mode: KeyMode;

    constructor(note: MusicNote, mode: KeyMode = KeyMode.Major) {
        this.note = note;
        this.mode = mode;
    }
    clone(): Key {
        return new Key(this.note.clone(), this.mode);
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
        return this.note.toString() + (this.mode == KeyMode.Major ? "" : "m");
    }

    public equals(key: Key): boolean {
        return this.toString() == key.toString();
    }
}

export enum KeyMode {
    Major,
    Minor,
}
