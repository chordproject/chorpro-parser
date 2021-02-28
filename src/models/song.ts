import { Chord } from "./chord";
import { ChordDiagram } from "./chordDiagram";
import { Key } from "./key";

interface TimeSignature {
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
  album: string[] | null = null;

  /**
   * Artist of the song
   * Multiple artists can be specified
   */
  artist: string[] | null = null;
  
  /**
   * Composer of the song
   */
  composer: string | null = null;

  /**
   * Arranger of the song.
   * Multiple arrangers can be specified
   */
  arranger: string[] | null = null;

  /**
   * Writer of the lyrics of the song.
   * Multiple lyricists can be specified
   */
  lyricist: string[] | null = null;

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
  capo: number | null = null;

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
   * User defined diagrams
   */
  userDiagrams: ChordDiagram[] = [];



  /**
   * List of unique chords in the song
   */
  uniqueChords: Chord[] = [];

  /**
   * Chord diagrams
   */
  diagrams: ChordDiagram[] = [];

  /**
   * Raw content of the song
   */
  rawContent: string = "";

  /**
   * Returns TRUE if the song as any chords
   */
  public hasChords(): boolean {
    return this.uniqueChords && this.uniqueChords.length > 0;
  }

  /**
   * Get the real key (without the capo)
   */
  public getRealKey(): Key {
    throw new Error("Not implemented exception");
  }
}
