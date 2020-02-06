import * as elements from "typed-html";

export default ({ head, body, cssTags, jsTags, htmlAttributes }) => (
  <html {...htmlAttributes}>
    <head>
      {head}
      {cssTags}
    </head>
    <body>{body}</body>
    {jsTags}
  </html>
);
