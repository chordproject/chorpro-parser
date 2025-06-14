import { ChordProParser, Transposer } from "../src";
import { HtmlFormatter } from "../src/formatter";
import { HtmlBuilder } from "../src/formatter/builders";
import { FormatterSettings } from "../src/formatter/FormatterSettings";

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

const settings = new FormatterSettings();

settings.showMetadata = true;
settings.showTabs = true;
settings.useSimpleChord = false;
settings.showChords = true;

const formatter = new HtmlFormatter(settings);
let currentSong = song; // Maintain the current state of the song

const renderSong = (song: any) => {
    const demoElement = document.getElementById("demo")!;
    demoElement.innerHTML = ""; // Clear the entire container
    const result = formatter.format(song);
    demoElement.innerHTML = result.join("\n"); // Replace content directly
};

// Ensure event listeners are added only once
document.getElementById("transpose-up")!.addEventListener("click", () => {
    currentSong = Transposer.transpose(currentSong, "up"); // Transpose the current state
    renderSong(currentSong);
});

document.getElementById("transpose-down")!.addEventListener("click", () => {
    currentSong = Transposer.transpose(currentSong, "down"); // Transpose the current state
    renderSong(currentSong);
});

// Initial render
renderSong(currentSong);

const timeString = song.time?.toString();
console.log("Time: " + timeString);
