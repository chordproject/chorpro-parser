declare module "chord*.json" {
    export interface Diagram {
        type: string;
        bass: string;
        frets: number[];
        fingers: number[];
        variation: number;
    }
}
