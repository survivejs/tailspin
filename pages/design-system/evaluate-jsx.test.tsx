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

  test("should evaluate nested components", () => {
    const ShowChildren = ({}, children: string[]) => <div>{children}</div>;

    expect(
      evaluateJSX(
        "<ShowChildren><ShowChildren>test</ShowChildren></ShowChildren>",
        {
          ShowChildren,
        }
      )
    ).toBe("<div><div>test</div></div>");
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

  test("should evaluate children", () => {
    const ShowChildren = ({}, children: string[]) => <div>{children}</div>;

    expect(
      evaluateJSX(`<ShowChildren>{1 + 1}</ShowChildren>`, {
        ShowChildren,
      })
    ).toBe("<div>2</div>");
  });

  test("should evaluate expression props", () => {
    const PassProps = ({ test }: { test: string }, children: string[]) => (
      <div>{test}</div>
    );

    expect(
      evaluateJSX(`<PassProps test={1+1} />`, {
        PassProps,
      })
    ).toBe("<div>2</div>");
  });

  test("should evaluate components as props", () => {
    const Hello = () => <div>hello</div>;
    const PassProps = ({ test }: { test: string }, children: string[]) => (
      <div>{test}</div>
    );

    expect(
      evaluateJSX(`<PassProps test={<Hello />} />`, {
        Hello,
        PassProps,
      })
    ).toBe("<div><div>hello</div></div>");
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
