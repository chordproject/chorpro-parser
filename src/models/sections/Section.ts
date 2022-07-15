import { IClonable } from "../IClonable";
import { Line } from "../lines/Line";

export enum SectionType {
    Lyrics = "lyrics",
    Tabs = "tabs",
    //Grid = "grid",
    None = "none",
}

export abstract class Section implements IClonable<Section> {
    /**
     * Getter lines
     * @return Line array
     */
    get lines(): Line[] {
        return this._lines;
    }
    /**
     * Getter sectionType
     * @return The section's type
     */
    get sectionType(): SectionType {
        return this._sectionType;
    }

    private _sectionType: SectionType = SectionType.None;
    protected _lines: Line[] = [];

    /**
     * Abstract class Line's constructor
     */
    constructor(sectionType: SectionType) {
        this._sectionType = sectionType;
    }

    /**
     * Add a line to the section
     * @param line Line
     */
    public abstract addLine(line: Line): void;

    public abstract clone(): Section;
}
