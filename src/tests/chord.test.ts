import { Chord } from "../models/chord";
import { MusicAccidental, MusicLetter, MusicNote } from "../models/musicNote";

test.each`
  chord  | expected
  ${"A"} | ${new Chord(new MusicNote(MusicLetter.A))}
  ${"B"} | ${new Chord(new MusicNote(MusicLetter.B))}
  ${"C"} | ${new Chord(new MusicNote(MusicLetter.C))}
  ${"D"} | ${new Chord(new MusicNote(MusicLetter.D))}
  ${"E"} | ${new Chord(new MusicNote(MusicLetter.E))}
  ${"F"} | ${new Chord(new MusicNote(MusicLetter.F))}
  ${"G"} | ${new Chord(new MusicNote(MusicLetter.G))}
`(
  "parse the simple chord $chord and return the right chord",
  ({ chord, expected }) => {
    const resultKey = Chord.parse(chord);
    expect(resultKey).toMatchObject(expected);
  }
);

test.each`
  chord    | letter           | accidental
  ${"A#"}  | ${MusicLetter.A} | ${MusicAccidental["#"]}
  ${"Bb"}  | ${MusicLetter.B} | ${MusicAccidental.b}
  ${"C"}   | ${MusicLetter.C} | ${MusicAccidental.none}
  ${"D#"}  | ${MusicLetter.D} | ${MusicAccidental["#"]}
  ${"Eb"}  | ${MusicLetter.E} | ${MusicAccidental.b}
  ${"F##"} | ${MusicLetter.F} | ${MusicAccidental["##"]}
  ${" G "} | ${MusicLetter.G} | ${MusicAccidental.none}
`(
  "parse the simple chord $chord with accidental and return the right chord",
  ({ chord, letter, accidental }) => {
    const expected = new Chord(new MusicNote(letter, accidental));
    const resultKey = Chord.parse(chord);
    expect(resultKey).toMatchObject<Chord>(expected);
  }
);

test.each`
  chord         | letter           | accidental              | type
  ${"A#sus4"}   | ${MusicLetter.A} | ${MusicAccidental["#"]} | ${"sus4"}
  ${"Bb7"}      | ${MusicLetter.B} | ${MusicAccidental.b}    | ${"7"}
  ${"Cdim"}     | ${MusicLetter.C} | ${MusicAccidental.none} | ${"dim"}
  ${"D#M7"}     | ${MusicLetter.D} | ${MusicAccidental["#"]} | ${"M7"}
  ${"Eb"}       | ${MusicLetter.E} | ${MusicAccidental.b}    | ${""}
  ${" Gbsus2 "} | ${MusicLetter.G} | ${MusicAccidental.b}    | ${"sus2"}
`(
  "parse the chord $chord and return the right chord",
  ({ chord, letter, accidental, type }) => {
    const expected = new Chord(new MusicNote(letter, accidental), type);
    const resultKey = Chord.parse(chord);
    expect(resultKey).toMatchObject<Chord>(expected);
  }
);

test("parse the chord with a bass and return the right chord", () => {
  const expected = new Chord(
    new MusicNote(MusicLetter.A, MusicAccidental.b),
    "sus2sus4",
    new MusicNote(MusicLetter.C)
  );
  const chord = Chord.parse("Absus2sus4/C");
  expect(chord).toMatchObject(expected);
});

test.each`
  chord
  ${"A/Bsus2"}
  ${"a"}
  ${"B/#C"}
`(
  "parse the chord $chord should fail",
  ({ chord, letter, accidental, type }) => {
    const expected = new Chord(new MusicNote(letter, accidental), type);
    const resultKey = Chord.parse(chord);
    expect(resultKey).toBeUndefined();
  }
);

describe("return the chord as text", () => {
  it("simple chord", () => {
    const note = new MusicNote(MusicLetter.A, MusicAccidental["#"]);
    const chord = new Chord(note, "M7");
    const chordString = chord.toString();
    expect(chordString).toEqual("A#M7");
  });
  it("chord with bass", () => {
    const note = new MusicNote(MusicLetter.G, MusicAccidental["b"]);
    const bass = new MusicNote(MusicLetter.B, MusicAccidental["b"]);
    const chord = new Chord(note, "m", bass);
    const chordString = chord.toString();
    expect(chordString).toEqual("Gbm/Bb");
  });
});

test("get music note return the music note", () => {
  const expectedNote = new MusicNote(MusicLetter.A, MusicAccidental.b);
  const chord = new Chord(expectedNote);
  expect(chord.note).toEqual(expectedNote);
});

test("get type return the type", () => {
  const expectedNote = new MusicNote(MusicLetter.A, MusicAccidental.b);
  const expectedType = "m";
  const chord = new Chord(expectedNote, expectedType);
  expect(chord.type).toEqual(expectedType);
});

test("get bass return the bass", () => {
  const expectedNote = new MusicNote(MusicLetter.A, MusicAccidental.b);
  const expectedBass = new MusicNote(MusicLetter.C, MusicAccidental.none);
  const chord = new Chord(expectedNote, "", expectedBass);
  expect(chord.bass).toEqual(expectedBass);
});

test("parse empty chord should fail", () => {
  const result = Chord.parse("");
  expect(result).toBeUndefined();
});