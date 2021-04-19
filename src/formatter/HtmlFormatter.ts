import { HtmlBuilder } from "./builders";
import { Formatter } from "./Formatter";
import { FormatterSettings } from "./FormatterSettings";

export class HtmlFormatter extends Formatter {
    settings: FormatterSettings;
    constructor(settings:FormatterSettings = new FormatterSettings()) {
        let builder = new HtmlBuilder()
        super(builder);
        this.settings = settings;
    }
}