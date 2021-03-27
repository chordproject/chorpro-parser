import { LyricsLine, CommentLine, TabLine, CustomLine } from "../../models/lines";
import { Lyrics, Section, Tabs } from "../../models/sections";
import { DataHelper } from "../DataHelper";
import { IBuilder } from "./IBuilder";

export class ChordProBuilder implements IBuilder {
  private buildMetadata(name: string, value: string | null): string {
    if (value) {
      return `{${name}: ${value}}`;
    }
    return `{${name}}`;
  }

  private buildMetadatas(name: string, values: string[]): string[] {
    let metadatas: string[] = [];
    values.forEach((value) => {
      metadatas.push(this.buildMetadata(name, value));
    });
    return metadatas;
  }

  titleMetadata(value: string): string[] {
    return [this.buildMetadata("title", value)];
  }

  subtitleMetadata(value: string): string[] {
    return [this.buildMetadata("subtitle", value)];
  }

  artistsMetadata(values: string[]): string[] {
    return this.buildMetadatas("artist", values);
  }

  composersMetadata(values: string[]): string[] {
    return this.buildMetadatas("composer", values);
  }

  lyricistsMetadata(values: string[]): string[] {
    return this.buildMetadatas("lyricist", values);
  }

  arrangersMetadata(values: string[]): string[] {
    return this.buildMetadatas("arranger", values);
  }

  yearMetadata(value: number): string[] {
    return [this.buildMetadata("year", value.toString())];
  }

  copyrightMetadata(value: string): string[] {
    return [this.buildMetadata("copyright", value)];
  }

  timeMetadata(value: string): string[] {
    return [this.buildMetadata("time", value)];
  }

  tempoMetadata(value: number): string[] {
    return [this.buildMetadata("tempo", value.toString())];
  }

  durationMetadata(value: number): string[] {
    return [this.buildMetadata("duration", DataHelper.toMinutesSeconds(value))];
  }

  capoMetadata(value: number): string[] {
    return [this.buildMetadata("capo", value.toString())];
  }

  keyMetadata(value: string): string[] {
    return [this.buildMetadata("key", value)];
  }

  customMetadatas(values: [string, string | null][]): string[] {
    let lines: string[] = [];
    values.forEach((value) => {
      lines.push(this.buildMetadata(value[0].toLowerCase(), value[1]));
    });
    return lines;
  }

  emptyLine(): string[] {
    return [""];
  }

  lyricsLine(line: LyricsLine): string[] {
    let result = "";
    line.pairs.forEach((pair) => {
      if (pair.chord) {
        result += `[${pair.chord.toString()}]${pair.lyrics}`;
      } else if (pair.text) {
        result += `[*${pair.text}]${pair.lyrics}`;
      } else {
        result += pair.lyrics;
      }
    });
    return [result.trim()];
  }

  commentLine(line: CommentLine): string[] {
    return [this.buildMetadata("comment", line.comment)];
  }

  tabLine(line: TabLine): string[] {
    return [line.value];
  }

  customLine(line: CustomLine): string[] {
    return [this.buildMetadata(line.name, line.value)];
  }

  sectionStart(section: Section): string[] {
    if (section instanceof Lyrics || section instanceof Tabs) {
      let sectionName = section instanceof Tabs ? "tab" : section.name;
      return [this.buildMetadata("start_of_" + sectionName, section.value)];
    }
    return [];
  }

  sectionEnd(section: Section): string[] {
    if (section instanceof Lyrics || section instanceof Tabs) {
      let sectionName = section instanceof Tabs ? "tab" : section.name;
      return [this.buildMetadata("end_of_" + sectionName, null)];
    }
    return [];
  }
}
