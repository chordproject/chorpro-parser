import { LyricsSectionBase, LyricsType } from "./LyricsSectionBase";
import { Section } from "./Section";

export class SimpleLyricsSection extends LyricsSectionBase {
    public clone(): Section {
        let section = new SimpleLyricsSection();
        this._lines.forEach((line) => {
            section.addLine(line.clone());
        });
        return section;
    }

    constructor() {
        super(LyricsType.None);
    }
}
