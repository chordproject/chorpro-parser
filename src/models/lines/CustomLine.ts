import { Line, LineType } from "./Line";

export class CustomLine extends Line {
    clone(): Line {
        return new CustomLine(this.name, this.value);
    }
    /**
     * Getter name
     * @return The name
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Getter value
     * @return The value
     */
    public get value(): string | null {
        return this._value;
    }
    private _name: string;
    private _value: string | null;

    constructor(name: string, value: string | null) {
        super(LineType.Custom);
        this._name = name;
        this._value = value;
    }
}
