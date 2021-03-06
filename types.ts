// TODO: Disjointed union would work better here
type AstNode = {
  type: string;
  value?: string;
  kind?: string;
  span: {
    start: number;
    end: number;
    ctxt: number;
  };
  declare?: boolean;
  declaration?: AstNode;
  declarations?: AstNode[];
  body?: AstNode[] | AstNode;
  expression?: AstNode;
  init?: AstNode;
  id?: AstNode;
};

// TODO: Join these two and extract the generator specific type
type Component = {
  displayName: string;
  description: string;
  default: (...args: any) => string;
  exampleSource: string;
  componentSource: string;
  // TODO: Prop type
  props: any[];
};
type DesignSystemComponent = {
  displayName: string;
  description: string;
  default: (...args: any) => string;
  Example: (...args: any) => string;
};
type Pages = {
  [key: string]: Page;
};
type Layout = ({
  url,
  title,
  meta,
  pages,
  attributes,
}: {
  url: string;
  title?: string;
  meta?: { [key: string]: string };
  pages: DynamicPages;
  attributes: {};
}) => void;
// TODO: Figure out a good way to type dynamic pages
type DynamicPages = { layout: Layout; attributes: {} }[];
type Page = {
  module: {
    default: Layout;
  };
  pages: DynamicPages;
  attributes: {};
};
type Urls = {
  [key: string]: {
    layout?: Layout;
    path: string | undefined;
    pages: DynamicPages;
    attributes: {};
  };
};

export type { AstNode, Component, DesignSystemComponent, Pages, Page, Urls };
