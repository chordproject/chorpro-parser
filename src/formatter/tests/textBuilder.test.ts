import { TextBuilder } from "../../formatter/builders";
import { Chord, ChordLyricsPair } from "../../models";
import { LyricsLine, TabLine } from "../../models/lines";
import { Lyrics, LyricsType } from "../../models/sections";

const _builder = new TextBuilder();

test("format title metadata", () => {
    const value = "Title";
    const result = _builder.titleMetadata(value);
    expect(result).toEqual([value]);
});

test("format subtitle metadata", () => {
    const value = "Subtitle";
    const result = _builder.subtitleMetadata(value);
    expect(result).toEqual([value]);
});

test("format artist metadata", () => {
    const values = ["Artist"];
    const result = _builder.artistsMetadata(values);
    expect(result).toEqual(values);
});

test("format artists metadata", () => {
    const values = ["A1", "A2"];
    const result = _builder.artistsMetadata(values);
    expect(result).toEqual(["A1, A2"]);
});

test("format composer metadata", () => {
    const values = ["C1"];
    const result = _builder.composersMetadata(values);
    expect(result).toEqual(["Composer: C1"]);
});

test("format composers metadata", () => {
    const values = ["C1", "C2"];
    const result = _builder.composersMetadata(values);
    expect(result).toEqual(["Composers: C1, C2"]);
});

test("format lyricist metadata", () => {
    const values = ["L1"];
    const result = _builder.lyricistsMetadata(values);
    expect(result).toEqual(["Lyricist: L1"]);
});

test("format lyricists metadata", () => {
    const values = ["L1", "L2"];
    const result = _builder.lyricistsMetadata(values);
    expect(result).toEqual(["Lyricists: L1, L2"]);
});

test("format arranger metadata", () => {
    const values = ["A1"];
    const result = _builder.arrangersMetadata(values);
    expect(result).toEqual(["Arranger: A1"]);
});

test("format arrangers metadata", () => {
    const values = ["A1", "A2"];
    const result = _builder.arrangersMetadata(values);
    expect(result).toEqual(["Arrangers: A1, A2"]);
});

test("format year metadata", () => {
    const value = 2000;
    const result = _builder.yearMetadata(value);
    expect(result).toEqual(["Year: 2000"]);
});

test("format time metadata", () => {
    const value = "4/4";
    const result = _builder.timeMetadata(value);
    expect(result).toEqual(["Time: 4/4"]);
});

test("format tempo metadata", () => {
    const value = 120;
    const result = _builder.tempoMetadata(value);
    expect(result).toEqual(["Tempo: 120"]);
});

test("format duration metadata", () => {
    const value = 130;
    const result = _builder.durationMetadata(value);
    expect(result).toEqual(["Duration: 02:10"]);
});

test("format capo metadata", () => {
    const value = 2;
    const result = _builder.capoMetadata(value);
    expect(result).toEqual(["Capo: 2"]);
});

test("format key metadata", () => {
    const value = "Am";
    const result = _builder.keyMetadata(value);
    expect(result).toEqual(["Key: Am"]);
});

test("format custom metadatas with value", () => {
    const values: [string, string][] = [
        ["test", "abc"],
        ["test2", "def"],
    ];
    const result = _builder.customMetadatas(values);
    expect(result).toEqual(["Test: abc", "Test2: def"]);
});

test("format empty line", () => {
    const result = _builder.emptyLine();
    expect(result).toEqual([""]);
});

test("format chorus section start", () => {
  const result = _builder.sectionStart(new Lyrics(LyricsType.Chorus, "chorus", "Chorus"));
  expect(result).toEqual(["Chorus"]);
});

test("format chorus section end", () => {
  const result = _builder.sectionEnd(new Lyrics(LyricsType.Chorus, "chorus", "Chorus"));
  expect(result).toEqual([]);
});

test("format lyrics line without chords", () => {
    let pairs = [new ChordLyricsPair("Test ", null)];
    let line = new LyricsLine(pairs);
    const expectedLine = "Test";
    const result = _builder.lyricsLine(line);
    expect([expectedLine]).toEqual(result);
});

test("format lyrics line", () => {
    let pairs = [
        new ChordLyricsPair("Test ", null),
        new ChordLyricsPair("Test ", Chord.parse("Am")),
        new ChordLyricsPair("Test", null, "abc"),
    ];
    let line = new LyricsLine(pairs);
    const expectedFirstLine = `${" ".repeat(5)}Am${" ".repeat(3)}abc`;
    const expectedSecondLine = "Test Test Test";
    const result = _builder.lyricsLine(line);
    expect([expectedFirstLine, expectedSecondLine]).toEqual(result);
});

test("format lyrics line with lyrics shorter than chords", () => {
    let pairs = [
        new ChordLyricsPair("Test ", null),
        new ChordLyricsPair("Test ", Chord.parse("Am7sus4")),
        new ChordLyricsPair("Test", null, "abc"),
    ];
    let line = new LyricsLine(pairs);
    const expectedFirstLine = `${" ".repeat(5)}Am7sus4 abc`;
    const expectedSecondLine = "Test Test    Test";
    const result = _builder.lyricsLine(line);
    expect([expectedFirstLine, expectedSecondLine]).toEqual(result);
});

test("format tab line", () => {
  const line = "e|--1--|";
  const result = _builder.tabLine(new TabLine(line));
  expect(result).toEqual([line]);
});
