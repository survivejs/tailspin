import * as elements from "typed-html";
import evaluateJSX from "./evaluate-jsx";

const Box = ({}, children: string[]) => <div>{children}</div>;

describe("JSX evaluator", () => {
  test("should return empty string for empty string", () => {
    expect(evaluateJSX("", {})).toBe("");
  });

  test("should evaluate a component", () => {
    expect(
      evaluateJSX("<Box>test</Box>", {
        Box,
      })
    ).toBe("<div>test</div>");
  });
});
