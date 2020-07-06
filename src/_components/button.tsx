import * as elements from "typed-html";

export default ({ onclick }, label) => (
  <button class="btn btn-blue" onclick={onclick}>
    {label}
  </button>
);
