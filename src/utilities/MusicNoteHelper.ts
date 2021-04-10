import { MusicAccidental, MusicLetter, MusicNote } from "../models";

export abstract class MusicNoteHelper {
    private static notes: { letter: MusicLetter; index: number; value: number }[] = [
        { letter: MusicLetter.A, index: 0, value: 0 },
        { letter: MusicLetter.B, index: 1, value: 2 },
        { letter: MusicLetter.C, index: 2, value: 3 },
        { letter: MusicLetter.D, index: 3, value: 5 },
        { letter: MusicLetter.E, index: 4, value: 7 },
        { letter: MusicLetter.F, index: 5, value: 8 },
        { letter: MusicLetter.G, index: 6, value: 10 },
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
        // get the value of each letter
        const firstLetterValue = this.notes.find((f) => f.letter == firstNote.letter)!.value;
        const secondLetterValue = this.notes.find((f) => f.letter == secondNote.letter)!.value;

        // get the value of each accidental
        const firstAccidentalValue = this.accidentals.find((f) => f.accidental == firstNote.accidental)!.value;
        const secondAccidentalValue = this.accidentals.find((f) => f.accidental == secondNote.accidental)!.value;

        // calculate the semi-tones diff
        const diff = secondLetterValue + secondAccidentalValue - (firstLetterValue + firstAccidentalValue);
        return this.positiveMod(diff, 12);
    }

    /**
     * Calculate the difference between 2 letters
     * @param firstLetter 
     * @param secondLetter 
     * @returns The difference (always a positive value)
     */
    public static letterDiff(firstLetter: MusicLetter, secondLetter: MusicLetter): number {
        // get the index of each letter
        const firstLetterIndex = this.notes.find((f) => f.letter == firstLetter)!.index;
        const secondLetterIndex = this.notes.find((f) => f.letter == secondLetter)!.index;

        // calculate the letter diff
        return this.positiveMod(secondLetterIndex - firstLetterIndex, 7);
    }

    /**
     * Transpose the note
     * @param note The note to transpose
     * @param letterDiff The difference between the notes
     * @param semiTones The semitones between the notes
     * @returns A new transposed note
     */
    public static transpose(note: MusicNote, letterDiff: number, semiTones: number): MusicNote {
        letterDiff = this.positiveMod(letterDiff, 7);
        semiTones = this.positiveMod(semiTones, 12);

        // get the note values
        const noteValues = this.notes.find((f) => f.letter == note.letter)!;
        
        // get the new letter values
        let newNoteIndex = (noteValues.index + letterDiff) % 7;
        let newNoteValues = this.notes[newNoteIndex];

        // calculate the semitones between the note and the transposed note
        let newSemiTones = this.semiTonesBetween(note, new MusicNote(newNoteValues.letter));
        let semiTonesDiff = semiTones - newSemiTones;

        // check if the semitones are not greater than 2 (3# or 3b)
        // in this case, we will replace the letter by the one below (or above)
        // we will not use triple # or b
        if(Math.abs(semiTonesDiff) > 2){
            if (semiTonesDiff < 0) {
                newNoteIndex = this.positiveMod(--newNoteIndex, 7); 
            } else {
                newNoteIndex = this.positiveMod(++newNoteIndex, 7);
            }
            newNoteValues = this.notes[newNoteIndex];
            newSemiTones = this.semiTonesBetween(note, new MusicNote(newNoteValues.letter));
            semiTonesDiff = semiTones - newSemiTones;
        }

        const newAccidental = this.accidentals.find((f) => f.value == semiTonesDiff)!.accidental;
        return new MusicNote(newNoteValues.letter, newAccidental);
    }

    private static positiveMod(value: number, mod: number) {
        return ((value % mod) + mod) % mod;
    }
}
