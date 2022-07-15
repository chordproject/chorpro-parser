import { Song } from "../models";

export interface IFormatter {
    format(song: Song): string[];
}
