import { Line, LineType } from "./Line";

export class EmptyLine extends Line {
    constructor() {
        super(LineType.Empty);
    }
}