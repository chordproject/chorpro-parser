export abstract class ChordAliases {
  // aliases for the chord keys
  public readonly keyAliases = new Map([
    ["A#", "Bb"],
    ["Db", "C#"],
    ["D#", "Eb"],
    ["Gb", "F#"],
    ["Ab", "G#"],
    ["E#", "F"],
    ["Fb", "E"],
    ["B#", "C"],
    ["Cb", "B"],
  ]);

  //aliases for the chord types
  public readonly typeAliases = new Map([
    ["M", ""],
    ["maj", ""],
    ["Major", ""],
    ["-", "m"],
    ["", "m"],
    ["sus", "sus4"],
    ["4", "sus4"],
    ["2", "sus2"],
    ["aug", "+"],
    ["b5", "Mb5"],
    ["-#5", "m#5"],
    ["maj7", "M7"],
  ]);

  /**
   * A chord name normalizer: We don't store any chord definitions for A#, Db, D#, Gb, or Ab. Instead
   * definitions of the more common notes are stored instead. So for the A# fingering we return the
   * Bb fingering and so on.
   *
   * @param chordName The chord name
   * @return Alias or original chord key if there is no defined alias.
   */
  public getKeyAlias(key: string) {
    return this.keyAliases.get(key) ? this.keyAliases.get(key) : key;
  }

  public getTypeAlias(key: string) {
    return this.typeAliases.get(key) ? this.typeAliases.get(key) : key;
  }
}
