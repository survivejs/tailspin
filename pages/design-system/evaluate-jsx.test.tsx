import * as elements from "typed-html";
import evaluateJSX from "./evaluate-jsx";

describe("JSX evaluator", () => {
  test("should return empty string for empty string", () => {
    expect(evaluateJSX("", {})).toBe("");
  });

  test("should evaluate a component", () => {
    const ShowChildren = ({}, children: string[]) => <div>{children}</div>;

    expect(
      evaluateJSX("<ShowChildren>test</ShowChildren>", {
        ShowChildren,
      })
    ).toBe("<div>test</div>");
  });

  test("should evaluate component props", () => {
    const PassProps = ({ test }: { test: string }, children: string[]) => (
      <div>{test}</div>
    );

    expect(
      evaluateJSX(`<PassProps test="test" />`, {
        PassProps,
      })
    ).toBe("<div>test</div>");
  });

  test("should evaluate component children and props", () => {
    const PassChildrenAndProps = (
      { test }: { test: string },
      children: string[]
    ) => (
      <div>
        {test}
        {children}
      </div>
    );

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
