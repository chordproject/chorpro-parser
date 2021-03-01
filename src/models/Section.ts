export enum SectionType {
    Lyrics = "lyrics",
    Tabs = "tabs",
    //Grid = "grid",
    None = "none"
}

export abstract class Section {
  /**
   * Getter sectionType
   * @return The section's type
   */
    protected get sectionType(): SectionType {
        return this._sectionType;
    }

    private _sectionType: SectionType = SectionType.None;

    /**
     * Abstract class Line's constructor
     */
    constructor(sectionType:SectionType) {
        this._sectionType = sectionType;
    }
}