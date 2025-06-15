import { ChordProBuilder } from "./builders";
import { Formatter } from "./Formatter";
import { FormatterSettings } from "./FormatterSettings";

export class ChordProFormatter extends Formatter {
    settings: FormatterSettings;

    constructor(settings: FormatterSettings = new FormatterSettings()) {
        super(new ChordProBuilder(settings));
        this.settings = settings;
    }
}
