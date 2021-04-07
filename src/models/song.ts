import { Chord, Key, ChordDiagram, MusicNote } from ".";
import { IClonable } from "./IClonable";
import { LyricsLine } from "./lines";
import { LyricsBase, Section } from "./sections";

export interface TimeSignature {
  topNumber: number;
  bottomNumber: number;
}
export class Song implements IClonable<Song> {
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


  private getAllChords() {
    let chords: Chord[] = []
    this.sections.forEach((section) => {
      if (section instanceof LyricsBase) {
        const lyrics = <LyricsBase>section;
        lyrics.lines.forEach((line) => {
          if (line instanceof LyricsLine) {
            const lyricsLine = <LyricsLine>line;
            lyricsLine.pairs.forEach(pair => {
              if (pair.hasChord()) {
                const chord = pair.chord!;
                  chords.push(chord);
              }
            });
          }
        });
      }
    });
    return chords;
  }

  /**
   * Get the list of the song's unique chords
   * @returns Array of unique chords
   */
  public getUniqueChords(): Chord[] {
    const chords = this.getAllChords();
    let uniqueChords:Chord[] = [];
    chords.forEach(chord => {
      if (!uniqueChords.find(f => f.equals(chord))) {
        uniqueChords.push(chord);
      }
    });
    return uniqueChords;
  }

  // public getPossibleKey(): Key {
      
  // }

  public clone(): Song {
    let clonedSong = new Song();
    clonedSong.albums = this.albums;
    clonedSong.arrangers = this.arrangers;
    clonedSong.artists = this.artists;
    clonedSong.capo = this.capo;
    clonedSong.composers = this.composers;
    clonedSong.copyright = this.copyright;
    clonedSong.customMetadatas = this.customMetadatas;
    clonedSong.duration = this.duration;
    clonedSong.lyricists = this.lyricists;
    clonedSong.rawContent = this.rawContent;
    clonedSong.subtitle = this.subtitle;
    clonedSong.tempo = this.tempo;
    clonedSong.title = this.title;
    clonedSong.year = this.year;
    if (this.time) {
      clonedSong.time = { bottomNumber: this.time.bottomNumber, topNumber: this.time.topNumber }
    }
    if (this.key) {
      clonedSong.key = this.key.clone();
    }

    this.userDiagrams.forEach(userDiagram => {
      clonedSong.userDiagrams.push(userDiagram.clone());
    });

    this.sections.forEach(section => {
      clonedSong.sections.push(section.clone());
    });
    return clonedSong;
  }
}
