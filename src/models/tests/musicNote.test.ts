import { MusicNote, MusicLetter, MusicAccidental } from "../MusicNote";

test.each`
    note     | expected
    ${"A"}   | ${MusicLetter.A}
    ${"B"}   | ${MusicLetter.B}
    ${"C"}   | ${MusicLetter.C}
    ${"D"}   | ${MusicLetter.D}
    ${"E"}   | ${MusicLetter.E}
    ${"F"}   | ${MusicLetter.F}
    ${" G "} | ${MusicLetter.G}
`("parse the simple music note $note and return the correct note", ({ note, expected }) => {
    const expectednote = new MusicNote(expected);
    const resultnote = MusicNote.parse(note);
    expect(resultnote).toMatchObject(expectednote);
});

test.each`
    note     | expectedLetter   | expectedAccidental
    ${"Ab"}  | ${MusicLetter.A} | ${MusicAccidental.b}
    ${"Bbb"} | ${MusicLetter.B} | ${MusicAccidental.bb}
    ${"C#"}  | ${MusicLetter.C} | ${MusicAccidental["#"]}
    ${"D##"} | ${MusicLetter.D} | ${MusicAccidental["##"]}
    ${"Ex"}  | ${MusicLetter.E} | ${MusicAccidental["##"]}
    ${"F"}   | ${MusicLetter.F} | ${MusicAccidental.none}
    ${" G "} | ${MusicLetter.G} | ${MusicAccidental.none}
`("parse the music note $note and return the correct note with symbol", ({ note, expectedLetter, expectedAccidental }) => {
    const expectednote = new MusicNote(expectedLetter, expectedAccidental);
    const resultnote = MusicNote.parse(note);
    expect(resultnote).toMatchObject(expectednote);
});

test.each`
    note     | expected
    ${"a"}
    ${"H"}
    ${"Ab#"}
    ${"Ax#"}
`("parse the note $note should fail", ({ note }) => {
    const resultnote = MusicNote.parse(note);
    expect(resultnote).toBeUndefined();
});

test.each`
    note
    ${"A"}
    ${"A#"}
    ${"Bb"}
    ${"C#"}
    ${"Ebb"}
    ${"F##"}
`("return the note $note as text", ({ note }) => {
    const result = MusicNote.parse(note)?.toString();
    expect(result).toEqual(note);
});

test("get letter should return the note letter", () => {
    const expectedLetter = MusicLetter.A;
    const key = new MusicNote(expectedLetter);
    const letter = key.letter;
    expect(letter).toEqual(expectedLetter);
});

test("get accidental should return the note accidental", () => {
    const expectedLetter = MusicLetter.A;
    const expectedAccidental = MusicAccidental["#"];
    const key = new MusicNote(expectedLetter, expectedAccidental);
    const accidental = key.accidental;
    expect(accidental).toEqual(expectedAccidental);
});

test("parse empty note should fail", () => {
    const result = MusicNote.parse("");
    expect(result).toBeUndefined();
});

test("note equality with two defined notes", () => {
    const noteString = "Ab";
    const note = MusicNote.parse(noteString)!;
    const expected = MusicNote.parse(noteString);
    expect(note.equals(expected)).toBeTruthy();
});

test("note equality with one undefined note", () => {
    const note = MusicNote.parse("Ab")!;
    const expected = undefined;
    expect(note.equals(expected)).toBeFalsy();
});

test("chord equality with two different chords", () => {
    const note = MusicNote.parse("A")!;
    const expected = MusicNote.parse("B")!;
    expect(note.equals(expected)).toBeFalsy();
});
