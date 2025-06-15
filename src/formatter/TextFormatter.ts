import { TextBuilder } from "./builders";
import { Formatter } from "./Formatter";
import { FormatterSettings } from "./FormatterSettings";

export class TextFormatter extends Formatter {
    settings: FormatterSettings;

    constructor(settings: FormatterSettings = new FormatterSettings()) {
        super(new TextBuilder(settings));
        this.settings = settings;
    }
}
