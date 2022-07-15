import { Line } from "../lines/Line";
import { Section, SectionType } from "./Section";

export enum LyricsType {
    Chorus = "chorus",
    Verse = "verse",
    Bridge = "bridge",
    Custom = "custom",
    None = "none",
}

export abstract class LyricsSectionBase extends Section {
    /**
     * Getter type
     * @return Section's type
     */
    public get type(): LyricsType {
        return this._type;
    }

    private _type: LyricsType;

    /**
     * SimpleLyrics' constructor
     */
    constructor(type: LyricsType) {
        super(SectionType.Lyrics);
        this._type = type;
    }

    /**
     * Add a line to the lyrics section
     * @param line The lyrics line
     */
    public addLine(line: Line) {
        this._lines.push(line);
    }
}
