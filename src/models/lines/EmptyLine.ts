import { Line, LineType } from "./Line";

export class EmptyLine extends Line {
    clone(): Line {
        return new EmptyLine();
    }
    constructor() {
        super(LineType.Empty);
    }
}
