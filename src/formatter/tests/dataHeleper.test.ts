import { DataHelper } from "../../formatter/DataHelper";

test.each`
    number | expected
    ${120} | ${"02:00"}
    ${90} | ${"01:30"}
    ${135} | ${"02:15"}
    ${3000} | ${"50:00"}
    ${7200} | ${"120:00"}
`(
    "format number as time",
    ({ number, expected }) => {
        const result = DataHelper.toMinutesSeconds(number);
        expect(result).toEqual(expected);
    }
);

test("format text with proper case", () =>  {
    const text = "test test";
    const result = DataHelper.toProperCase(text);
    const expected = "Test test";

    expect(result).toEqual(expected);
})
