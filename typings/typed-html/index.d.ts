declare namespace JSX {
  interface HtmlTag {
    x?: string;
  }

  interface HtmlTextAreaTag {
    oninput?: string;
    autocapitalize?: string;
    autocomplete?: string;
    autocorrect?: string;
  }

  interface Path {
    d: string;
  }
  interface Svg {
    class?: string;
    role?: string;
    width?: string;
    height?: string;
    fill?: string;
    stroke?: string;
    xmlns: string;
    viewBox: string;
  }
  interface IntrinsicElements {
    path: Path;
    svg: Svg;
  }
}
