import { Chord, Key, MusicNote, Song } from "../models";
import { LyricsLine } from "../models/lines";
import { LyricsBase, SectionType } from "../models/sections";

export class Transformer {
    public transpose(song: Song, newKey: MusicNote, steps: number): Song {
        song.sections.forEach((section, sectionIndex) => {
            if (section.sectionType != SectionType.Lyrics) {
                return;
            }
            section.lines.forEach((line, lineIndex) => {
                if (line instanceof LyricsLine) {
                    line.pairs.forEach((pair, pairIndex) => {
                        if (pair.chord) {
                            (<LyricsLine>song.sections[sectionIndex].lines[lineIndex]).pairs[
                                pairIndex
                            ].chord = this.transposeChord(pair.chord, newKey, steps);
                        }
                    });
                }
            });
        });

        return song;
    }

    private transposeChord(chord: Chord, newKey: MusicNote, steps: number): Chord {
        
    }
}
