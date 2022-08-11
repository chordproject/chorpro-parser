import { MusicAccidental, MusicLetter, MusicNote } from "../models";

export abstract class MusicNoteHelper {
    private static notes: { letter: MusicLetter; index: number; value: number }[] = [
        { letter: MusicLetter.A, index: 0, value: 1 },
        { letter: MusicLetter.B, index: 1, value: 3 },
        { letter: MusicLetter.C, index: 2, value: 4 },
        { letter: MusicLetter.D, index: 3, value: 6 },
        { letter: MusicLetter.E, index: 4, value: 8 },
        { letter: MusicLetter.F, index: 5, value: 9 },
        { letter: MusicLetter.G, index: 6, value: 11 },
    ];

    private static accidentals: { accidental: MusicAccidental; value: number }[] = [
        { accidental: MusicAccidental.none, value: 0 },
        { accidental: MusicAccidental["#"], value: 1 },
        { accidental: MusicAccidental["##"], value: 2 },
        { accidental: MusicAccidental.b, value: -1 },
        { accidental: MusicAccidental.bb, value: -2 },
    ];

    /**
     * Calculate the semitones between 2 notes
     * @param firstNote The first note
     * @param secondNote The second note
     * @returns The semitones (positive value)
     */
    public static semiTonesBetween(firstNote: MusicNote, secondNote: MusicNote): number {
        if (firstNote.equals(secondNote)) {
            return 0;
        }
        // get the value of each letter
        const firstLetterValue = this.notes.find((f) => f.letter == firstNote.letter)!.value;
        const secondLetterValue = this.notes.find((f) => f.letter == secondNote.letter)!.value;

        // get the value of each accidental
        const firstAccidentalValue = this.accidentals.find((f) => f.accidental == firstNote.accidental)!.value;
        const secondAccidentalValue = this.accidentals.find((f) => f.accidental == secondNote.accidental)!.value;

        // calculate the semi-tones diff
        let diff = secondLetterValue + secondAccidentalValue - (firstLetterValue + firstAccidentalValue);
        return this.getNormalizeNumber(diff, 0, 12, 12);
    }

    /**
     * Calculate the difference between 2 letters
     * @param firstLetter
     * @param secondLetter
     * @returns The difference (always a positive value)
     */
    public static letterDiff(firstLetter: MusicLetter, secondLetter: MusicLetter): number {
        if (firstLetter == secondLetter) {
            return 0;
        }

        // get the index of each letter
        const firstLetterIndex = this.notes.find((f) => f.letter == firstLetter)!.index;
        const secondLetterIndex = this.notes.find((f) => f.letter == secondLetter)!.index;

        // calculate the letter diff
        let diff = secondLetterIndex - firstLetterIndex;
        return this.getNormalizeNumber(diff, 0, 6, 7);
    }

    /**
     * Transpose the note
     * @param note The note to transpose
     * @param letterDiff The difference between the notes
     * @param semiTones The semitones between the notes
     * @returns A new transposed note
     */
    public static transpose(note: MusicNote, letterDiff: number, semiTones: number): MusicNote {
        if (letterDiff == 0 && semiTones == 0) {
            return note;
        }

        letterDiff = this.getNormalizeNumber(letterDiff, 0, 6, 7);
        semiTones = this.getNormalizeNumber(semiTones, 0, 12, 12);

        // get the note values
        const noteValues = this.notes.find((f) => f.letter == note.letter)!;

        // get the new letter values
        let newNoteIndex = this.getNormalizeNumber(noteValues.index + letterDiff, 0, 6, 7);
        let newNoteValues = this.notes[newNoteIndex];

        // calculate the semitones between the note and the transposed note
        let newSemiTones = this.semiTonesBetween(note, new MusicNote(newNoteValues.letter));
        let semiTonesDiff = this.getNormalizeNumber(semiTones - newSemiTones, -3, 3, 12);

        // check if the semitones are not greater than 2 (3# or 3b)
        // in this case, we will replace the letter by the one below (or above)
        // we will not use triple # or b
        if (Math.abs(semiTonesDiff) > 2) {
            semiTonesDiff < 0 ? --newNoteIndex : ++newNoteIndex;
            newNoteIndex = this.getNormalizeNumber(newNoteIndex, 0, 6, 7);
            newNoteValues = this.notes[newNoteIndex];
            newSemiTones = this.semiTonesBetween(note, new MusicNote(newNoteValues.letter));
            semiTonesDiff = this.getNormalizeNumber(semiTones - newSemiTones, -3, 3, 12);
        }

        const newAccidental = this.accidentals.find((f) => f.value == semiTonesDiff)!.accidental;
        return new MusicNote(newNoteValues.letter, newAccidental);
    }

    private static positiveMod(value: number, mod: number) {
        return ((value % mod) + mod) % mod;
    }

    private static getNormalizeNumber(number: number, min: number, max: number, amount: number): number {
        if (number < min) {
            number = number + amount;
        }
        else if (number > max) {
            number = number - amount;
        }
        return number;
    }
}
