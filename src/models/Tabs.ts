export class Tabs {
    /**
     * Getter lines
     * @return {string[]}
     */
	public get lines(): string[] {
		return this._lines;
	}
    private _lines: string[];

    /**
     * Tabs' constructor
     * @param lines The lines
     */
    constructor(lines:string[] = []) {
        this._lines = lines;
    }

    /**
     * Add a tabs' line
     */
    public addLine(line:string) {
        this._lines.push(line);
    }
}