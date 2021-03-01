import { Chord } from "./Chord";

export class ChordLyricsPair {
    private _chord:Chord | null;
    private _lyrics:string;

    /**
     * Getter chord
     * @return The chord
     */
	public get chord(): Chord | null  {
		return this._chord;
	}

    /**
     * Getter lyrics
     * @return The lyrics
     */
	public get lyrics(): string {
		return this._lyrics;
	}

    /**
     * ChordLyricsPair's constructor
     * @param lyrics Lyrics
     * @param chord Chord
     */
    constructor(lyrics:string, chord:Chord | null = null) {
        this._lyrics = lyrics;
        this._chord = chord;
    }
}