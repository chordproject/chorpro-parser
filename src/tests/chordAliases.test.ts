import { ChordAliases } from "../ChordAliases";
import { MusicNote } from "../models/MusicNote";

test.each`
  name     | expected
  ${"Bbb"} | ${"A"}
  ${"Cb"}  | ${"B"}
  ${"C"}   | ${"C"}
  ${"D"}   | ${"D"}
  ${"E"}   | ${"E"}
  ${"F"}   | ${"F"}
  ${"G"}   | ${"G"}
`("get the alias for the chord", ({ name, expected }) => {
  const note = MusicNote.parse(name);
  const expectedNote = MusicNote.parse(expected);
  const result = ChordAliases.getNoteAlias(note!);
  expect(result).toMatchObject(expectedNote!);
});
