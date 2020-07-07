declare namespace JSX {
  interface HtmlTag {
    x?: string;
  }

  interface Path {
    d: string;
  }
  interface Svg {
    class?: string;
    role?: string;
    xmlns: string;
    viewBox: string;
  }
  interface IntrinsicElements {
    path: Path;
    svg: Svg;
  }
}