import parseJSX from "./parse-jsx";

describe("JSX parser", () => {
  test("should return empty string for empty string", () => {
    expect(parseJSX("")).toBe("");
  });
});
