import { ChordProParser } from "../src/parsers/ChordProParser";

('use strict');

var chordSheet = `
    {title: Praise Adonai}
    {subtitle: ChordProject Parser demo}
    {artist: Paul Baloche}
    {key: Am}
    
    {sot}
    E|-----2---2-----|-------3-3---
    B|---3---3---3---|-----0-------
    G|-2-------------|---0---------
    D|---------------|---0---------
    A|---------------|-2-----------
    E|---------------|-------------
    {eot}
    
    [Am]Who is like [Bb11]Him,
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
console.log(song);
