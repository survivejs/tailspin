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

export { AstNode, Pages, Page, Urls };
