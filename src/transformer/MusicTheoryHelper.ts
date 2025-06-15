import { MusicNote } from "../models";

export class MusicTheoryHelper {
    static circleOfFifths: string[] = ["C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"];

    static pitchClassMap: Record<string, number> = {
        C: 0,
        "C#": 1,
        D: 2,
        Eb: 3,
        E: 4,
        F: 5,
        "F#": 6,
        G: 7,
        Ab: 8,
        A: 9,
        Bb: 10,
        B: 11,
        Cb: 11,
        "D#": 3,
        "E#": 5,
        Fb: 4,
        "G#": 8,
        "A#": 10,
        "B#": 0,
        Gb: 6,
        Db: 1,
    };

    static reversePitchClassMap: Record<number, string> = {
        0: "C",
        1: "C#",
        2: "D",
        3: "Eb",
        4: "E",
        5: "F",
        6: "F#",
        7: "G",
        8: "Ab",
        9: "A",
        10: "Bb",
        11: "B",
    };

    static getNextInCircle(note: string, steps: number): string {
        const idx = this.circleOfFifths.indexOf(note);
        if (idx === -1) return note;
        return this.circleOfFifths[(idx + steps + this.circleOfFifths.length) % this.circleOfFifths.length];
    }

    static normalizeKey(key: string): string {
        const baseKey = key.replace("m", "");
        if (this.pitchClassMap[baseKey] !== undefined) {
            return key.includes("m") ? `${baseKey}m` : baseKey;
        }
        return key;
    }

    static transposeKey(key: string, letterDiff: number, semiTones: number): string {
        const baseKey = key.replace("m", "");
        const pitchClass = this.pitchClassMap[baseKey];

        // Ajustar la letra de la nota usando letterDiff
        const newLetterIndex =
            (this.circleOfFifths.indexOf(baseKey) + letterDiff + this.circleOfFifths.length) %
            this.circleOfFifths.length;
        const newLetter = this.circleOfFifths[newLetterIndex];

        // Ajustar los semitonos usando semiTones
        const newPitchClass = (pitchClass + semiTones + 12) % 12;
        const newKey = this.reversePitchClassMap[newPitchClass];

        // Si hay discrepancia entre la letra y los semitonos, ajustar la letra nuevamente
        if (newKey !== newLetter) {
            const adjustedLetterIndex =
                (this.circleOfFifths.indexOf(newKey) + letterDiff + this.circleOfFifths.length) %
                this.circleOfFifths.length;
            const adjustedLetter = this.circleOfFifths[adjustedLetterIndex];
            return adjustedLetter;
        }

        return newKey;
    }

    static semiTonesBetween(note1: string, note2: string): number {
        const pitch1 = this.pitchClassMap[note1];
        const pitch2 = this.pitchClassMap[note2];

        if (pitch1 === undefined || pitch2 === undefined) {
            return 0; // Manejar notas inválidas
        }

        let diff = pitch2 - pitch1;
        return (diff + 12) % 12; // Normalizar a un rango de 0-11
    }

    static letterDiff(note1: string, note2: string): number {
        const index1 = this.circleOfFifths.indexOf(note1);
        const index2 = this.circleOfFifths.indexOf(note2);

        if (index1 === -1 || index2 === -1) {
            return 0; // Manejar notas inválidas
        }

        return index2 - index1;
    }

    static getPreferredEnharmonic(noteStr: string, keyContext?: string): string {
        const pitchClass = this.pitchClassMap[noteStr];
        if (pitchClass === undefined) {
            return noteStr;
        }

        // Default enharmonic preferences based on musical theory
        // Generally prefer sharps for ascending, flats for descending
        const sharpPreferred = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const flatPreferred = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

        // Prefer enharmonics that match the current key signature
        if (keyContext && keyContext.includes("#")) {
            return sharpPreferred[pitchClass];
        } else if (keyContext && keyContext.includes("b")) {
            return flatPreferred[pitchClass];
        }

        // Default to the standard mapping
        return this.reversePitchClassMap[pitchClass];
    }
}
