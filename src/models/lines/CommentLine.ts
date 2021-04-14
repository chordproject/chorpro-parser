import { Line, LineType } from "./Line";

export class CommentLine extends Line {
    clone(): Line {
        return new CommentLine(this._comment);
    }
    /**
     * Getter comment
     * @return The comment's text
     */
    public get comment(): string {
        return this._comment;
    }
    private _comment: string;

    /**
     * CommentLine's constructor
     * @param comment Comment's text
     */
    constructor(comment: string) {
        super(LineType.Comment);
        this._comment = comment;
    }
}
