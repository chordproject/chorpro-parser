import { Line } from "../lines";
import { Section, SectionType } from ".";

export class TabsSection extends Section {
    public clone(): Section {
        let section = new TabsSection(this._value);
        this._lines.forEach((line) => {
            section.addLine(line.clone());
        });
        return section;
    }
    /**
     * Getter value
     * @return {string }
     */
    public get value(): string | null {
        return this._value;
    }
    private _value: string | null = null;

    /**
     * Tabs' constructor
     * @param lines The lines
     */
    constructor(value: string | null = null) {
        super(SectionType.Tabs);
        this._value = value;
    }

    /**
     * Add a tabs' line
     * @param line The tab line
     */
    public addLine(line: Line) {
        this.lines.push(line);
    }
}
