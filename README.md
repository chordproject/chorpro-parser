# ChordProject Parser

A TypeScript library for parsing ChordPro songs.

## Overview

Reads marked-up music (lyrics + chords) extracting all of the chords used.

#### Part of [ChordProject](https://gochord.com/)

## Usage

`ChordProject Parser` is on npm, to install run:

```sh
$ npm i chordproject-parser
```

Load with `require()`:

```typescript
var ChordProParser = require("chordproject-parser");
```

or `import` (es6, typescript):

```typescript
import * as ChordProParser from "chordproject-parser";
```

And call the Main class:

```javascript
ChordProParser.parse(chordSheet);
```

## Demo

Open demo/index.html on the browser to see a webpage example.

You can also modify the sources to see changes:

1.  Clone
2.  Install dependencies

```sh
$ npm i
```

3.  Change the songText input in demo/sample.js (Or any source file in src)
4.  Bundle files with webpack (the output will be in dist folder)

```sh
$ npm run build
```

5.  Open again demo/index.html to see the result!

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

## Unit test

You can add tests in the tests directory and execute them with

```sh
$ npm run test
```

or for the coverage

```sh
$ npm run test:ci
```

## Contribute
