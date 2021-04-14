import { ChordLyricsPair } from "../ChordLyricsPair";
import { Line, LineType } from "./Line";

export class LyricsLine extends Line {
    clone(): Line {
        let pairs: ChordLyricsPair[] = [];
        this._pairs.forEach((pair) => {
            pairs.push(pair.clone());
        });
        return new LyricsLine(pairs);
    }
    /**
     * Getter pairs
     * @return The line's chord/lyrics pairs
     */
    public get pairs(): ChordLyricsPair[] {
        return this._pairs;
    }
    private _pairs: ChordLyricsPair[] = [];

    constructor(pairs: ChordLyricsPair[] = []) {
        super(LineType.Lyrics);
        this._pairs = pairs;
    }

    /**
     * Add the chord/lyrics pair to the line
     * @param line The line
     */
    public addPair(pair: ChordLyricsPair) {
        this._pairs.push(pair);
    }
}
