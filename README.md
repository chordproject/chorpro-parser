# ChordProject Parser

A TypeScript library for parsing, transposing and formatting ChordPro songs.

## Overview

Parse any ChordPro song by using the ChordProParser.
This gives a Song object wich can the be transposed with the Transposer and formatted with the Formatter.
The formatter comes with 3 builders:

-   TextBuilder: format as text
-   HtmlBuilder: format as HTML (cf. style.css)
-   ChordProBuilder: format as ChordPro

#### Part of [ChordProject](https://gochord.com/)

## Usage

### Setup

To install run:

```sh
$ npm i chordproject-parser
```

Load with `import`:

```typescript
import { ChordProParser } from "chordproject-parser";
```

### Parser

To use the ChordProParser:

```typescript
const parser = new ChordProParser();
const song = parser.parse(chordSheet);
```

### Formatter

You can choose between 3 formatters: TextFormatter, HtmlFormatter and ChordProFormatter.

```typescript
const formatter = new HtmlFormatter();
const songText = formatter.format(song);
```

The formatters have default settings. You can change pass the settings in the formatter's constructor or change the settings later.
Here is an example:

```typescript
const settings = new FormatterSettings();
settings.showChords = false;
const formatter = new HtmlFormatter(settings);
```

or simply

```typescript
const formatter = new HtmlFormatter(settings);
formatter.settings.showChords = false;
```

## ChordPro format: Lyrics and Chords

Essentially, it looks like this:

```
    {title: Praise Adonai}
    {artist: Paul Baloche}

    {sot}
    E|-----2---2-----|-------3-3---
    B|---3---3---3---|-----0-------
    G|-2-------------|---0---------
    D|---------------|---0---------
    A|---------------|-2-----------
    E|---------------|-------------
    {eot}

    [Am]Who is like [F]Him,
    The Lion and the [C]Lamb
    Seated on the [G]throne    [E7]
    [Am]Mountains bow [F]down
    Every ocean [C]roars
    To the Lord of [G]hosts

    {start_of_chorus}
    [F]Praise Ado[Am]nai
    From the [G]rising of the sun
    'Till the [Dm7]end of every [F]day[G]
    [F]Praise Ado[Am]nai
    All the [G]nations of the earth
    All the [Dm7] Angels and the [F]Saints
    [G]Sing [Bbsus2]praise
    {end_of_chorus}
```

# With source code

## Demo

To start the demo:

```sh
$ npm run start
```

...then click on the http://localhost:8081/ link to open the demo in your browser

## Unit test

You can add tests in the tests directory and execute them with

```sh
$ npm run test
```

or for the coverage

```sh
$ npm run test:ci
```
