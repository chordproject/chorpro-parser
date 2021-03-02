import { Diagram } from "chord*.json";
import { ChordAliases } from "./ChordAliases";
import { Chord } from "./models/Chord";
import { ChordDiagram } from "./models/ChordDiagram";

export class ChordDefinitions {
  async get(chord: Chord): Promise<ChordDiagram[] | undefined> {
    const note = ChordAliases.getNoteAlias(chord.note);
    if (!note) {
      return undefined;
    }
    switch (note.toString()) {
      case "Ab":
        return this.getDiagrams(chord, "./chords/chordAb.json");
      case "A":
        return this.getDiagrams(chord, "./chords/chordA.json");
      case "Bb":
        return this.getDiagrams(chord, "./chords/chordBb.json");
      case "B":
        return this.getDiagrams(chord, "./chords/chordB.json");
      case "C":
        return this.getDiagrams(chord, "./chords/chordC.json");
      case "Db":
        return this.getDiagrams(chord, "./chords/chordDb.json");
      case "D":
        return this.getDiagrams(chord, "./chords/chordD.json");
      case "Eb":
        return this.getDiagrams(chord, "./chords/chordEb.json");
      case "E":
        return this.getDiagrams(chord, "./chords/chordE.json");
      case "F":
        return this.getDiagrams(chord, "./chords/chordF.json");
      case "Gb":
        return this.getDiagrams(chord, "./chords/chordGb.json");
      case "G":
        return this.getDiagrams(chord, "./chords/chordG.json");
      default:
        break;
    }

    return undefined;
  }

  private async getDiagrams(chord: Chord, path: string): Promise<ChordDiagram[] | undefined> {
    let allDiagrams: Diagram[] = await import(path).then((module) => module.chords);
    const bass = chord.bass ? chord.bass.toString() : "";
    const type = chord.type;
    const diagrams: ChordDiagram[] = allDiagrams
      .filter((d) => d.bass == bass && d.type == type)
      .map((d) => new ChordDiagram(chord, d.frets, d.fingers, d.variation));
    return diagrams;
  }
}
