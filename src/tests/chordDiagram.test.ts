import { Chord } from "../models/Chord";
import { ChordDiagram } from "../models/ChordDiagram";
import { Dot } from "../models/Dot";
import { MusicLetter, MusicNote } from "../models/MusicNote";

test("has barre in 3rd", () => {
  const musicNote = new MusicNote(MusicLetter.C);
  const chord = new Chord(musicNote);
  const frets = [-1, 3, 5, 5, 5, 3];
  const fingers = [0, 1, 2, 3, 4, 1];
  const diagram = new ChordDiagram(chord, frets, fingers);

  const barre = diagram.barre();
  const hasBarre = diagram.hasBarre();
  const expected = 3;

  expect(barre).toEqual(expected);
  expect(hasBarre).toBeTruthy();
});

test("has no barre", () => {
  const chord = Chord.parse("C");
  const frets = [-1, 3, 2, 0, 1, 0];
  const fingers = [0, 0, 0, 0, 0, 0];
  const diagram = new ChordDiagram(chord!, frets, fingers);

  const barre = diagram.barre();
  const hasBarre = diagram.hasBarre();
  const expected = 0;

  expect(barre).toEqual(expected);
  expect(hasBarre).toBeFalsy();
});

test("get fingers should return diagram fingers", () => {
  const expectedFingers = [0, 1, 2, 3, 4, 1];
  const frets = [-1, 3, 5, 5, 5, 3];
  const note = new MusicNote(MusicLetter.C);
  const chord = new Chord(note);
  const diagram = new ChordDiagram(chord, frets, expectedFingers);

  const fingers = diagram.fingers;
  expect(fingers).toEqual(expectedFingers);
});

test("get frets should return diagram frets", () => {
  const expectedFrets = [-1, 3, 5, 5, 5, 3];
  const note = new MusicNote(MusicLetter.C);
  const chord = new Chord(note);
  const diagram = new ChordDiagram(chord, expectedFrets);

  const frets = diagram.frets;
  expect(frets).toEqual(expectedFrets);
});

test("get chord should return diagram chord", () => {
  const frets = [1, 1, 3, 3, 3, 1];
  const fingers = [1, 1, 2, 3, 4, 1];
  const note = new MusicNote(MusicLetter.C);
  const expectedChord = new Chord(note);
  const diagram = new ChordDiagram(expectedChord, frets, fingers);

  const chord = diagram.chord;
  expect(chord).toEqual(expectedChord);
});

test("get variation should return diagram variation", () => {
  const frets = [-1, 3, 5, 5, 5, 3];
  const note = new MusicNote(MusicLetter.C);
  const chord = new Chord(note);
  const expectedVariation = 2;
  const diagram = new ChordDiagram(
    chord,
    frets,
    [0, 0, 0, 0, 0, 0],
    expectedVariation
  );

  const variation = diagram.variation;
  expect(variation).toEqual(expectedVariation);
});

test("get dots should return diagram dots", () => {
  const frets = [1, 1, 3, 3, 3, 1];
  const fingers = [1, 1, 2, 3, 4, 1];
  const chord = Chord.parse("C");
  const diagram = new ChordDiagram(chord!, frets, fingers);

  const expectedDots = [
    new Dot(6, 1, 1),
    new Dot(5, 1, 1),
    new Dot(4, 3, 2),
    new Dot(3, 3, 3),
    new Dot(2, 3, 4),
    new Dot(1, 1, 1),
  ];
  const dots = diagram.dots;
  expect(dots).toEqual(expectedDots);
});

test.each`
  diagram                                                              | chord    | frets                 | fingers
  ${"{define: Bes base-fret 1 frets 1 1 3 3 3 1 fingers 1 1 2 3 4 1}"} | ${"Bes"} | ${[1, 1, 3, 3, 3, 1]} | ${[1, 1, 2, 3, 4, 1]}
  ${"{define: As base-fret 4 frets 1 3 3 2 1 1 fingers 1 3 4 2 1 1}"}  | ${"As"}  | ${[4, 6, 6, 5, 4, 4]} | ${[1, 3, 4, 2, 1, 1]}
  ${"{define: As base-fret 4 frets 1 3 3 2 1 1}"}                      | ${"As"}  | ${[4, 6, 6, 5, 4, 4]} | ${[]}
`(
  "parse the diagram $diagram should return diagram",
  ({ diagram, chord, frets, fingers }) => {
    const chordObject = Chord.parse(chord);
    expect(chordObject).toBeDefined();
    const expected = new ChordDiagram(chordObject!, frets, fingers);
    const result = ChordDiagram.parse(diagram);
    expect(result).toMatchObject(expected);
  }
);

test.each`
  diagram
  ${"{define: test base-fret 1 frets 1 1 3 3 3 1 fingers 1 1 2 3 4 1}"}
  ${"{define: As  frets 1 3 3 2 1 1 fingers 1 3 4 2 1 1}"}
  ${"{define: As base-fret 1 fingers 1 3 4 2 1 1}"}
  ${"{define: As base-fret 1 fingers 1 3 4 2 1 1}"}
  ${"{define: As base-fret 1 fret 1 1 3 3 3 1 finger 1 1 2 3 4 1}"}
  ${"{define: base-fret 1 fret 1 1 3 3 3 1 finger 1 1 2 3 4 1}"}
`("parse the diagram $diagram should return undefined", ({ diagram }) => {
  const result = ChordDiagram.parse(diagram);
  expect(result).toBeUndefined();
});
