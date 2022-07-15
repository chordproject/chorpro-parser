import { TextBuilder } from "./builders";
import { Formatter } from "./Formatter";
import { FormatterSettings } from "./FormatterSettings";

export class TextFormatter extends Formatter {
    settings: FormatterSettings;
    constructor(settings:FormatterSettings = new FormatterSettings()) {
        let builder = new TextBuilder(settings)
        super(builder);
        this.settings = settings;
    }
}