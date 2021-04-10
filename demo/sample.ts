import { Formatter, ChordProParser, HtmlBuilder, TextBuilder, Transposer } from '../src';
import { BuilderSettingsBase } from '../src/formatter/builders/BuilderSettingsBase';
import { FormatterSettings } from '../src/formatter/FormatterSettings';
import { MusicAccidental, MusicLetter, MusicNote } from '../src/models';

('use strict');

var chordSheet = `
    {title: Praise Adonai}
    {subtitle: ChordProject Parser demo}
    {artist: Paul Baloche}
    
    [Em7]Is this the real life
    [A7]Is this just fantasy
    [D7]Caught in a [Am7]land[D7]slide
    No e[G]scape from reality
    [Em]Open your eyes
    Look [G7]up to the skies and s[C]ee
    [Am]I'm just a poor boy, [D7]I need no sympathy
    Because I'm [G#]easy [G]come, [F#]easy [G]go,
    [G#]little [G]high, [F#]little [G]low,
    [C]Any way the [G/B]wind blows, [Bbdim7]doesn't really [D7/A]matter to me,
    To [G]me
    
    
    
    
    [G]Mama, just [Em]killed a man,
    Put a [Am]gun against his head,
    Pulled my [Am]trigger, now he's d[D]ead,
    [G]Mama, life had [Em]just begun,
    But [Am]now I've gone and [Am/G#]thrown it [Am/G]all  [Am/F#]away    [Am/F]     [Am/E]    
    [C]Mama [G]oo[Am]ooh,
    Didn't [Dm]mean to make you cry
    If [G]I'm not back again this time tom[C]orrow
    Carry [G]on, carry [Am]on, as if [Fm]nothing really mat[C]ters
    
    [G] 
    
    
    
    
    [G]Too late, my [Em]time has come,
    Sends [Am]shivers down my spine
    Body's [Am]aching all the ti[D]me,
    [G]Goodbye everybody - I've [Em]got to go
    Gotta [Am]leave you all be[Am/G#]hind and [Am/G]face [Am/F#]  the tru[Am/F]th   [Am/E]    
    [C]Mama [G]oo[Am]ooh (any way the wind blows)
    [Dm]I don't want to die,
    I [G]sometimes wish I'd never been born at a[C]ll
    
    
    
    
    [C] [G] [Am] [Dm] [G] 
    [C] [G] [Am] [Dm] [Bb] [Bb] [A] [G#] [G] [F#] 
    
    
    
    
    [B]I [F#]see a [F]little [F#]silhou[B]etto [F#]of a [F]man,
    [F#]Scara[B]mouche, [F#]scara[B]mouche, [F#]will you [F]do the [F#]Fan[B]dan[F#]go
    [A#]Thunderbolt and [F]lightning, [A]very very [C#]frightening [F#]me
    [N.C.]Galileo, Galileo
    [N.C.]Galileo, Galileo
    [N.C.]Galileo, Figaro - Magnifico
    
    [G#]I'm [G]just a [F#]poor [G]boy, [G#]no-[G]body [F#]loves [G]me.
    [F]He's [C]just a [Cdim]poor [C]boy [F]from a [C]poor [Cdim]fami-[C]ly.
    [F]Spare him his [C/E]life from this [D]monstrosi[G]ty.  [F]   [C/E]     [D#dim]       [Dm7]   
    [G#]Easy [G]come, [F#]easy [G]go, [G#]will you [G]let me [F#]go?  [G]Bis[C]mil[G]lah!
    [C]No, we [G]will not let you go.  [G]Bis[C]mil[G]lah!
    [G]We will not let you go.  [G]Bis[C]mil[G]lah!  [G]We will not let you go.
    [G]Will not let you go.  [G]Will not let you go. Ahhhh[D#7]hhhhh
    [G#m]No, [F#]no, [B]no, [A#]no, [D#]no, [G]no, [C]no.  [N.C.]Oh, mama mia, mama mia
    Mama [C]mia, let me [G]go.  Be[C]elze[F]bub has a [B]devil put a[Em]side for [G]me,
    
    
    
    
    [C] [C] [C] [D] 
    
    
    
    
    [G]  So you think you can stone me and [C]spit in my [G]eye [Bb]  
    [G]  So you think you can love me and [C]leave me to [F]die
    [Dm]Oh, [G]baby -[Dm] can't do this to me, [G]baby
    [Dm]Just gotta get [G]out - [Dm]just gotta get [G]right outta [C]here
    
    
    
    
    [C] [C] [C] [D] [N.C.] 
    [Ab] [F] [G] [G] [G] 
    [C] [G] [Am] [E] [Am] [E] [Am] [G] [C] [B] [Em] [F] [C] 
    
    
    
    
    [Am]Nothing really mat[Em]ters,
    [Am]Anyone can [Em]see,
    [Am]Nothing really mat[Fm]ters, [F/G]nothing really matters to [C]me,
    
    
    
    
    [C] [F/C] [C] [Cdim] 
    [G/B] [Gm/Bb] [A] [Bbdim] [A] [A7] [D] 
    
    
    
    
    [G]Any [D/F#]way the [Ddim/F]wind   [Em7]blows .[D]..
    
    
    `.substring(1);

const cp = new ChordProParser();
const song = cp.parse(chordSheet);
const transposedSong = Transposer.transpose(song, new MusicNote(MusicLetter.C, MusicAccidental['#']));
console.log(song);
console.log(cp.warnings);

const settings = new BuilderSettingsBase();
settings.useSimpleChord = true;
settings.showChords = true;

const formatterSettings = new FormatterSettings();
formatterSettings.showMetadata = true;
formatterSettings.showTabs = true;

const htmlBuilder = new TextBuilder(settings);
const formatter = new Formatter(htmlBuilder, formatterSettings);
const result = formatter.format(transposedSong);
//document.body.innerHTML = `${result.join("\n")}`
//document.body.innerHTML = `<pre>${result.join('\n')}</pre>`;
document.getElementById('demo')!.innerHTML = `<pre>${result.join('\n')}</pre>`;
