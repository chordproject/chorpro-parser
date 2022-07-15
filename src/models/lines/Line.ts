import { IClonable } from "../IClonable";

export enum LineType {
    Lyrics = "lyrics",
    Comment = "comment",
    Empty = "empty",
    Custom = "custom",
    Tabs = "tabs",
    Unknown = "unknown",
}

export abstract class Line implements IClonable<Line> {
    private _lineType: LineType = LineType.Unknown;
    protected get lineType(): LineType {
        return this._lineType;
    }

    /**
     * Abstract class Line's constructor
     */
    constructor(lineType: LineType) {
        this._lineType = lineType;
    }

    abstract clone(): Line;
}
