import { ChordDiagramCollection } from "../../ChordDiagramCollection";
import { Chord } from "../Chord";

test("get chord diagram for chord A", () => {
  const definitions = new ChordDiagramCollection();
  const chord = Chord.parse("A");
  return definitions.get(chord!).then((diagrams) => {
    expect(diagrams).toBeDefined();
    expect(diagrams?.length).toEqual(12);
    const firstDiagram = diagrams![0];
    expect(firstDiagram.chord.toString()).toEqual(chord!.toString());
    expect(firstDiagram.variation).toEqual(1);
    expect(firstDiagram.frets).toEqual([-1, 0, 2, 2, 2, 0]);
    expect(firstDiagram.fingers).toEqual([0, 0, 1, 2, 3, 0]);
  });
});

test("get chord diagram for chord B#", () => {
  const definitions = new ChordDiagramCollection();
  const chord = Chord.parse("B#");
  return definitions.get(chord!).then((diagrams) => {
    expect(diagrams).toBeDefined();
    expect(diagrams?.length).toEqual(12);
    const firstDiagram = diagrams![0];
    expect(firstDiagram.chord.toString()).toEqual(chord!.toString());
    expect(firstDiagram.variation).toEqual(1);
    expect(firstDiagram.frets).toEqual([-1, 3, 2, 0, 1, 0]);
    expect(firstDiagram.fingers).toEqual([0, 3, 2, 0, 1, 0]);
  });
});

test("get chord diagram for chord Gb", () => {
  const definitions = new ChordDiagramCollection();
  const chord = Chord.parse("Gb");
  return definitions.get(chord!).then((diagrams) => {
    expect(diagrams).toBeDefined();
    expect(diagrams?.length).toEqual(12);
    const lastDiagram = diagrams![11];
    expect(lastDiagram.chord.toString()).toEqual(chord!.toString());
    expect(lastDiagram.variation).toEqual(12);
    expect(lastDiagram.frets).toEqual([14, 13, 11, 11, 11, 14]);
    expect(lastDiagram.fingers).toEqual([3, 2, 1, 1, 1, 4]);
  });
});
