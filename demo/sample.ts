import { ChordProParser, Transposer } from "../src";
import { ChordProFormatter, HtmlFormatter } from "../src/formatter";
import { FormatterSettings } from "../src/formatter/FormatterSettings";
import { MusicAccidental, MusicLetter, MusicNote } from "../src";

("use strict");

var chordSheet = `
{title: Praise Adonai}
{subtitle: ChordProject Parser demo}
{artist: Paul Baloche}
{time: 4/4}
{key: Am}

[Am] [F] [C] [G]
[Am] [F] [C] [G] 

{start_of_verse: Verse 1}
Leave me [Am]out with the [F]waste,
This is [C]not what I [G]do.
It's the [Am]wrong kind of [F]place
To be [C]thinking of [G]you.
It's the [Am]wrong [F]time,
For [C]somebody [G]new
It's a small[Am] crime[F],
And I've [C]got no excuse [G]
{end_of_verse}

{c:Intro}
{sot}
E|-----2---2-----|-------3-3---
B|---3---3---3---|-----0-------
G|-2-------------|---0---------
D|---------------|---0---------
A|---------------|-2-----------
E|---------------|-------------
{eot}

[Am/C]Who is like [Bb11]Him,
The Lion and the [C#m]Lamb
Seated on the [Gm]throne    [E7]
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
    `.substring(1);

const cp = new ChordProParser();
const song = cp.parse(chordSheet);
const transposedSong = Transposer.transpose(song, new MusicNote(MusicLetter.A, MusicAccidental["#"]));

const settings = new FormatterSettings();
settings.showMetadata = true;
settings.showTabs = true;
settings.useSimpleChord = false;
settings.showChords = true;

const formatter = new HtmlFormatter(settings);
const result = formatter.format(transposedSong);
document.body.innerHTML = `${result.join("\n")}`;

const timeString = song.time?.toString();
console.log("Time: " + timeString);
//document.body.innerHTML = `<pre>${result.join('\n')}</pre>`;
//document.getElementById('demo')!.innerHTML = `<pre>${result.join('\n')}</pre>`;
