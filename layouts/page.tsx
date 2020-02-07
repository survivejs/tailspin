import * as elements from "typed-html";

export default ({ head, body, cssTags, jsTags, htmlAttributes }) => (
  <html {...htmlAttributes}>
    <head>
      {head}
      {cssTags}
    </head>
    <body>
      <header>header</header>
      {body}
      <footer>footer</footer>
    </body>
    {jsTags}
  </html>
);
