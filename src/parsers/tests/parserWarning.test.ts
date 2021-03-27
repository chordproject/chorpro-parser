import { ParserWarning } from "../../parsers/parserWarning";

test("get the string value of the warning", () => {
    const message = "unexpected error";
    const lineNumber = 10;
    const warning = new ParserWarning(message, lineNumber);
    const expected = "Warning: unexpected error on line 10";
    expect(warning.toString()).toEqual(expected);
})