export class TimeSignature {
    constructor(public topNumber: number, public bottomNumber: number) {}

    public toString(): string {
        return `${this.topNumber.toString()}/${this.bottomNumber.toString()}`;
    }
}