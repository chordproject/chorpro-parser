import { IClonable } from "./IClonable";

export class MusicNote implements IClonable<MusicNote> {
    accidental: MusicAccidental;
    letter: MusicLetter;

    public toString(): string {
        if (this.accidental === MusicAccidental.none) {
            return MusicLetter[this.letter];
        }
        return MusicLetter[this.letter] + MusicAccidental[this.accidental];
    }

    constructor(letter: MusicLetter, accidental: MusicAccidental = MusicAccidental.none) {
        this.letter = letter;
        this.accidental = accidental;
    }

    clone(): MusicNote {
        return new MusicNote(this.letter, this.accidental);
    }

    public static parse(text: string): MusicNote | undefined {
        if (!text) {
            return undefined;
        }

        const regex = /^(?<letter>[A-G])(?<symbol>(#{1,2}|b{1,2}|x))?$/;
        const matches = text.trim().match(regex);

        if (!matches || !matches.groups) {
            return undefined;
        }
        // letter
        const letter = matches.groups["letter"] as keyof typeof MusicLetter;
        const letterEnum = MusicLetter[letter];
        if (letterEnum == undefined) {
            return undefined;
        }
        //accidental
        let accidentalMatch = matches.groups["symbol"];
        if (accidentalMatch == "x") {
            accidentalMatch = "##";
        }
        const accidental = accidentalMatch as keyof typeof MusicAccidental;
        const accidentalEnum = MusicAccidental[accidental];

        return new MusicNote(letterEnum, accidentalEnum);
    }

    /**
     * Compare this note with the given note and return TRUE if they are identical
     * @param chord Note to compare with
     * @returns TRUE if the note is identical
     */
    public equals(note: MusicNote | null | undefined): boolean {
        if (!note) {
            return false;
        }
        return note.toString() === this.toString();
    }
}

export enum MusicLetter {
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
}

export enum MusicAccidental {
    "b",
    "bb",
    "#",
    "##",
    none,
}
