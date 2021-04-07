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

    public static semiTonesBetween(firstNote: MusicNote, secondNote: MusicNote): number {
        const firstLetterValue = this.notes.find((f) => f.letter == firstNote.letter)!.value;
        const secondLetterValue = this.notes.find((f) => f.letter == secondNote.letter)!.value;

        const firstAccidentalValue = this.accidentals.find((f) => f.accidental == firstNote.accidental)!.value;
        const secondAccidentalValue = this.accidentals.find((f) => f.accidental == secondNote.accidental)!.value;

        const diff = secondLetterValue + secondAccidentalValue - (firstLetterValue + firstAccidentalValue);
        return diff;
    }

    public static letterDiff(firstLetter: MusicLetter, secondLetter: MusicLetter): number {
        const firstLetterIndex = this.notes.find((f) => f.letter == firstLetter)!.index;
        const secondLetterIndex = this.notes.find((f) => f.letter == secondLetter)!.index;

        return secondLetterIndex - firstLetterIndex;
    }
    
    public static transpose(note: MusicNote, letterDiff: number, semiTones: number): MusicNote {
        const noteValues = this.notes.find((f) => f.letter == note.letter)!;
        const newLetterIndex = this.positiveMod(noteValues.index + letterDiff,7);
        const newNoteValues = this.notes[newLetterIndex];
        const newAccidentalValue = semiTones - this.positiveMod(newNoteValues.value - noteValues.value, 11);
        const newAccidental = this.accidentals.find((f) => f.value == newAccidentalValue)!.accidental;
        return new MusicNote(newNoteValues.letter, newAccidental);
    }

    private static positiveMod(value:number, mod:number){
        return ((value%mod) + mod)%mod;
    }
}
