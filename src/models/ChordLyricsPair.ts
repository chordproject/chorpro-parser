import { Chord } from "./Chord";
import { IClonable } from "./IClonable";

export class ChordLyricsPair implements IClonable<ChordLyricsPair> {
    public chord: Chord | null;
    public lyrics: string;
    public text: string | null;

    /**
     * ChordLyricsPair's constructor
     * @param lyrics Lyrics
     * @param chord Chord
     */
    constructor(lyrics: string, chord: Chord | null = null, text: string | null = null) {
        this.lyrics = lyrics;
        this.chord = chord;
        this.text = text;
    }
    clone(): ChordLyricsPair {
        return new ChordLyricsPair(this.lyrics, this.chord?.clone(), this.text);
    }

    public hasChord(): boolean {
        return this.chord !== null;
    }

    public hasText(): boolean {
        return this.text !== null;
    }

    public static parse(text: string): [boolean, ChordLyricsPair] {
        const regex = /\[(?<value>.*?)\]/;
        const match = text.match(regex);
        if (!match || !match.groups) {
            return [true, new ChordLyricsPair(text)];
        }
        const chord = match.groups["value"];
        const lyrics = text.substring(chord.length + 2, text.length);
        return this.createChordLyricsPair(lyrics, chord);
    }

    /**
     * Parse the line and return an array of ChordLyricsPair with parsing success
     * @param line The line to parse
     */
    public static parseLine(line: string): [boolean, ChordLyricsPair][] {
        const pairs: [boolean, ChordLyricsPair][] = [];
        const regex = /\[(?<value>.*?)\]/g;

        // line without chords
        if (!regex.test(line)) {
            pairs.push([true, new ChordLyricsPair(line)]);
            return pairs;
        }

        // line with chords
        let match;
        regex.lastIndex = 0; // restart from the begining
        let lastIndex = 0;
        let lastChord: string | null = null;

        while ((match = regex.exec(line))) {
            const lyrics = line.substring(lastIndex, match.index);
            if (lyrics) {
                pairs.push(this.createChordLyricsPair(lyrics, lastChord));
            }

            lastChord = match.groups!["value"];
            lastIndex = regex.lastIndex;
        }

        const lyrics = line.substring(lastIndex, line.length);

        if (lyrics) {
            pairs.push(this.createChordLyricsPair(lyrics, lastChord));
        }

        return pairs;
    }

    private static createChordLyricsPair(lyrics: string, chord: string | null): [boolean, ChordLyricsPair] {
        let myChord = null;
        let text = null;

        if (chord?.startsWith("*")) {
            text = chord.substring(1, chord.length);
        } else {
            myChord = chord ? Chord.parse(chord) : null;
        }

        const pair = new ChordLyricsPair(lyrics, myChord, text);
        const success = myChord !== undefined;
        if (!success) {
            pair.text = chord;
        }
        return [success, pair];
    }
}
