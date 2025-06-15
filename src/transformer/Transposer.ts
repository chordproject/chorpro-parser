import { MusicNote, MusicLetter, MusicAccidental } from "../models/MusicNote";
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

        const currentKeyNote = songKey.note;
        const currentKeyLetterStr = MusicLetter[currentKeyNote.letter];
        const currentKeyAccidentalStr = MusicAccidental[currentKeyNote.accidental];
        const currentKeyNoteStr =
            currentKeyLetterStr + (currentKeyAccidentalStr === "none" ? "" : currentKeyAccidentalStr);

        // Determine amount to transpose
        const semitones = direction === "up" ? 1 : -1;

        // Calculate the new key
        const currentPitchClass = MusicTheoryHelper.pitchClassMap[currentKeyNoteStr];
        if (currentPitchClass === undefined) {
            return song; // If the key is not recognized, return the original song
        }

        const newPitchClass = (currentPitchClass + semitones + 12) % 12;
        // Use getPreferredEnharmonic instead of directly using reversePitchClassMap
        const newKeyNoteStr = MusicTheoryHelper.getPreferredEnharmonic(
            MusicTheoryHelper.reversePitchClassMap[newPitchClass],
            currentKeyNoteStr // Pass the original key as context
        );

        // Parse the new key note
        const newKeyNote = MusicNote.parse(newKeyNoteStr);
        if (!newKeyNote) {
            return song; // If the new key can't be parsed, return the original song
        }

        // Set the new key while preserving the mode
        songKey.note = newKeyNote;

        // Transpose all chords in the song
        newSong.sections.forEach((section) => {
            if (section.sectionType != SectionType.Lyrics) {
                return;
            }
            section.lines.forEach((line) => {
                if (line instanceof LyricsLine) {
                    line.pairs.forEach((pair) => {
                        if (pair.chord) {
                            // Transpose chord key
                            const chordKeyNote = pair.chord.key.note;
                            const chordLetterStr = MusicLetter[chordKeyNote.letter];
                            const chordAccidentalStr = MusicAccidental[chordKeyNote.accidental];
                            const chordNoteStr =
                                chordLetterStr + (chordAccidentalStr === "none" ? "" : chordAccidentalStr);

                            const chordPitchClass = MusicTheoryHelper.pitchClassMap[chordNoteStr];
                            if (chordPitchClass !== undefined) {
                                const newChordPitchClass = (chordPitchClass + semitones + 12) % 12;
                                const newChordNoteStr = MusicTheoryHelper.getPreferredEnharmonic(
                                    MusicTheoryHelper.reversePitchClassMap[newChordPitchClass],
                                    newKeyNoteStr // Use the new key as context
                                );

                                const newChordNote = MusicNote.parse(newChordNoteStr);
                                if (newChordNote) {
                                    pair.chord.key.note = newChordNote;
                                }
                            }

                            // Transpose bass note if present
                            if (pair.chord.bass) {
                                const bassLetterStr = MusicLetter[pair.chord.bass.letter];
                                const bassAccidentalStr = MusicAccidental[pair.chord.bass.accidental];
                                const bassNoteStr =
                                    bassLetterStr + (bassAccidentalStr === "none" ? "" : bassAccidentalStr);

                                const bassPitchClass = MusicTheoryHelper.pitchClassMap[bassNoteStr];
                                if (bassPitchClass !== undefined) {
                                    const newBassPitchClass = (bassPitchClass + semitones + 12) % 12;
                                    const newBassNoteStr = MusicTheoryHelper.getPreferredEnharmonic(
                                        MusicTheoryHelper.reversePitchClassMap[newBassPitchClass],
                                        newKeyNoteStr // Use the new key as context
                                    );

                                    const newBassNote = MusicNote.parse(newBassNoteStr);
                                    if (newBassNote) {
                                        pair.chord.bass = newBassNote;
                                    }
                                }
                            }
                        }
                    });
                }
            });
        });

        return newSong;
    }
}
