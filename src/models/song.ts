import { Chord } from "./Chord";
import { ChordDiagram } from "./ChordDiagram";
import { Key } from "./Key";
import { LyricsLine } from "./LyricsLine";
import { LyricsBase } from "./sections/LyricsBase";
import { Section } from "./sections/Section";

export interface TimeSignature {
  topNumber: number;
  bottomNumber: number;
}
export default class Song {
  /**
   * Title of the song
   */
  title: string | null = null;

  /**
   * Subtitle of the song
   */
  subtitle: string | null = null;

  /**
   * Album of the song
   * Multiple albums can be specified
   */
  albums: string[] = [];

  /**
   * Artist of the song
   * Multiple artists can be specified
   */
  artists: string[] = [];

  /**
   * Composer of the song
   */
  composers: string[] = [];

  /**
   * Arranger of the song.
   * Multiple arrangers can be specified
   */
  arrangers: string[] = [];

  /**
   * Writer of the lyrics of the song.
   * Multiple lyricists can be specified
   */
  lyricists: string[] = [];

  /**
   * Year of the first time the song was published
   */
  year: number | null = null;

  /**
   * Copyright information for the song
   */
  copyright: string | null = null;

  /**
   * Key the song is written in
   */
  key: Key | null = null;

  /**
   * Capo setting for the song
   */
  capo: number = 0;

  /**
   * Duration of the song (in seconds)
   */
  duration: number | null = null;

  /**
   * Time signature of the song
   */
  time: TimeSignature | null = null;

  /**
   * Tempo in number of beats per minute for the song
   */
  tempo: number | null = null;

  /**
   * Custom metadatas
   */
  customMetadatas: [string, string | null][] = [];

  /**
   * User defined diagrams
   */
  userDiagrams: ChordDiagram[] = [];

  /**
   * Raw content of the song
   */
  rawContent: string = "";

  sections: Section[] = [];

  /**
   * Get the list of the song's unique chords
   * @returns Array of unique chords
   */
  public getUniqueChords(): Chord[] {
    let chords:Chord[] = []
    this.sections.forEach((section) => {
      if (section instanceof LyricsBase) {
        const lyrics = <LyricsBase>section;
        lyrics.lines.forEach((line) => {
          if (line instanceof LyricsLine) {
            const lyricsLine = <LyricsLine>line;
            lyricsLine.pairs.forEach(pair => {
              if(pair.hasChord()){
                const chord = pair.chord!;
                if(!chords.find(f => f.equals(chord))){
                  chords.push(chord);
                }
              }
            });
          }
        });
      }
    });
    return chords;
  }
  /**
   * Get the real key (without the capo)
   */
  public getRealKey(): Key {
    throw new Error("Not implemented exception");
  }
}
