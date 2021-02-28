import { MusicNote, MusicLetter, MusicAccidental } from "../models/musicNote";

test.each`
  note     | expected
  ${"A"}   | ${MusicLetter.A}
  ${"B"}   | ${MusicLetter.B}
  ${"C"}   | ${MusicLetter.C}
  ${"D"}   | ${MusicLetter.D}
  ${"E"}   | ${MusicLetter.E}
  ${"F"}   | ${MusicLetter.F}
  ${" G "} | ${MusicLetter.G}
`(
  "parse the simple music note $note and return the correct note",
  ({ note, expected }) => {
    const expectednote = new MusicNote(expected);
    const resultnote = MusicNote.parse(note);
    expect(resultnote).toMatchObject(expectednote);
  }
);

test.each`
  note     | expectedLetter   | expectedAccidental
  ${"Ab"}  | ${MusicLetter.A} | ${MusicAccidental.b}
  ${"Bbb"} | ${MusicLetter.B} | ${MusicAccidental.bb}
  ${"C#"}  | ${MusicLetter.C} | ${MusicAccidental["#"]}
  ${"D##"} | ${MusicLetter.D} | ${MusicAccidental["##"]}
  ${"Ex"}  | ${MusicLetter.E} | ${MusicAccidental["##"]}
  ${"F"}   | ${MusicLetter.F} | ${MusicAccidental.none}
  ${" G "} | ${MusicLetter.G} | ${MusicAccidental.none}
`(
  "parse the music note $note and return the correct note with symbol",
  ({ note, expectedLetter, expectedAccidental }) => {
    const expectednote = new MusicNote(expectedLetter, expectedAccidental);
    const resultnote = MusicNote.parse(note);
    expect(resultnote).toMatchObject(expectednote);
  }
);

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

describe("return the note as text", () => {
  it("sharp note", () => {
    const note = new MusicNote(MusicLetter.A, MusicAccidental["#"]);
    const noteString = note.toString();
    expect(noteString).toEqual("A#");
  });
  it("bemol note", () => {
    const note = new MusicNote(MusicLetter.G, MusicAccidental["b"]);
    const noteString = note.toString();
    expect(noteString).toEqual("Gb");
  });
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