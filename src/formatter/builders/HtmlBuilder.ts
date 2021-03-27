import { LyricsLine, CommentLine, TabLine, CustomLine } from "../../models/lines";
import { Lyrics, Section, Tabs, LyricsType } from "../../models/sections";
import { DataHelper } from "../DataHelper";
import { IBuilder } from "./IBuilder";

export class HtmlBuilder implements IBuilder {
    protected buildHtmlElement(tag: string, value: string, classNames: string[] = []): string {
        return `<${tag} class="${classNames.join(" ")}">${value}</${tag}>`;
    }

    titleMetadata(value: string): string[] {
        return [this.buildHtmlElement("h1", value, ["metadata", "title-metadata"])];
    }

    subtitleMetadata(value: string): string[] {
        return [this.buildHtmlElement("h2", value, ["metadata", "subtitle-metadata"])];
    }

    artistsMetadata(values: string[]): string[] {
        return [this.buildHtmlElement("h3", values.join(", "), ["metadata", "artist-metadata"])];
    }

    composersMetadata(values: string[]): string[] {
        const label = values.length > 1 ? "Composers" : "Composer";
        const classNames = ["metadata", "composer-metadata"];
        return [this.buildHtmlElement("div", label + ": " + values.join(", "), classNames)];
    }

    lyricistsMetadata(values: string[]): string[] {
        const label = values.length > 1 ? "Lyricists" : "Lyricist";
        const classNames = ["metadata", "lyricist-metadata"];
        return [this.buildHtmlElement("div", label + ": " + values.join(", "), classNames)];
    }

    arrangersMetadata(values: string[]): string[] {
        const label = values.length > 1 ? "Arrangers" : "Arranger";
        const classNames = ["metadata", "arranger-metadata"];
        return [this.buildHtmlElement("div", label + ": " + values.join(", "), classNames)];
    }

    yearMetadata(value: number): string[] {
        const label = "Year";
        const classNames = ["metadata", "year-metadata"];
        return [this.buildHtmlElement("div", label + ": " + value, classNames)];
    }

    copyrightMetadata(value: string): string[] {
        const label = "Copyright";
        const classNames = ["metadata", "copyright-metadata"];
        return [this.buildHtmlElement("div", label + ": " + value, classNames)];
    }

    timeMetadata(value: string): string[] {
        const label = "Time";
        const classNames = ["metadata", "time-metadata"];
        return [this.buildHtmlElement("div", label + ": " + value, classNames)];
    }

    tempoMetadata(value: number): string[] {
        const label = "Tempo";
        const classNames = ["metadata", "tempo-metadata"];
        return [this.buildHtmlElement("div", label + ": " + value, classNames)];
    }
    durationMetadata(value: number): string[] {
        const label = "Duration";
        const classNames = ["metadata", "duration-metadata"];
        return [this.buildHtmlElement("div", label + ": " + DataHelper.toMinutesSeconds(value), classNames)];
    }
    capoMetadata(value: number): string[] {
        const label = "Capo";
        const classNames = ["metadata", "capo-metadata"];
        return [this.buildHtmlElement("div", label + ": " + value, classNames)];
    }
    keyMetadata(value: string): string[] {
        const label = "Key";
        const classNames = ["metadata", "key-metadata"];
        return [this.buildHtmlElement("div", label + ": " + value, classNames)];
    }
    customMetadatas(values: [string, string | null][]): string[] {
        let lines: string[] = [];
        const classNames = ["metadata", "custom-metadata"];
        values.forEach((value) => {
            lines.push(this.buildHtmlElement("div", DataHelper.toProperCase(value[0]) + ": " + value[1], classNames));
        });
        return lines;
    }

    emptyLine(): string[] {
        const classNames = ["row", "empty-line"];
        return [this.buildHtmlElement("div", "", classNames)];
    }

    lyricsLine(line: LyricsLine): string[] {
        
        let pairs:string[] = [];
        line.pairs.forEach((pair) => {
            let chordAndLyrics = "";
            if (pair.chord) {
                chordAndLyrics += this.buildHtmlElement("div", pair.chord.toString(), ["chord"]);
            } else if (pair.text) {
                chordAndLyrics += this.buildHtmlElement("div", pair.text, ["annotation"]);
            }
            if(pair.lyrics.trim()){
                chordAndLyrics += this.buildHtmlElement("div", pair.lyrics, ["lyrics"])
            }
            pairs.push(this.buildHtmlElement("div", chordAndLyrics, ["column"]));
        });
        const columnsInRow = this.buildHtmlElement("div", pairs.join(""), ["row", "lyrics-line"]);
        return [columnsInRow];
    }

    commentLine(line: CommentLine): string[] {
        const classNames = ["row", "comment-line"];
        return [this.buildHtmlElement("div", line.comment, classNames)];
    }

    tabLine(line: TabLine): string[] {
        const classNames = ["row", "tab-line"];
        return [this.buildHtmlElement("div", line.value, classNames)];
    }
    customLine(line: CustomLine): string[] {
        const classNames = ["metadata", "custom-metadata", line.name];
        return [this.buildHtmlElement("div", line.value ? line.value : "", classNames)];
    }

    sectionStart(section: Section): string[] {
        let rows: string[] = [];
        if (section instanceof Lyrics || section instanceof Tabs) {
            let type = "tab";
            if (section instanceof Lyrics) {
                switch (section.type) {
                    case LyricsType.Chorus:
                        type = "chorus";
                        break;
                    case LyricsType.Verse:
                        type = "verse";
                        break;
                    case LyricsType.Bridge:
                        type = "bridge";
                        break;
                    case LyricsType.Custom:
                        type = "custom";
                        break;
                    default:
                        break;
                }
            }
            rows.push(`<div class="section ${type}-section">`);
            if (section.value) {
                const classNames = ["section-title"];
                rows.push(this.buildHtmlElement("div", section.value, classNames));
            }
        }
        return rows;
    }

    sectionEnd(section: Section): string[] {
        return ["</div>"];
    }
}
