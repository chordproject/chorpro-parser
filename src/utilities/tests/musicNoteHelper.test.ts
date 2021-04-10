import { MusicAccidental, MusicLetter, MusicNote } from "../../models";
import { MusicNoteHelper } from "../MusicNoteHelper";

test.each`
    firstNote                                              | secondNote                                         | value
    ${new MusicNote(MusicLetter.A)}                        | ${new MusicNote(MusicLetter.B)}                    | ${2}
    ${new MusicNote(MusicLetter.A)}                        | ${new MusicNote(MusicLetter.G)}                    | ${10}
    ${new MusicNote(MusicLetter.A, MusicAccidental["#"])}  | ${new MusicNote(MusicLetter.B, MusicAccidental.b)} | ${0}
    ${new MusicNote(MusicLetter.G, MusicAccidental["#"])}  | ${new MusicNote(MusicLetter.F, MusicAccidental.b)} | ${8}
    ${new MusicNote(MusicLetter.A, MusicAccidental["##"])} | ${new MusicNote(MusicLetter.C)}                    | ${1}
    ${new MusicNote(MusicLetter.A, MusicAccidental.bb)}    | ${new MusicNote(MusicLetter.C)}                    | ${5}
`("get steps between notes", ({ firstNote, secondNote, value }) => {
    const result = MusicNoteHelper.semiTonesBetween(firstNote, secondNote);
    expect(result).toEqual(value);
});

test.each`
    firstNote                       | letterDiff | semiTones | expected
    ${new MusicNote(MusicLetter.A)} | ${2}       | ${4}      | ${new MusicNote(MusicLetter.C, MusicAccidental["#"])}
    ${new MusicNote(MusicLetter.A)} | ${1}       | ${2}      | ${new MusicNote(MusicLetter.B)}
`("transpose note", ({ firstNote, letterDiff, semiTones, expected}) => {
    const result = MusicNoteHelper.transpose(firstNote, letterDiff, semiTones);
    expect(result).toMatchObject(expected);
});

test("should transpose", () => {
    const note = new MusicNote(MusicLetter.E);
    const letterDiff =  -2;
    const semiTones = -3;

    const result = MusicNoteHelper.transpose(note, letterDiff, semiTones);
    const expectedResult = new MusicNote(MusicLetter.C, MusicAccidental["#"]);
    expect(result).toMatchObject(expectedResult);
})

test("should transpose to F#", () => {
    const note = new MusicNote(MusicLetter.A);
    const letterDiff =  -2;
    const semiTones = -3;

    const result = MusicNoteHelper.transpose(note, letterDiff, semiTones);
    const expectedResult = new MusicNote(MusicLetter.F, MusicAccidental["#"]);
    expect(result).toMatchObject(expectedResult);
})

test("should transpose to G##", () => {
    const note = new MusicNote(MusicLetter.E, MusicAccidental.b);
    const letterDiff =  -5;
    const semiTones = -7;

    const result = MusicNoteHelper.transpose(note, letterDiff, semiTones);
    const expectedResult = new MusicNote(MusicLetter.G, MusicAccidental["#"]);
    expect(result).toMatchObject(expectedResult);
})

test("should transpose to A# instead of G###", () => {
    const note = new MusicNote(MusicLetter.D, MusicAccidental["#"]);
    const letterDiff =  3;
    const semiTones = 7;

    const result = MusicNoteHelper.transpose(note, letterDiff, semiTones);
    const expectedResult = new MusicNote(MusicLetter.A, MusicAccidental["#"]);
    expect(result).toMatchObject(expectedResult);
})