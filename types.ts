type AstNode = {
  type: string;
  kind?: string;
  span: {
    start: number;
    end: number;
    ctxt: number;
  };
  declare?: boolean;
  declarations?: AstNode[];
  body?: AstNode[] | AstNode;
  init?: AstNode;
};
type Component = {
  displayName: string;
  description: string;
  default: () => string;
  exampleSource: string;
  componentSource: string;
  // TODO: Prop type
  props: any[];
};
type Pages = {
  [key: string]: Page;
};
// TODO: Figure out a good way to type dynamic pages
type DynamicPages = [];
type Page = {
  module: {
    default: ({
      url,
      title,
      meta,
      pages,
    }: {
      url: string;
      title?: string;
      meta?: { [key: string]: string };
      pages: DynamicPages;
    }) => void;
  };
  pages: [];
};
type Urls = {
  [key: string]: { path: string | undefined; pages: DynamicPages };
};

export { AstNode, Component, Pages, Page, Urls };
