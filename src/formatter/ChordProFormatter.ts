import { ChordProBuilder, TextBuilder } from "./builders";
import { Formatter } from "./Formatter";
import { FormatterSettings } from "./FormatterSettings";

export class ChordProFormatter extends Formatter {
    settings: FormatterSettings;
    constructor(settings:FormatterSettings = new FormatterSettings()) {
        let builder = new ChordProBuilder()
        super(builder);
        this.settings = settings;
    }
}