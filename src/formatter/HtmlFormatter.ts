import { HtmlBuilder } from "./builders";
import { Formatter } from "./Formatter";
import { FormatterSettings } from "./FormatterSettings";

export class HtmlFormatter extends Formatter {
    settings: FormatterSettings;

    constructor(settings: FormatterSettings = new FormatterSettings()) {
        super(new HtmlBuilder(settings));
        this.settings = settings;
    }
}
