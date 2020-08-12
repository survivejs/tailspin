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

  test("should evaluate components from components", () => {
    const Show = ({}, children: string[]) => <div>parent: {children}</div>;
    const Children = ({}, children: string[]) => <div>{children}</div>;
    Show.Children = Children;

    expect(
      evaluateJSX("<Show.Children>test</Show.Children>", {
        Show,
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

  test("should evaluate arrays as component props", () => {
    const PassProps = ({ pages }: { pages: string[] }, children: string[]) => (
      <div>{pages.join("")}</div>
    );

    expect(
      evaluateJSX(`<PassProps pages={['foo', 'bar', 'baz']} />`, {
        PassProps,
      })
    ).toBe("<div>foobarbaz</div>");
  });

  test("should evaluate arrays within objects as component props", () => {
    const PassProps = (
      { attributes }: { attributes: { pages: string[] } },
      children: string[]
    ) => <div>{attributes.pages.join("")}</div>;

    expect(
      evaluateJSX(
        `<PassProps attributes={{ pages: ['foo', 'bar', 'baz'] }} />`,
        {
          PassProps,
        }
      )
    ).toBe("<div>foobarbaz</div>");
  });

  test("should evaluate arrays of objects within objects as component props", () => {
    const PassProps = (
      { attributes }: { attributes: { pages: { title: string }[] } },
      children: string[]
    ) => <div>{attributes.pages[0].title}</div>;

    expect(
      evaluateJSX(`<PassProps attributes={{ pages: [{ title: "Demo" }] }} />`, {
        PassProps,
      })
    ).toBe("<div>Demo</div>");
  });

  test("should evaluate numbers within objects as component props", () => {
    const PassProps = (
      { attributes }: { attributes: { number: number } },
      children: string[]
    ) => <div>{attributes.number}</div>;

    expect(
      evaluateJSX(`<PassProps attributes={{ number: 21 }} />`, {
        PassProps,
      })
    ).toBe("<div>21</div>");
  });

  test("should evaluate strings within objects as component props", () => {
    const PassProps = (
      { attributes }: { attributes: { str: string } },
      children: string[]
    ) => <div>{attributes.str}</div>;

    expect(
      evaluateJSX(`<PassProps attributes={{ str: "foo" }} />`, {
        PassProps,
      })
    ).toBe("<div>foo</div>");
  });

  test("should evaluate objects within objects as component props", () => {
    const PassProps = (
      { attributes }: { attributes: { page: { title: string } } },
      children: string[]
    ) => <div>{attributes.page.title}</div>;

    expect(
      evaluateJSX(`<PassProps attributes={{ page: { title: "Demo" } }} />`, {
        PassProps,
      })
    ).toBe("<div>Demo</div>");
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
