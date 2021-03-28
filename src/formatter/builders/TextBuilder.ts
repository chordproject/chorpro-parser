import { CommentLine, CustomLine, LyricsLine, TabLine } from "../../models/lines";
import { Tabs, Section, Lyrics } from "../../models/sections";
import { DataHelper } from "../DataHelper";
import { BuilderSettingsBase } from "./BuilderSettingsBase";
import { IBuilder } from "./IBuilder";

export class TextBuilder implements IBuilder {
    private _settings: BuilderSettingsBase;

    /**
     *
     */
    constructor(settings: BuilderSettingsBase = new BuilderSettingsBase()) {
        this._settings = settings;
    }

    private writeMetadata(label: string, metadata: string | null): string {
        if (metadata) {
            return `${DataHelper.toProperCase(label)}: ${metadata}`;
        }
        return DataHelper.toProperCase(label);
    }

    private buildMetadataArray(values: string[], label: string, pluralLabel: string): string {
        const buildLabel = values.length > 1 ? pluralLabel : label;
        const metadatas = values.join(", ");
        return `${DataHelper.toProperCase(buildLabel)}: ${metadatas}`;
    }

    titleMetadata(value: string): string[] {
        return [value];
    }

    subtitleMetadata(value: string): string[] {
        return [value];
    }

    artistsMetadata(values: string[]): string[] {
        return [values.join(", ")];
    }

    composersMetadata(values: string[]): string[] {
        return [this.buildMetadataArray(values, "Composer", "Composers")];
    }

    lyricistsMetadata(values: string[]): string[] {
        return [this.buildMetadataArray(values, "Lyricist", "Lyricists")];
    }

    arrangersMetadata(values: string[]): string[] {
        return [this.buildMetadataArray(values, "Arranger", "Arrangers")];
    }

    yearMetadata(value: number): string[] {
        return [this.writeMetadata("Year", value.toString())];
    }

    copyrightMetadata(value: string): string[] {
        return [this.writeMetadata("Copyright", value)];
    }

    timeMetadata(value: string): string[] {
        return [this.writeMetadata("Time", value)];
    }

    tempoMetadata(value: number): string[] {
        return [this.writeMetadata("Tempo", value.toString())];
    }

    durationMetadata(value: number): string[] {
        return [this.writeMetadata("Duration", DataHelper.toMinutesSeconds(value))];
    }

    capoMetadata(value: number): string[] {
        return [this.writeMetadata("Capo", value.toString())];
    }

    keyMetadata(value: string): string[] {
        return [this.writeMetadata("Key", value)];
    }

    customMetadatas(values: [string, string | null][]): string[] {
        let lines: string[] = [];
        values.forEach((value) => {
            lines.push(this.writeMetadata(value[0], value[1]));
        });
        return lines;
    }

    emptyLine(): string[] {
        return [""];
    }

    lyricsLine(line: LyricsLine): string[] {
        let firstLine = "";
        let secondLine = "";
        let lines: string[] = [];
        line.pairs.forEach((pair) => {
            let spacesCount = 1;
            if (this._settings.showChords) {
                if (pair.chord) {
                    let chord = this._settings.useSimpleChord ? pair.chord.toSimpleString() : pair.chord.toString();
                    firstLine += chord;
                    spacesCount = pair.lyrics.length - chord.length;
                } else if (pair.text) {
                    firstLine += pair.text;
                    spacesCount = pair.lyrics.length - pair.text.length;
                } else {
                    spacesCount = pair.lyrics.length;
                }
            }

            if (spacesCount > 0) {
                firstLine += " ".repeat(spacesCount);
                secondLine += pair.lyrics;
            } else {
                firstLine += " ";
                secondLine += pair.lyrics + " ".repeat(Math.abs(spacesCount) + 1);
            }
        });
        firstLine = firstLine.trimEnd();
        secondLine = secondLine.trimEnd();
        if (firstLine) {
            lines.push(firstLine);
        }
        if (secondLine) {
            lines.push(secondLine);
        }
        return lines;
    }

    commentLine(line: CommentLine): string[] {
        return ["#" + line.comment];
    }

    tabLine(line: TabLine): string[] {
        return [line.value];
    }

    customLine(line: CustomLine): string[] {
        return [];
    }

    sectionStart(section: Section): string[] {
        if (section instanceof Lyrics || section instanceof Tabs) {
            return section.value ? [section.value] : [];
        }
        return [];
    }

    sectionEnd(section: Section): string[] {
        return [];
    }

    metadataStart(): string[] {
        return ["*".repeat(10)];
    }

    metadataEnd(): string[] {
        return ["*".repeat(10)];
    }

    contentStart(): string[] {
        return [];
    }

    contentEnd(): string[] {
        return [];
    }
}
