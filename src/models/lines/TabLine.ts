import { Line, LineType } from "./Line";

export class TabLine extends Line {
    clone(): Line {
        return new TabLine(this.value);
    }
    /**
     * Getter value
     * @return {string}
     */
    public get value(): string {
        return this._value;
    }
    private _value: string;

    constructor(value: string) {
        super(LineType.Tabs);
        this._value = value;
    }
}
