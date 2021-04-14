import { HtmlBuilder } from "../builders";
import { Chord, ChordLyricsPair } from "../../models";
import { CommentLine, LyricsLine, TabLine } from "../../models/lines";
import { Lyrics, LyricsType } from "../../models/sections";

const _builder = new HtmlBuilder();

test("format title metadata", () => {
    const value = "Title";
    const expected = `<h1 class="metadata title-metadata">${value}</h1>`;
    const result = _builder.titleMetadata(value);
    expect(result).toEqual([expected]);
});

test("format subtitle metadata", () => {
    const value = "Subtitle";
    const expected = `<h2 class="metadata subtitle-metadata">${value}</h2>`;
    const result = _builder.subtitleMetadata(value);
    expect(result).toEqual([expected]);
});

test("format artist metadata", () => {
    const values = ["Artist"];
    const result = _builder.artistsMetadata(values);
    const expected = `<h3 class="metadata artist-metadata">${values.join(", ")}</h3>`;
    expect(result).toEqual([expected]);
});

test("format artists metadata", () => {
    const values = ["A1", "A2"];
    const result = _builder.artistsMetadata(values);
    const expected = `<h3 class="metadata artist-metadata">${values.join(", ")}</h3>`;
    expect(result).toEqual([expected]);
});

test("format composer metadata", () => {
    const values = ["C1"];
    const result = _builder.composersMetadata(values);
    const label = "Composer";
    const expected = `<div class="metadata composer-metadata">${label}: ${values.join(", ")}</div>`;
    expect(result).toEqual([expected]);
});

test("format composers metadata", () => {
    const values = ["C1", "C2"];
    const result = _builder.composersMetadata(values);
    const label = "Composers";
    const expected = `<div class="metadata composer-metadata">${label}: ${values.join(", ")}</div>`;
    expect(result).toEqual([expected]);
});

test("format lyricist metadata", () => {
    const values = ["L1"];
    const result = _builder.lyricistsMetadata(values);
    const label = "Lyricist";
    const expected = `<div class="metadata lyricist-metadata">${label}: ${values.join(", ")}</div>`;
    expect(result).toEqual([expected]);
});

test("format lyricists metadata", () => {
    const values = ["L1", "L2"];
    const result = _builder.lyricistsMetadata(values);
    const label = "Lyricists";
    const expected = `<div class="metadata lyricist-metadata">${label}: ${values.join(", ")}</div>`;
    expect(result).toEqual([expected]);
});

test("format arranger metadata", () => {
    const values = ["A1"];
    const result = _builder.arrangersMetadata(values);
    const label = "Arranger";
    const expected = `<div class="metadata arranger-metadata">${label}: ${values.join(", ")}</div>`;
    expect(result).toEqual([expected]);
});

test("format arrangers metadata", () => {
    const values = ["A1", "A2"];
    const result = _builder.arrangersMetadata(values);
    const label = "Arrangers";
    const expected = `<div class="metadata arranger-metadata">${label}: ${values.join(", ")}</div>`;
    expect(result).toEqual([expected]);
});

test("format year metadata", () => {
    const value = 2000;
    const result = _builder.yearMetadata(value);
    const label = "Year";
    const expected = `<div class="metadata year-metadata">${label}: ${value}</div>`;
    expect(result).toEqual([expected]);
});

test("format time metadata", () => {
    const value = "4/4";
    const result = _builder.timeMetadata(value);
    const label = "Time";
    const expected = `<div class="metadata time-metadata">${label}: ${value}</div>`;
    expect(result).toEqual([expected]);
});

test("format tempo metadata", () => {
    const value = 120;
    const result = _builder.tempoMetadata(value);
    const label = "Tempo";
    const expected = `<div class="metadata tempo-metadata">${label}: ${value}</div>`;
    expect(result).toEqual([expected]);
});

test("format copyright metadata", () => {
    const value = "test";
    const result = _builder.copyrightMetadata(value);
    const label = "Copyright";
    const expected = `<div class="metadata copyright-metadata">${label}: ${value}</div>`;
    expect(result).toEqual([expected]);
});

test("format duration metadata", () => {
    const value = 130;
    const result = _builder.durationMetadata(value);
    const label = "Duration";
    const expected = `<div class="metadata duration-metadata">${label}: 02:10</div>`;
    expect(result).toEqual([expected]);
});

test("format capo metadata", () => {
    const value = 2;
    const result = _builder.capoMetadata(value);
    const label = "Capo";
    const expected = `<div class="metadata capo-metadata">${label}: ${value}</div>`;
    expect(result).toEqual([expected]);
});

test("format key metadata", () => {
    const value = "Am";
    const result = _builder.keyMetadata(value);
    const label = "Key";
    const expected = `<div class="metadata key-metadata">${label}: ${value}</div>`;
    expect(result).toEqual([expected]);
});

test("format custom metadatas with value", () => {
    const values: [string, string][] = [["test", "abc"]];
    const result = _builder.customMetadatas(values);
    const label = "Test";
    const expected = `<div class="metadata custom-metadata">${label}: abc</div>`;
    expect(result).toEqual([expected]);
});

test("format empty line", () => {
    const result = _builder.emptyLine();
    const expected = `<div class="row empty-line"></div>`;
    expect(result).toEqual([expected]);
});

test("format comment line", () => {
    const comment = "test";
    const commentLine = new CommentLine(comment);
    const result = _builder.commentLine(commentLine);
    const expected = `<div class="row comment-line">${comment}</div>`;
    expect(result).toEqual([expected]);
});

test("format chorus section start", () => {
    const result = _builder.sectionStart(new Lyrics(LyricsType.Chorus, "chorus", "Chorus"));
    const firstExpectedLine = `<div class="section chorus-section">`;
    const secondExpectedLine = `<div class="section-title">Chorus</div>`;
    expect(result).toEqual([firstExpectedLine, secondExpectedLine]);
});

test("format chorus section end", () => {
    const result = _builder.sectionEnd(new Lyrics(LyricsType.Chorus, "chorus", "Chorus"));
    const expected = "</div>";
    expect(result).toEqual([expected]);
});

test("format lyrics line without chords", () => {
    let pairs = [new ChordLyricsPair("Test ", null)];
    let line = new LyricsLine(pairs);
    const result = _builder.lyricsLine(line);
    const expected = `<div class="row lyrics-line"><div class="column"><div class="lyrics">Test </div></div></div>`;
    expect(result).toEqual([expected]);
});

test("format lyrics line", () => {
    let pairs = [new ChordLyricsPair("Test ", null), new ChordLyricsPair("Test ", Chord.parse("Am")), new ChordLyricsPair("Test", null, "abc")];
    let line = new LyricsLine(pairs);
    const result = _builder.lyricsLine(line);
    const expected = `<div class="row lyrics-line"><div class="column"><div class="lyrics">Test </div></div><div class="column"><div class="chord">Am</div><div class="lyrics">Test </div></div><div class="column"><div class="annotation">abc</div><div class="lyrics">Test</div></div></div>`;
    expect(result).toEqual([expected]);
});

test("format tab line", () => {
    const lineValue = "e|--1--|";
    const line = new TabLine(lineValue);
    const result = _builder.tabLine(line);
    const expected = `<div class="row tab-line">${lineValue}</div>`;
    expect(result).toEqual([expected]);
});
