import { Key, MusicNote, Song } from "../models";
import { LyricsLine } from "../models/lines";
import { SectionType } from "../models/sections";
import { MusicNoteHelper } from "../utilities/MusicNoteHelper";

export class Transformer {
    public transpose(song: Song, newKey: MusicNote): Song {
        let newSong = song.clone();
        if(!newSong.key){
            return song;
        }
        
        const letterDiff = MusicNoteHelper.letterDiff(newSong.key.note.letter, newKey.letter);
        const semiTones = MusicNoteHelper.semiTonesBetween(newSong.key.note, newKey);
        newSong.key.note = newKey;
        newSong.sections.forEach((section, sectionIndex) => {
            if (section.sectionType != SectionType.Lyrics) {
                return;
            }
            section.lines.forEach((line, lineIndex) => {
                if (line instanceof LyricsLine) {
                    line.pairs.forEach((pair, pairIndex) => {
                        if (pair.chord) {
                            const note = MusicNoteHelper.transpose(pair.chord.key.note, letterDiff, semiTones);
                            const newChord = pair.chord;
                            newChord.key.note = note;
                            (<LyricsLine>newSong.sections[sectionIndex].lines[lineIndex]).pairs[
                                pairIndex
                            ].chord = newChord;
                        }
                    });
                }
            });
        });

        return newSong;
    }
}
