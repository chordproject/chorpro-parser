import { MusicNote, MusicLetter } from "../models/MusicNote";
import { Song } from "../models";
import { LyricsLine } from "../models/lines";
import { SectionType } from "../models/sections";
import { MusicTheoryHelper } from "./MusicTheoryHelper";

export abstract class Transposer {
    public static transpose(song: Song, direction: "up" | "down"): Song {
        let newSong = song.clone();
        let songKey = newSong.key ? newSong.key : newSong.getPossibleKey();
        if (!songKey) {
            return song;
        }

        const currentKeyLetter = songKey.note.letter.toString();
        const steps = direction === "up" ? 1 : -1;

        // Calcular la nueva clave
        const newKeyLetter = MusicTheoryHelper.getNextInCircle(currentKeyLetter, steps);
        const newKey = new MusicNote(MusicLetter[newKeyLetter as keyof typeof MusicLetter], songKey.note.accidental);

        const letterDiff = MusicTheoryHelper.letterDiff(currentKeyLetter, newKeyLetter);
        const semiTones = MusicTheoryHelper.semiTonesBetween(currentKeyLetter, newKeyLetter);
        songKey.note = newKey;

        newSong.sections.forEach((section, sectionIndex) => {
            if (section.sectionType != SectionType.Lyrics) {
                return;
            }
            section.lines.forEach((line, lineIndex) => {
                if (line instanceof LyricsLine) {
                    line.pairs.forEach((pair, pairIndex) => {
                        if (pair.chord) {
                            const chordKeyLetter = pair.chord.key.note.letter.toString();
                            const transposedNote = MusicTheoryHelper.transposeKey(
                                chordKeyLetter,
                                letterDiff,
                                semiTones
                            );
                            const newChord = pair.chord;
                            newChord.key.note.letter = MusicLetter[transposedNote as keyof typeof MusicLetter];

                            if (pair.chord.bass) {
                                const bassKeyLetter = pair.chord.bass.letter.toString();
                                const transposedBassNote = MusicTheoryHelper.transposeKey(
                                    bassKeyLetter,
                                    letterDiff,
                                    semiTones
                                );
                                if (newChord.bass) {
                                    newChord.bass.letter = MusicLetter[transposedBassNote as keyof typeof MusicLetter];
                                }
                            }

                            (<LyricsLine>newSong.sections[sectionIndex].lines[lineIndex]).pairs[pairIndex].chord =
                                newChord;
                        }
                    });
                }
            });
        });

        return newSong;
    }
}
