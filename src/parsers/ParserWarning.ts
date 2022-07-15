/**
 * Represents a parser warning, currently only used by ChordProParser.
 */
export class ParserWarning {
    /**
     * The warning message
     * @member
     * @type {string}
     */
    private _message: string;

    /**
     * The chord sheet line number on which the warning occurred
     */
    private _lineNumber: number;

    constructor(message: string, lineNumber: number) {
        this._message = message;
        this._lineNumber = lineNumber;
    }

    /**
     * Returns a stringified version of the warning
     */
    public toString(): string {
        return `Warning: ${this._message} on line ${this._lineNumber}`;
    }
}
