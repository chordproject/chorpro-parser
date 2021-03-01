import { parse } from "path";
import { Key } from "../models/Key";
import { SectionType } from "../models/Section";
import Song from "../models/song";
import { ParserWarning } from "./parserWarning";
import { Tag, TagType } from "./tag";
import { TagConstants } from "./TagConstants";

export class ChordProParser {
  private _currentSectionType: SectionType;
  private _currentSectionName: string;
  private _song: Song;
  private _currentSectionLines: string[];
  private _currentLineIndex: number = 0;
  private _warnings: ParserWarning[];

  private readonly TAG_REGEX = /\{(?<value>.*)\}/;
  private readonly CHORD_REGEX = /\[(?<value>.*?)\]/;

  /**
   * ChordProParser's constructor
   */
  constructor() {
    this._song = new Song();
    this._currentSectionLines = [];
    this._currentSectionType = SectionType.None;
    this._currentSectionName = "";
    this._warnings = [];
  }

  /**
   * parse the sheet
   */
  parse(sheet: string): Song {
    const lines = sheet.split(/\r\n|\r|\n/);
    lines.forEach((line) => {
      this.parseLine(line.trim());
      this._currentLineIndex++;
    });

    return this._song;
  }

  private parseLine(line: string) {
    //empty
    if (!line) {
      if (this._currentSectionType === SectionType.None) {
        return;
      }
      this._currentSectionLines.push(line);
    }

    //tag
    if (this.TAG_REGEX.test(line)) {
      this.parseTag(line);
    }
  }

  private parseTag(line: string) {
    const match = line.match(this.TAG_REGEX);
    if (!match || !match.groups || !match.groups["value"]) {
      this.addWarning("Invalid tag");
      return;
    }

    const tag = Tag.parse(match.groups["value"].trim());
    if (!tag) {
      this.addWarning("Unknown or mal-formatted tag");
      return;
    }

    if (tag.type === TagType.Metadata) {
      this.parseMetadata(tag.longName, tag.value);
    }
  }

  private parseMetadata(name: string, value: string | null) {
    if (!value || !value.trim()) {
      this.addWarning("The metadata must have a value");
      return;
    }
    switch (name) {
      case TagConstants.ALBUM:
        this._song.album.push(value);
        break;
      case TagConstants.ARRANGER:
        this._song.arranger.push(value);
        break;
      case TagConstants.ARTIST:
        this._song.artist.push(value);
        break;
      case TagConstants.CAPO:
        this.parseCapoMetadata(value);
        break;
      case TagConstants.COMPOSER:
        this._song.composer.push(value);
        break;
      case TagConstants.COPYRIGHT:
        this._song.copyright = value;
        break;
      case TagConstants.DURATION:
        this.parseDurationMetadata(value);
        break;
      case TagConstants.KEY:
        this.parseKeyMetadata(value);
        break;
      case TagConstants.LYRICIST:
        this._song.lyricist.push(value);
        break;
      case TagConstants.TEMPO:
        this.parseTempoMetadata(value);
        break;
      case TagConstants.TIME:
        this.parseTimeMetadata(value);
        break;
      case TagConstants.TITLE:
        this._song.title = value;
        break;
      case TagConstants.SUBTITLE:
        this._song.subtitle = value;
        break;
      case TagConstants.YEAR:
        this.parseYearMetadata(value);
        break;
      default:
        this.addWarning("Unknown metadata tag");
        break;
    }
  }

  private parseCustomMetadata(tag: Tag) {}

  private parseComment(tag: Tag) {}

  private parseStartOfBlock() {}

  private parseEndOfBlock() {}

  private parseDefine() {}

  private parseCustom() {}

  private parseYearMetadata(value: string) {
    const year = parseInt(value, 10);
    if (isNaN(year) || year.toString().length != 4) {
      this.addWarning("The year metadata must be a 4 digits number");
      return;
    }
    this._song.year = year;
  }

  private parseCapoMetadata(value: string) {
    const capo = parseInt(value, 10);
    if (isNaN(capo)) {
      this.addWarning("The capo metadata must be a number");
      return;
    }
    this._song.capo = capo;
  }

  private parseDurationMetadata(value: string) {
    const regex = /^((?<time>[0-9]+)|(?<minutes>[0-5]?[0-9]):(?<seconds>[0-5][0-9]))$/;
    const match = value.match(regex);
    if (!match || !match.groups) {
      this.addWarning(
        "The duration metadata is invalid. Must be a number or a time (eg: 5:30)"
      );
      return;
    }

    const timeString = match.groups["time"];
    if (timeString) {
      const time = parseInt(value, 10);
      this._song.duration = time;
    }

    const minutes = match.groups["minutes"];
    const seconds = match.groups["seconds"];
    if (!minutes || !seconds) {
      this.addWarning("The duration metadata time format is invalid");
      return;
    }
    this._song.duration = parseInt(minutes, 10) * 60 + parseInt(seconds);
    return;
  }

  private parseTempoMetadata(value: string) {
    const tempo = parseInt(value, 10);
    if (isNaN(tempo)) {
      this.addWarning("The tempo metadata must be a number");
      return;
    }
    this._song.tempo = tempo;
  }

  private parseKeyMetadata(value: string) {
    const key = Key.parse(value);
    if (!key) {
      this.addWarning("The key metadata is not a valid key");
      return;
    }
    this._song.key = key;
  }

  private parseTimeMetadata(value: string) {
    const regex = /^(?<top>[0-9]{1,2})\/(?<bottom>[0-9]{1,2})$/;
    const match = value.match(regex);

    if (
      !match ||
      !match.groups ||
      !match.groups["top"] ||
      !match.groups["bottom"]
    ) {
      this.addWarning(
        "The time metadata is invalid. Must be number/number (eg: 6/8)"
      );
      return;
    }

    const top = parseInt(match.groups["top"]);
    const bottom = parseInt(match.groups["bottom"]);
    this._song.time = { topNumber: top, bottomNumber: bottom };
  }

  private addWarning(message: string) {
    const warning = new ParserWarning(message, this._currentLineIndex + 1);
    this._warnings.push(warning);
  }
}
