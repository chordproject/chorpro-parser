export class ChordProParser {

    private _currentRegionName:string = "";
    private readonly TAG_REGEX = /\{(?<value>.*)\}/
    private readonly CHORD_REGEX = /\[(?<value>.*?)\]/

    /**
     * parse
     */
    parse(sheet:string) {
        const lines = sheet.split(/\r\n|\r|\n/);
        lines.forEach(line => {
            this.parseLine(line);
        });
    }

    private parseLine(line:string){
        const tagMatch = line.match(this.TAG_REGEX);
        if(tagMatch && tagMatch.groups && tagMatch.groups["value"]){
            this.parseTag(tagMatch.groups["value"])
        }
    }

    private parseTag(tag:string){

    }

    
}