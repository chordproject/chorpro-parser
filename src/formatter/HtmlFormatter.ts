import { IBuilder } from "./builders";
import { Formatter } from "./Formatter";
import { FormatterSettings } from "./FormatterSettings";

export class HtmlFormatter extends Formatter {
    settings: FormatterSettings;

    constructor(builder: IBuilder, settings: FormatterSettings = new FormatterSettings()) {
        super(builder); // Usa el builder proporcionado
        this.settings = settings;
    }
}
