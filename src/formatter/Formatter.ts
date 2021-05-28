import { Song } from "../models";
import { CommentLine, EmptyLine, LyricsLine, TabLine } from "../models/lines";
import { SectionType } from "../models/sections";
import { IBuilder } from "./builders";
import { FormatterSettingsBase } from "./FormatterSettingsBase";
import { IFormatter } from "./IFormatter";

export abstract class Formatter implements IFormatter {
    private _builder: IBuilder;
    private _lines: string[] = [];
    abstract settings: FormatterSettingsBase;

    constructor(builder: IBuilder) {
        this._builder = builder;
    }

    format(song: Song): string[] {
        if (this.settings.showMetadata) {
            this.formatMetadata(song);
        }
        this._lines.push(...this._builder.contentStart());
        song.sections.forEach((section) => {
            if (!this.settings.showTabs && section.sectionType == SectionType.Tabs) {
                return;
            }

            this._lines.push(...this._builder.sectionStart(section));
            section.lines.forEach((line) => { // todo: remove unecessary empty lines at the top and the end
                if (line instanceof EmptyLine) {
                    this._lines.push(...this._builder.emptyLine());
                } else if (line instanceof LyricsLine) {
                    this._lines.push(...this._builder.lyricsLine(line));
                } else if (line instanceof TabLine) {
                    this._lines.push(...this._builder.tabLine(line));
                } else if (line instanceof CommentLine) {
                    this._lines.push(...this._builder.commentLine(line));
                }
            });

            this._lines.push(...this._builder.sectionEnd(section));
        });
        this._lines.push(...this._builder.contentEnd());
        return this._lines;
    }

    private formatMetadata(song: Song) {
        this._lines.push(...this._builder.metadataStart());
        if (song.title?.trim()) {
            this._lines.push(...this._builder.titleMetadata(song.title));
        }
        if (song.subtitle?.trim()) {
            this._lines.push(...this._builder.subtitleMetadata(song.subtitle));
        }
        if (song.artists.length > 0) {
            this._lines.push(...this._builder.artistsMetadata(song.artists));
        }
        if (song.composers.length > 0) {
            this._lines.push(...this._builder.composersMetadata(song.composers));
        }
        if (song.lyricists.length > 0) {
            this._lines.push(...this._builder.lyricistsMetadata(song.lyricists));
        }
        if (song.arrangers.length > 0) {
            this._lines.push(...this._builder.arrangersMetadata(song.arrangers));
        }
        if (song.copyright?.trim()) {
            this._lines.push(...this._builder.copyrightMetadata(song.copyright));
        }
        if (song.time) {
            this._lines.push(...this._builder.timeMetadata(`${song.time.topNumber}/${song.time.bottomNumber}`));
        }
        if (song.tempo && song.tempo > 0) {
            this._lines.push(...this._builder.tempoMetadata(song.tempo));
        }
        if (song.year) {
            this._lines.push(...this._builder.yearMetadata(song.year));
        }
        if (song.duration && song.duration > 0) {
            this._lines.push(...this._builder.durationMetadata(song.duration));
        }
        if (song.key) {
            this._lines.push(...this._builder.keyMetadata(song.key.toString()));
        }
        if (song.capo && song.capo > 0) {
            this._lines.push(...this._builder.capoMetadata(song.capo));
        }
        if (song.customMetadatas.length > 0) {
            this._lines.push(...this._builder.customMetadatas(song.customMetadatas));
        }
        this._lines.push(...this._builder.metadataEnd());
    }
}
