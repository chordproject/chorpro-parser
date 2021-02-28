import { Dot } from "../models/dot";

test("get finger should return dot finger", () => {
    const expectedFinger = 1;
    const dot = new Dot(1,1,1);
    const finger = dot.finger;
    expect(finger).toEqual(expectedFinger);
  });

  test("get string should return dot string", () => {
    const expectedString = 1;
    const dot = new Dot(1,1);
    const string = dot.string;
    expect(string).toEqual(expectedString);
  });

  test("get fret should return dot fret", () => {
    const expectedFret = 1;
    const dot = new Dot(1,1);
    const fret = dot.fret;
    expect(fret).toEqual(expectedFret);
  });