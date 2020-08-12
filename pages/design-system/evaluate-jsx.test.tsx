import * as elements from "typed-html";
import evaluateJSX from "./evaluate-jsx";

const ShowChildren = ({}, children: string[]) => <div>{children}</div>;
const PassProps = ({ test }: { test: string }, children: string[]) => (
  <div>{test}</div>
);
const PassChildrenAndProps = (
  { test }: { test: string },
  children: string[]
) => (
  <div>
    {test}
    {children}
  </div>
);

describe("JSX evaluator", () => {
  test("should return empty string for empty string", () => {
    expect(evaluateJSX("", {})).toBe("");
  });

  test("should evaluate a component", () => {
    expect(
      evaluateJSX("<ShowChildren>test</ShowChildren>", {
        ShowChildren,
      })
    ).toBe("<div>test</div>");
  });

  test("should evaluate component props", () => {
    expect(
      evaluateJSX(`<PassProps test="test" />`, {
        PassProps,
      })
    ).toBe("<div>test</div>");
  });

  test("should evaluate component children and props", () => {
    expect(
      evaluateJSX(
        `<PassChildrenAndProps test="prop">children</PassChildrenAndProps>`,
        {
          PassChildrenAndProps,
        }
      )
    ).toBe("<div>prop\nchildren</div>");
  });
});
