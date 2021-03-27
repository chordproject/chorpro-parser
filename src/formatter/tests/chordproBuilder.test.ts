import { ChordProBuilder } from "../builders";
import { Chord, ChordLyricsPair } from "../../models";
import { LyricsLine, TabLine } from "../../models/lines";
import { Lyrics,LyricsType } from "../../models/sections";

const _builder = new ChordProBuilder();

test("format title metadata", () => {
    const value = "Title";
    const expected = "{title: Title}";
    const result = _builder.titleMetadata(value);
    expect(result).toEqual([expected]);
});

test("format subtitle metadata", () => {
    const value = "Subtitle";
    const expected = "{subtitle: Subtitle}";
    const result = _builder.subtitleMetadata(value);
    expect(result).toEqual([expected]);
});

test("format artist metadata", () => {
    const values = ["Artist"];
    const result = _builder.artistsMetadata(values);
    const expected = "{artist: Artist}";
    expect(result).toEqual([expected]);
});

test("format artists metadata", () => {
    const values = ["A1", "A2"];
    const result = _builder.artistsMetadata(values);
    const expected = ["{artist: A1}", "{artist: A2}"];
    expect(result).toEqual(expected);
});

test("format composer metadata", () => {
    const values = ["C1"];
    const result = _builder.composersMetadata(values);
    const expected = "{composer: C1}";
    expect(result).toEqual([expected]);
});

test("format composers metadata", () => {
    const values = ["C1", "C2"];
    const result = _builder.composersMetadata(values);
    const expected = ["{composer: C1}", "{composer: C2}"];
    expect(result).toEqual(expected);
});

test("format lyricist metadata", () => {
    const values = ["L1"];
    const result = _builder.lyricistsMetadata(values);
    const expected = "{lyricist: L1}";
    expect(result).toEqual([expected]);
});

test("format lyricists metadata", () => {
    const values = ["L1", "L2"];
    const result = _builder.lyricistsMetadata(values);
    const expected = ["{lyricist: L1}", "{lyricist: L2}"];
    expect(result).toEqual(expected);
});

test("format arranger metadata", () => {
    const values = ["A1"];
    const result = _builder.arrangersMetadata(values);
    const expected = "{arranger: A1}";
    expect(result).toEqual([expected]);
});

test("format arrangers metadata", () => {
    const values = ["A1", "A2"];
    const result = _builder.arrangersMetadata(values);
    const expected = ["{arranger: A1}", "{arranger: A2}"];
    expect(result).toEqual(expected);
});

test("format year metadata", () => {
    const value = 2000;
    const result = _builder.yearMetadata(value);
    const expected = "{year: 2000}";
    expect(result).toEqual([expected]);
});

test("format time metadata", () => {
    const value = "4/4";
    const result = _builder.timeMetadata(value);
    const expected = "{time: 4/4}";
    expect(result).toEqual([expected]);
});

test("format tempo metadata", () => {
    const value = 120;
    const result = _builder.tempoMetadata(value);
    const expected = "{tempo: 120}";
    expect(result).toEqual([expected]);
});

test("format duration metadata", () => {
    const value = 130;
    const result = _builder.durationMetadata(value);
    const expected = "{duration: 02:10}";
    expect(result).toEqual([expected]);
});

test("format capo metadata", () => {
    const value = 2;
    const result = _builder.capoMetadata(value);
    const expected = "{capo: 2}";
    expect(result).toEqual([expected]);
});

test("format key metadata", () => {
    const value = "Am";
    const result = _builder.keyMetadata(value);
    const expected = "{key: Am}";
    expect(result).toEqual([expected]);
});

test("format custom metadatas with value", () => {
    const values: [string, string][] = [
        ["test", "abc"],
        ["test2", "def"],
    ];
    const result = _builder.customMetadatas(values);
    const expected = ["{test: abc}", "{test2: def}"];
    expect(result).toEqual(expected);
});

test("format empty line", () => {
    const result = _builder.emptyLine();
    expect(result).toEqual([""]);
});

test("format chorus section start", () => {
    const result = _builder.sectionStart(
        new Lyrics(LyricsType.Chorus, "chorus", "Chorus")
    );
    const expected = "{start_of_chorus: Chorus}";
    expect(result).toEqual([expected]);
});

test("format chorus section end", () => {
    const result = _builder.sectionEnd(
        new Lyrics(LyricsType.Chorus, "chorus", "Chorus")
    );
    const expected = "{end_of_chorus}";
    expect(result).toEqual([expected]);
});

test("format lyrics line without chords", () => {
    let pairs = [new ChordLyricsPair("Test ", null)];
    let line = new LyricsLine(pairs);
    const result = _builder.lyricsLine(line);
    const expected = "Test";
    expect(result).toEqual([expected]);
});

test("format lyrics line", () => {
    let pairs = [
        new ChordLyricsPair("Test ", null),
        new ChordLyricsPair("Test ", Chord.parse("Am")),
        new ChordLyricsPair("Test", null, "abc"),
    ];
    let line = new LyricsLine(pairs);
    const result = _builder.lyricsLine(line);
    const expected = "Test [Am]Test [*abc]Test";
    expect(result).toEqual([expected]);
});

test("format tab line", () => {
    const line = "e|--1--|";
    const result = _builder.tabLine(new TabLine(line));
    expect(result).toEqual([line]);
});
