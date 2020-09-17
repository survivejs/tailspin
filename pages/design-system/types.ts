export type AstNode = {
  type: string;
  kind: string;
  span: {
    start: number;
    end: number;
    ctxt: number;
  };
  declare: boolean;
  declarations: AstNode[];
  body?: AstNode[] | AstNode;
};
