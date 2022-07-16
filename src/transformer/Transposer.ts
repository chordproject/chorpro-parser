import { Key, MusicNote, Song } from "../models";
import { LyricsLine } from "../models/lines";
import { SectionType } from "../models/sections";
import { MusicNoteHelper } from "../utilities/MusicNoteHelper";

export abstract class Transposer {
    public static transpose(song: Song, newKey: MusicNote): Song {
        let newSong = song.clone();
        let songKey = newSong.key ? newSong.key : newSong.getPossibleKey();
        if (!songKey) {
            return song;
        }

        const letterDiff = MusicNoteHelper.letterDiff(songKey.note.letter, newKey.letter);
        const semiTones = MusicNoteHelper.semiTonesBetween(songKey.note, newKey);
        songKey.note = newKey;
        newSong.sections.forEach((section, sectionIndex) => {
            if (section.sectionType != SectionType.Lyrics) {
                return;
            }
            section.lines.forEach((line, lineIndex) => {
                if (line instanceof LyricsLine) {
                    line.pairs.forEach((pair, pairIndex) => {
                        if (pair.chord) {
                            console.log(pair.chord.toString());
                            const note = MusicNoteHelper.transpose(pair.chord.key.note, letterDiff, semiTones);
                            const newChord = pair.chord;
                            newChord.key.note = note;
                            if(pair.chord.bass){
                                const bassNote = MusicNoteHelper.transpose(pair.chord.bass, letterDiff, semiTones);
                                newChord.bass = bassNote;
                            }

                            (<LyricsLine>newSong.sections[sectionIndex].lines[lineIndex]).pairs[pairIndex].chord = newChord;
                            console.log("New chord: " + newChord.toString());
                        }
                    });
                }
            });
        });

        return newSong;
    }
}
