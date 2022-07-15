import { Tag, TagType } from "../../parsers/Tag";

test("parse custom tag", () => {
    const tag = Tag.parse(" x_test ");
    const expectedType = TagType.Custom;
    const expectedName = "x_test";
    const expectedValue = null;
    expect(tag).toBeDefined();
    expect(tag?.longName).toEqual(expectedName);
    expect(tag?.shortName).toEqual(expectedName);
    expect(tag?.type).toEqual(expectedType);
    expect(tag?.value).toEqual(expectedValue);
});

test("parse meta tag", () => {
    const tag = Tag.parse("artist: Elton John");
    const expectedType = TagType.Metadata;
    const expectedName = "artist";
    const expectedValue = "Elton John";
    expect(tag).toBeDefined();
    expect(tag?.longName).toEqual(expectedName);
    expect(tag?.shortName).toEqual(expectedName);
    expect(tag?.type).toEqual(expectedType);
    expect(tag?.value).toEqual(expectedValue);
});

test("parse start_of_verse tag", () => {
    const tag = Tag.parse("start_of_verse: Verse 1");
    const expectedType = TagType.StartOfBlock;
    const expectedName = "start_of_verse";
    const expectedShortName = "sov";
    const expectedValue = "Verse 1";
    expect(tag).toBeDefined();
    expect(tag?.longName).toEqual(expectedName);
    expect(tag?.shortName).toEqual(expectedShortName);
    expect(tag?.type).toEqual(expectedType);
    expect(tag?.value).toEqual(expectedValue);
});

test("parse end_of_chorus tag", () => {
    const tag = Tag.parse("end_of_chorus");
    const expectedType = TagType.EndOfBlock;
    const expectedName = "end_of_chorus";
    const expectedShortName = "eoc";
    const expectedValue = null;
    expect(tag).toBeDefined();
    expect(tag?.longName).toEqual(expectedName);
    expect(tag?.shortName).toEqual(expectedShortName);
    expect(tag?.type).toEqual(expectedType);
    expect(tag?.value).toEqual(expectedValue);
});

test("parse eoc tag", () => {
    const tag = Tag.parse("eoc");
    const expectedType = TagType.EndOfBlock;
    const expectedName = "end_of_chorus";
    const expectedShortName = "eoc";
    const expectedValue = null;
    expect(tag).toBeDefined();
    expect(tag?.longName).toEqual(expectedName);
    expect(tag?.shortName).toEqual(expectedShortName);
    expect(tag?.type).toEqual(expectedType);
    expect(tag?.value).toEqual(expectedValue);
});

test("parse meta tag using a known tag", () => {
    const tag = Tag.parse("meta: title Imagine");
    const expectedType = TagType.Metadata;
    const expectedName = "title";
    const expectedShortName = "t";
    const expectedValue = "Imagine";
    expect(tag).toBeDefined();
    expect(tag?.longName).toEqual(expectedName);
    expect(tag?.shortName).toEqual(expectedShortName);
    expect(tag?.type).toEqual(expectedType);
    expect(tag?.value).toEqual(expectedValue);
});

test("parse meta tag using an custom tag", () => {
    const tag = Tag.parse("meta: guitarist Ritchie Blackmore");
    const expectedType = TagType.CustomMetadata;
    const expectedName = "guitarist";
    const expectedValue = "Ritchie Blackmore";
    expect(tag).toBeDefined();
    expect(tag?.longName).toEqual(expectedName);
    expect(tag?.shortName).toEqual(expectedName);
    expect(tag?.type).toEqual(expectedType);
    expect(tag?.value).toEqual(expectedValue);
});

test("parse define tag", () => {
    const tag = Tag.parse("define: Bes base-fret 1 frets 1 1 3 3 3 1 fingers 1 1 2 3 4 1");
    const expectedType = TagType.Define;
    const expectedName = "define";
    const expectedValue = "Bes base-fret 1 frets 1 1 3 3 3 1 fingers 1 1 2 3 4 1";
    expect(tag).toBeDefined();
    expect(tag?.longName).toEqual(expectedName);
    expect(tag?.shortName).toEqual(expectedName);
    expect(tag?.type).toEqual(expectedType);
    expect(tag?.value).toEqual(expectedValue);
});

test("parse comment tag", () => {
    const tag = Tag.parse("comment: my comment");
    const expectedType = TagType.Comment;
    const expectedName = "comment";
    const expectedShortName = "c";
    const expectedValue = "my comment";
    expect(tag).toBeDefined();
    expect(tag?.longName).toEqual(expectedName);
    expect(tag?.shortName).toEqual(expectedShortName);
    expect(tag?.type).toEqual(expectedType);
    expect(tag?.value).toEqual(expectedValue);
});

test("parse wrong tag should returns undefined", () => {
    const tag = Tag.parse("tralala: test");
    expect(tag).toBeUndefined();
});
