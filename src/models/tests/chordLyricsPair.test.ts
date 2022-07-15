import { ChordLyricsPair } from "../../models/ChordLyricsPair";

test("parse lyrics chord pairs", () => {
    const text = "I will not [D/F#]let a[G]nything [Cadd9]take away";
    const result = ChordLyricsPair.parseLine(text);
    expect(result).toBeDefined();
    expect(result?.length).toEqual(4);
    expect(result[0][1].lyrics).toEqual("I will not ");
    expect(result[1][1].lyrics).toEqual("let a");
    expect(result[2][1].lyrics).toEqual("nything ");
    expect(result[3][1].lyrics).toEqual("take away");
});

test("parse lyrics with text chord", () => {
    const text = "[*Rit]I will not let anything";
    const result = ChordLyricsPair.parse(text);
    expect(result).toBeDefined();
    expect(result[1].text).toEqual("Rit");
    expect(result[1].lyrics).toEqual("I will not let anything");
});

test("parse lyrics without chords", () => {
    const text = "I will not let anything";
    const result = ChordLyricsPair.parse(text);
    expect(result).toBeDefined();
    expect(result[1].lyrics).toEqual(text);
});
