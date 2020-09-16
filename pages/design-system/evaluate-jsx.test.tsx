import {
  assertEquals,
} from "https://deno.land/std@0.69.0/testing/asserts.ts";

import * as elements from "../../src/elements.ts";
import evaluateJSX from "./evaluate-jsx.ts";

Deno.test("should return empty string for empty string", () => {
  assertEquals(evaluateJSX("", {}), "");
});

Deno.test("should evaluate a component", () => {
  const ShowChildren = ({}, children: string[]) => <div>{children}</div>;

  assertEquals(
    evaluateJSX("<ShowChildren>test</ShowChildren>", {
      ShowChildren,
    }),
    "<div>test</div>",
  );
});

Deno.test("should evaluate a boolean", () => {
  const ShowChildren = (
    { withAnchor }: { withAnchor: boolean },
    children: string[],
  ) => (
    <div>{withAnchor ? "anchor" : children}</div>
  );

  assertEquals(
    evaluateJSX("<ShowChildren withAnchor>test</ShowChildren>", {
      ShowChildren,
    }),
    "<div>anchor</div>",
  );
});

Deno.test("should evaluate components from components", () => {
  const Show = ({}, children: string[]) => <div>parent: {children}</div>;
  const Children = ({}, children: string[]) => <div>{children}</div>;
  Show.Children = Children;

  assertEquals(
    evaluateJSX("<Show.Children>test</Show.Children>", {
      Show,
    }),
    "<div>test</div>",
  );
});

Deno.test("should evaluate nested components", () => {
  const ShowChildren = ({}, children: string[]) => <div>{children}</div>;

  assertEquals(
    evaluateJSX(
      "<ShowChildren><ShowChildren>test</ShowChildren></ShowChildren>",
      {
        ShowChildren,
      },
    ),
    "<div><div>test</div></div>",
  );
});

Deno.test("should evaluate component props", () => {
  const PassProps = ({ test }: { test: string }, children: string[]) => (
    <div>{test}</div>
  );

  assertEquals(
    evaluateJSX(`<PassProps test="test" />`, {
      PassProps,
    }),
    "<div>test</div>",
  );
});

// TODO
/*
Deno.test("should evaluate arrays as component props", () => {
  const PassProps = ({ pages }: { pages: string[] }, children: string[]) => (
    <div>{pages.join("")}</div>
  );

  assertEquals(
    evaluateJSX(`<PassProps pages={['foo', 'bar', 'baz']} />`, {
      PassProps,
    }),
    "<div>foobarbaz</div>",
  );
});
*/

Deno.test("should evaluate arrays within objects as component props", () => {
  const PassProps = (
    { attributes }: { attributes: { pages: string[] } },
    children: string[],
  ) => <div>{attributes.pages.join("")}</div>;

  assertEquals(
    evaluateJSX(
      `<PassProps attributes={{ pages: ['foo', 'bar', 'baz'] }} />`,
      {
        PassProps,
      },
    ),
    "<div>foobarbaz</div>",
  );
});

Deno.test("should evaluate arrays of objects within objects as component props", () => {
  const PassProps = (
    { attributes }: { attributes: { pages: { title: string }[] } },
    children: string[],
  ) => <div>{attributes.pages[0].title}</div>;

  assertEquals(
    evaluateJSX(`<PassProps attributes={{ pages: [{ title: "Demo" }] }} />`, {
      PassProps,
    }),
    "<div>Demo</div>",
  );
});

Deno.test("should evaluate numbers within objects as component props", () => {
  const PassProps = (
    { attributes }: { attributes: { number: number } },
    children: string[],
  ) => <div>{attributes.number}</div>;

  assertEquals(
    evaluateJSX(`<PassProps attributes={{ number: 21 }} />`, {
      PassProps,
    }),
    "<div>21</div>",
  );
});

Deno.test("should evaluate strings within objects as component props", () => {
  const PassProps = (
    { attributes }: { attributes: { str: string } },
    children: string[],
  ) => <div>{attributes.str}</div>;

  assertEquals(
    evaluateJSX(`<PassProps attributes={{ str: "foo" }} />`, {
      PassProps,
    }),
    "<div>foo</div>",
  );
});

Deno.test("should evaluate objects within objects as component props", () => {
  const PassProps = (
    { attributes }: { attributes: { page: { title: string } } },
    children: string[],
  ) => <div>{attributes.page.title}</div>;

  assertEquals(
    evaluateJSX(`<PassProps attributes={{ page: { title: "Demo" } }} />`, {
      PassProps,
    }),
    "<div>Demo</div>",
  );
});

// TODO
/*
Deno.test("should evaluate children", () => {
  const ShowChildren = ({}, children: string[]) => <div>{children}</div>;

  assertEquals(
    evaluateJSX(`<ShowChildren>{1 + 1}</ShowChildren>`, {
      ShowChildren,
    }),
    "<div>2</div>",
  );
});
*/

// TODO
/*
Deno.test("should evaluate expression props", () => {
  const PassProps = ({ test }: { test: string }, children: string[]) => (
    <div>{test}</div>
  );

  assertEquals(
    evaluateJSX(`<PassProps test={1+1} />`, {
      PassProps,
    }),
    "<div>2</div>",
  );
});
*/

Deno.test("should evaluate components as props", () => {
  const Hello = () => <div>hello</div>;
  const PassProps = ({ test }: { test: string }, children: string[]) => (
    <div>{test}</div>
  );

  assertEquals(
    evaluateJSX(`<PassProps test={<Hello />} />`, {
      Hello,
      PassProps,
    }),
    "<div><div>hello</div></div>",
  );
});

Deno.test("should evaluate component children and props", () => {
  const PassChildrenAndProps = (
    { test }: { test: string },
    children: string[],
  ) => (
    <div>
      {test}
      {children}
    </div>
  );

  assertEquals(
    evaluateJSX(
      `<PassChildrenAndProps test="prop">children</PassChildrenAndProps>`,
      {
        PassChildrenAndProps,
      },
    ),
    "<div>prop\nchildren</div>",
  );
});

Deno.test("should evaluate component with svg", () => {
  const svg = (
    <svg
      class="fill-current"
      role="button"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <title>Close</title>
    </svg>
  );

  const ShowSvg = () => <div>{svg}</div>;

  assertEquals(
    evaluateJSX("<ShowSvg />", {
      ShowSvg,
    }),
    `<div><svg class="fill-current" role="button" xmlns="http://www.w3.org/2000/svg" view-box="0 0 20 20"><title>Close</title></svg></div>`,
  );
});

Deno.test("should evaluate component with svg and a custom component", () => {
  const PassChildren = ({}, children: string[]) => <div>{children}</div>;
  const svg = (
    <svg
      class="fill-current"
      role="button"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <title>Close</title>
    </svg>
  );

  const ShowSvg = () => (
    <div>
      <PassChildren>{svg}</PassChildren>
    </div>
  );

  assertEquals(
    evaluateJSX("<ShowSvg />", {
      ShowSvg,
      PassChildren,
    }),
    `<div><div><svg class="fill-current" role="button" xmlns="http://www.w3.org/2000/svg" view-box="0 0 20 20"><title>Close</title></svg></div></div>`,
  );
});

Deno.test("should replace children", () => {
  const ShowChildren = ({}, children: string[]) => <div>{children}</div>;

  assertEquals(
    evaluateJSX(
      "<ShowChildren>{children}</ShowChildren>",
      {
        ShowChildren,
      },
      {
        children: ["replaced"],
      },
    ),
    "<div>replaced</div>",
  );
});

// TODO
/*
Deno.test("should replace calling children", () => {
  const ShowChildren = ({}, children: string[]) => <div>{children}</div>;

  assertEquals(
    evaluateJSX(
      "<ShowChildren>{children.join('')}</ShowChildren>",
      {
        ShowChildren,
      },
      {
        children: ["replaced"],
      },
    ),
    "<div>replaced</div>",
  );
});

Deno.test("should replace children with elements", () => {
  const ShowChildren = ({}, children: string[]) => (
    <div>{children.join("")}</div>
  );

  assertEquals(
    evaluateJSX("<ShowChildren><div>Demo</div></ShowChildren>", {
      ShowChildren,
    }),
    "<div><div>Demo</div></div>",
  );
});

Deno.test("should replace children with elements and attributes", () => {
  const ShowChildren = ({}, children: string[]) => (
    <div>{children.join("")}</div>
  );

  assertEquals(
    evaluateJSX(`<ShowChildren><div title="test">Demo</div></ShowChildren>`, {
      ShowChildren,
    }),
    `<div><div title="test">Demo</div></div>`,
  );
});

Deno.test("should replace children with multiple elements", () => {
  const ShowChildren = ({}, children: string[]) => (
    <div>{children.join("")}</div>
  );

  assertEquals(
    evaluateJSX(
      "<ShowChildren><div>Demo</div><div>Another demo</div></ShowChildren>",
      {
        ShowChildren,
      },
    ),
    "<div><div>Demo</div><div>Another demo</div></div>",
  );
});

Deno.test("should replace children with multiple children", () => {
  const ShowChildren = ({}, children: string[]) => (
    <div>{children.join("")}</div>
  );

  assertEquals(
    evaluateJSX(
      "<ShowChildren><div><span>Foo</span><span>Bar</span></div></ShowChildren>",
      {
        ShowChildren,
      },
    ),
    "<div><div><span>Foo</span><span>Bar</span></div></div>",
  );
});
*/
