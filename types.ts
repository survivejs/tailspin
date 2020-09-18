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
type Page = {
  default: ({
    url,
    title,
    meta,
  }: {
    url: string;
    title?: string;
    meta?: { [key: string]: string };
  }) => void;
};
type Urls = { [key: string]: string };

export { AstNode, Component, Pages, Page, Urls };
